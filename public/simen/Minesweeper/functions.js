function setup() { //Deklarerer alt som trengs. Setter verdier til startverdier osv
    settingsBoxEl.style.visibility = 'hidden';
    //Gamevindu
    if (document.getElementById('Intermediate').checked) {
        canvas.width = scale * 16;
        canvas.height = scale * 16;
        mines = 40;
        headerEl.style.width = scale * 16 + 'px';
        taskbarEl.style.width = scale * 16 + 'px';
        settingsBoxEl.style.marginLeft = -8 * scale + 'px';
    } else if (document.getElementById('Expert').checked) {
        canvas.width = scale * 30;
        canvas.height = scale * 16;
        mines = 99;
        headerEl.style.width = scale * 30 + 'px';
        taskbarEl.style.width = scale * 30 + 'px';
        settingsBoxEl.style.marginLeft = -15 * scale + 'px';
    } else if (document.getElementById('Beginner').checked) {
        canvas.width = scale * 9;
        canvas.height = scale * 9;
        mines = 10;
        headerEl.style.width = scale * 9 + 'px';
        taskbarEl.style.width = scale * 9 + 'px';
        settingsBoxEl.style.marginLeft = -4.5 * scale + 'px';
    } else if (document.getElementById('Custom').checked) {
        if (parseInt(document.getElementById("customWidth").value) < 9 || parseInt(document.getElementById("customWidth").value) > 50) return;
        if (parseInt(document.getElementById("customHeight").value > 16 || parseInt(document.getElementById("customHeight").value) < 9)) return;
        canvas.width = scale * parseInt(document.getElementById("customWidth").value);
        canvas.height = scale * parseInt(document.getElementById("customHeight").value);
        mines = parseInt(document.getElementById("customMines").value);
        headerEl.style.width = scale * parseInt(document.getElementById("customWidth").value) + 'px';
        taskbarEl.style.width = scale * parseInt(document.getElementById("customWidth").value) + 'px';
        settingsBoxEl.style.marginLeft = scale * -(parseInt(document.getElementById("customWidth").value) / 2) + 'px';
    }

    //Setup
    clearInterval(timer); //Resetter timer
    buttonEl.src = "images/Smile.png"; //Smilefjesbilde på knappen
    board = Array.from(Array(canvas.width / scale), () => new Array(canvas.height / scale)); //Lager et 2d array
    mineCount = mines; //Variabel brukt for å vise antall miner igjen i mineDisplay;
    time = 0; ////Variabel brukt for å vise tiden i timeDisplay;
    mineCountEl.innerHTML = String(mineCount).padStart(3, '0'); //Viser mineCount med 3 siffer eks 007
    timerEl.innerHTML = String(time).padStart(3, '0'); //Viser time med 3 siffer eks 007

    timer = setInterval(function () { //Timer
        time++;
        timerEl.innerHTML = String(time).padStart(3, '0'); //Oppdaterer timecount
    }, 1000) //Kjører hvert 1000 ms
    25

    makeBoard(); //Lager cellene i boardet
    placeMines(); //Plasserer miner
    getCellValues(); //Får celleverdier
    draw(); //Tegner board

    //Deklarerer eventlisteners
    document.addEventListener("mousedown", handleMouseDown); //Mus ned
    document.addEventListener("mouseup", click); //Mus opp
    document.addEventListener("contextmenu", flag); //Høyreklikk
    document.addEventListener("dblclick", expand); //Dobbel klikk
    document.addEventListener("auxclick", expand); //Musehjul klikk
}

function Cell(x, y, isMine, isFlagged, isClicked) { //Constructor funksjon (ganske lik class) som blir brukt under dannelsen av boardet
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.isClicked = isClicked;
    this.isFlagged = isFlagged;
    this.value = 0;
}

function makeBoard() { //Fyller board med celler
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = new Cell(i * scale, j * scale, false, false, false);
        }
    }
}

function placeMines() { //Velger random x og y verdier i tabellen og gjør de til miner
    for (let k = 0; k < mines; k++) {
        let x = getRandomNum(canvas.width / scale);
        let y = getRandomNum(canvas.height / scale);

        if (!board[x][y].isMine) board[x][y].isMine = true;
        else k--;
    }
}

function draw() { //Tegner boardet
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Klargjør for tegning
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isClicked && board[i][j].isMine) { //Tegner miner
                if (board[i][j].deathMine) { //Hvis det er minen man døde på gir den rød bakgrunn
                    ctx.fillStyle = 'red';
                    ctx.fillRect(i * scale, j * scale, scale, scale);
                } else { //Hvis ikke gir den grå bakgrunn
                    ctx.drawImage(imgs[0], i * scale, j * scale, scale, scale);
                }
                ctx.drawImage(imgMine, i * scale, j * scale, scale, scale); //Tegner et png bildet av en mine oppå bakgrunnen ^^ 
            } else if (board[i][j].isFlagged) { //Tegner flagg
                ctx.drawImage(imgFlag, i * scale, j * scale, scale, scale);
            } else if (board[i][j].isClicked) { //Hvis den er trykket på, tegner hvor mange miner er rundt
                ctx.drawImage(imgs[board[i][j].value], i * scale, j * scale, scale, scale);
            } else { //Ellers er den ikke åpnet dermed tegn en celle
                ctx.drawImage(imgOpen, i * scale, j * scale, scale, scale);
            }
        }
    }
}

function getCellValue(cell) { //Gir en celle(x, y) en value avhenging av hvor mange miner som er rundt
    let x = cell.x / scale;
    let y = cell.y / scale;
    let value = getNeigbourMines(x, y);
    cell.value = value;
    draw();
}

function getNeigbourMines(x, y) { //Returnerer hvor mange miner som er rundt en celle med x, y
    let amount = 0;
    for (let y2 = -1; y2 < 2; y2++) {
        for (let x2 = -1; x2 < 2; x2++) {
            if (y2 == 0 && x2 == 0) continue
            if (board[x + x2] && board[x + x2][y + y2]) {
                if (board[x + x2][y + y2].isMine) amount++;
            }
        }
    }
    return amount;
}

function getCellValues() { //Finner verdier for alle cellene i boardet
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            getCellValue(board[i][j]);
        }
    }
}

function openCell(x, y) { //Åpner en celle
    if (board[x] && board[x][y]) { //Hvis den finnes
        if (board[x][y].isFlagged) return; //Hvis det er et flagg skal man ikke gjøre noe
        else if (board[x][y].isMine) gameOver(x, y); //Hvis det er en mine er spillet over x, y korresponderer til minen man trykker på når man taper aka den som vil få rød bakgrunn
        else if (board[x][y].value == 0) { //Hvis den ikke har verdi (Åpen)
            if (!board[x][y].isClicked) { //Hvis den ikke er åpnet
                board[x][y].isClicked = true; //Åpner cella
                //Åpner alle cellene rundt
                for (let y2 = -1; y2 < 2; y2++) {
                    for (let x2 = -1; x2 < 2; x2++) {
                        if (y2 == 0 && x2 == 0) continue //Hvis det er den opprinnelige cella skip til neste
                        openCell(x + x2, y + y2); //Rekursiv hell yeah
                    }
                }
            }
        } else if (!board[x][y].isClicked) { //Hvis ingen andre ting er sant og den ikke er åpen
            board[x][y].isClicked = true; //Åpne den
        } else return; //Ellers gjør ingenting
    }
    draw(); //Tegn boardet
}

function expand(evt) { //Kjører når man trykker på musehjulet og sjekker om flaggene rundt er lik verdien til cella og åpner alle åpne celler rundt
    let mousePos = getMousePos(canvas, evt);
    let targetCell = { //Cella man trykker på
        x: Math.floor(mousePos.x / scale),
        y: Math.floor(mousePos.y / scale),
    }
    if (board[targetCell.x] && board[targetCell.x][targetCell.y]) { //Hvis den finnes
        if (board[targetCell.x][targetCell.y].isClicked) { //Hvis den er åpnet
            let value = board[targetCell.x][targetCell.y].value; //Finner hvor mange miner som må være rundt

            //Looper for å finne alle flaggene rundt og inkrementerer amountOfFlags
            let amountOfFlags = 0;
            for (let y2 = -1; y2 < 2; y2++) {
                for (let x2 = -1; x2 < 2; x2++) {
                    if (board[targetCell.x + x2] && board[targetCell.x + x2][targetCell.y + y2]) {
                        if (board[targetCell.x + x2][targetCell.y + y2].isFlagged) amountOfFlags++;
                    }
                }
            }
            //Hvis antall flagg rundt er lik verdier, åpne alle cellene rundt
            if (amountOfFlags === value) {
                for (let y2 = -1; y2 < 2; y2++) {
                    for (let x2 = -1; x2 < 2; x2++) {
                        if (y2 == 0 && x2 == 0) continue
                        openCell(targetCell.x + x2, targetCell.y + y2);
                    }
                }
            }
        }
    }
    draw(); //Tegn boardet
    if (checkWin()) gameWin(); //Sjekk om man har vunnet
}

function getRandomNum(n) { //Random nummer mellom 0 og n
    return Math.floor(Math.random() * n);
}

function gameOver(x, y) { //Når man trykker på en mine
    //Fjern alle eventlisteners slik at man ikke kan trykke på boardet noe mer
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener('mouseup', click);
    document.removeEventListener('contextmenu', flag);
    document.removeEventListener("dblclick", expand);
    document.removeEventListener("auxclick", expand);
    buttonEl.src = "images/Dead.png"; //Smiley er død
    for (let i = 0; i < board.length; i++) { //Viser hvor alle minene er
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].isMine) board[i][j].isClicked = true;
        }
    }
    board[x][y].deathMine = true; //Deathmina blir satt og får rød bakgrunn når man kjører draw()
    draw(); //Tegner boardet
    clearInterval(timer); //Stopper timer
}

function gameWin() {
    //Fjerner alle eventlisteners
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener('mouseup', click);
    document.removeEventListener('contextmenu', flag);
    document.removeEventListener("dblclick", expand);
    document.removeEventListener("auxclick", expand);
    buttonEl.src = "images/Cool.png";
    clearInterval(timer); //Stopper timer
}

function getMousePos(canvas, evt) { //Finner hvor musa er og sender x og y verdiene tilbake
    let rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
    }
}

function checkWin() { //Returnerer true når alle celler er flagged ELLER åpnet
    return board.every(row => row.every(cell => cell.isClicked || cell.isFlagged));
}

function flag(evt) { //Flagger en celle
    evt.preventDefault(); //Gjør at man ikke får opp rullegardin når man trykker på høyreklikk i browser
    let mousePos = getMousePos(canvas, evt); //Lagrer stedet man trykker
    let targetCell = { //finner x og y verdiene til board arrayet
        x: Math.floor(mousePos.x / scale),
        y: Math.floor(mousePos.y / scale),
    }
    if (board[targetCell.x] && board[targetCell.x][targetCell.y]) { //Hvis cellen finnes
        if (!board[targetCell.x][targetCell.y].isFlagged && !board[targetCell.x][targetCell.y].isClicked) { //Hvis den ikke er flagget eller åpnet
            if (mineCount == 0) return;
            board[targetCell.x][targetCell.y].isFlagged = true; //Flagger cellen
            mineCount--;
            mineCountEl.innerHTML = String(mineCount).padStart(3, '0'); //Displayer hvor mange flagg man har igjen
        } else if (board[targetCell.x][targetCell.y].isFlagged) { //Hvis den er flagget
            board[targetCell.x][targetCell.y].isFlagged = false; //Unflagger cellen
            mineCount++;
            mineCountEl.innerHTML = String(mineCount).padStart(3, '0'); //Displayer hvor mange flagg man har igjen
        }
    }
    draw(); //Tegner boardet
    if (checkWin()) gameWin(); //Sjekker for seier
}

function handleMouseDown(e) { //Når musen trykkes
    document.addEventListener("mousemove", updateMousePos); //Sjekker om musa beveger seg og oppdaterer musekoordinatene hvis den gjør det
    mouseDown = true;
    let mousePos = getMousePos(canvas, e); //Finner musekoordinater
    let targetCell = {
        x: Math.floor(mousePos.x / scale),
        y: Math.floor(mousePos.y / scale),
    } //Finner x og y i board arrayet
    if (e.which == 1) { //Hvis det er venstreklikk
        if (board[targetCell.x] && board[targetCell.x][targetCell.y]) { //Hvis cellen finnes
            if (!board[targetCell.x][targetCell.y].isClicked && !board[targetCell.x][targetCell.y].isFlagged) { //Hvis den ikke er åpnet og den ikke er et flagg
                ctx.drawImage(imgs[0], targetCell.x * scale, targetCell.y * scale, scale, scale); //Selecter cellen
            }
        }
    } else if (e.which == 2) { //Hvis det er musehjulklikk
        if (board[targetCell.x] && board[targetCell.x][targetCell.y]) { //Hvis cellen finnes
            if (board[targetCell.x][targetCell.y].isClicked) { //Hvis den er åpnet selecter alle celler rundt som ikke er åpne eller flagg
                for (let y2 = -1; y2 < 2; y2++) {
                    for (let x2 = -1; x2 < 2; x2++) {
                        if (y2 == 0 && x2 == 0) continue
                        if (board[targetCell.x + x2] && board[targetCell.x + x2][targetCell.y + y2]) {
                            if (!board[targetCell.x + x2][targetCell.y + y2].isClicked && !board[targetCell.x + x2][targetCell.y + y2].isFlagged) {
                                ctx.drawImage(imgs[0], (targetCell.x + x2) * scale, (targetCell.y + y2) * scale, scale, scale);
                            }
                        }
                    }
                }
            }
        }
    }
}

function updateMousePos(e) {
    if (mouseDown) { //Hvis musenklikket er nede
        draw(); //Tegner at man holder inne (cellen blir grå)
        handleMouseDown(e); //Sjekker hvilken celle dette er
    }
}

function click(evt) {
    document.removeEventListener("mousemove", updateMousePos); //Fjerner mouseUpdate
    mouseDown = false;
    if (evt.which == 1) { //Hvis det er venstreklikk finner celleposisjonen og åpner cella
        let mousePos = getMousePos(canvas, evt);
        let targetCell = {
            x: Math.floor(mousePos.x / scale),
            y: Math.floor(mousePos.y / scale),
        }
        openCell(targetCell.x, targetCell.y);
        draw();
        if (checkWin()) gameWin();
    } else if (evt.which == 2) { //Hvis det er musehjul klikk expand fra celleposisjonen
        expand(evt);
    }
}

function openSettings() {
    if (settingsBoxEl.style.visibility == 'hidden') {
        settingsBoxEl.style.visibility = 'visible';
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener('mouseup', click);
        document.removeEventListener('contextmenu', flag);
        document.removeEventListener("dblclick", expand);
        document.removeEventListener("auxclick", expand);
    } else {
        settingsBoxEl.style.visibility = 'hidden';
        document.addEventListener("mousedown", handleMouseDown); //Mus ned
        document.addEventListener("mouseup", click); //Mus opp
        document.addEventListener("contextmenu", flag); //Høyreklikk
        document.addEventListener("dblclick", expand); //Dobbel klikk
        document.addEventListener("auxclick", expand); //Musehjul klikk
    }
}