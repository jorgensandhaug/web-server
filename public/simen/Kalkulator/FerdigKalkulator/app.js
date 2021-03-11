const d = document.getElementById("mainDisplay"); //Henter mainDisplay
const miniDisplay = document.getElementById("miniDisplay"); //Henter miniDisplay
const decimalDisplay = document.getElementById("decimalDisplay"); //Henter decimalDisplay
const regex = /[0-9]/; //Tallene fra 0 - 9
const regexP = /[1-9]/; //Tallene fra 1 - 9
const tbl1El = document.getElementById("table1Div"); //Metodeinstruksjoner
const tbl2El = document.getElementById("table2Div"); //Konstantinstruksjoner
let instructionCount = 1;
let decimalIndex = 2; //Hvor mange desimaler
decimalDisplay.value = decimalIndex;
document.addEventListener("keypress", e => {
    if (e.key == "Enter") calc();
}); //Sjekker om Enter trykkes

//Sjuler eller viser instruksjoner
tbl1El.style.visibility = "hidden";
tbl2El.style.visibility = "hidden";
const showInstructions = () => {
    if (instructionCount % 2 == 0) {
        tbl1El.style.visibility = "hidden";
        tbl2El.style.visibility = "hidden";
    } else {
        tbl1El.style.visibility = "visible";
        tbl2El.style.visibility = "visible";
    }
    instructionCount++;
}

//Oppdaterer desimaler
const decimals = (a) => {
    if (decimalIndex > 0) decimalIndex += (a == "-" ? -1 : 1);
    if (decimalIndex == 0 && a == "+") decimalIndex += 1;
    decimalDisplay.value = decimalIndex;
}
const push = (a) => d.value += a; //Pusher til regnestykkestring
const clearDisplay = () => { //Clear
    d.value = "";
    miniDisplay.innerHTML = "0";
    d.placeholder = "";
}
//Regner ut svaret av inputen
const calc = () => {
    d.placeholder = "";
    let ans; // Definerer Answer
    let arr = mathMethod(d.value.split("")); //Lager array med oppdaterte metoder fra mathMethod() for å sjekke etter "!" og "(" ")"
    //Sjekker om parenteser ganges med parenteser eller tall
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "(" && i - 1 >= 0 && (regexP.test(arr[i - 1]) || arr[i - 1] == ")")) arr.splice(i, 0, "*");
        else if (arr[i] == ")" && i + 1 <= arr.length - 1 && (regexP.test(arr[i + 1]) || arr[i + 1] == "(")) arr.splice(i + 1, 0, "*");
    }

    //Sjekker for grader og radianer
    if (arr.join("").includes("deg")) arr.splice(arr.join("").indexOf("deg"), 3, '180/Math.PI*');
    if (arr.join("").includes("rad")) arr.splice(arr.join("").indexOf("rad"), 3, 'Math.PI/180*');

    d.value = arr.join(""); //Oppdatert regnestykke med "*" tegn
    miniDisplay.innerHTML = arr.join("") + " =";
    //Sjekker om det er ("!") i regnestykket
    if (arr.includes("!")) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == ("!")) {
                //Regner ut fakultet
                const b = i - 1; //Definerer b = indexen til første ")" før "!"
                arr.splice(b + 1, 1); //Fjerner "!"
                let a = b - 1 //Definener a for å loope gjennom til enden av parentesen "("
                let n; //Definerer n
                if (arr[b] == ")") { //Sjekker om fakulteten kommer etter en parentes
                    let count = 1 //Count vil sørge for at man looper til riktig "("
                    while (true) {
                        if (arr[a] == "(") {
                            count--;
                            if (count == 0) break //Hvis man er ved riktig "(", break
                        } else if (arr[a] == ")") count++;
                        a--; //a = indexen til "("
                    }
                    n = eval(arr.splice(a, b + 1).join("")); //n = svaret til innholdet i parentesen
                } else {
                    while (regex.test(arr[a])) a--; //Minker a for å finne indexen til enden hvis arr[a] er et tall
                    n = Number(arr.splice(a + 1, b + 1).join("")); //n = nummeret som skal fakulteres
                }
                let prod = 1; //Definerer produktet
                for (let i = n; i > 1; i--) prod *= i; // n*n-1*n-2*n-3 ...
                arr.splice(a + 1, 0, prod); //Setter produktet inn i arrayet
            }
        }
        try { //Sjekker for error
            eval(arr.join(""))
        } catch {
            d.placeholder = "Error";
            d.value = "";
        }
        ans = eval(arr.join(""));
        if (eval(arr.join("")) % 1 != 0) ans = eval(arr.join("")).toFixed(decimalIndex);
    } else {
        try { //Sjekker for error
            eval(arr.join(""));
        } catch {
            d.placeholder = "Error";
            d.value = "";
        }
        ans = eval(d.value);
        if (eval(d.value) % 1 != 0) ans = eval(d.value).toFixed(decimalIndex);
    }
    d.value = (ans == undefined || ans == Infinity ? "" : ans); //Sjekker om ans == Infinity eller undefined og displayer "", eller displayer ans
    d.placeholder = (ans == undefined || ans == Infinity ? "Error" : "") //Hvis ans == Infinity || undefined, send "error"
}

//Sjekker om input inneholder metoder og returner array med "Math." foran metodene. For eksempel sin(2) => Math.sin(2)
const mathMethod = (a) => {
    let arr = a;
    const list = ["sqrt", "pow", "asin", "sin", "acos", "cos", "atan", "tan", "log10", "log"];
    for (op of list) {
        arr = arr.join("");
        let ixs = indices(arr, op) //Kaller indices funksjon for å finne hvor mange forekomster det er av metoden og retunerer et array med alle indexene.
        arr = arr.split("");
        if (ixs.length != 0) {
            for (index of ixs) {
                if ((index - 1 >= 0 && arr[index - 1] == ".") || (index - 2 >= 0 && arr[index - 2] == ".") || (index + op.length < arr.length && arr[index + op.length] == "1")) continue;
                else {
                    arr.splice(index, op.length, `Math.${op}`);
                    for (let k = 0; k < ixs.length; k++) {
                        if (ixs[k] > index) ixs[k] -= op.length - 1
                    }
                }
            }
        }
    }
    return arr;
}

//Looper gjennom og finner indexene hvor metoden ligger i str, og returnerer arr med indexer til variabelen ixs i mathMethod()
const indices = (arr, str) => {
    let ixs = [];
    for (let i = 0; i < arr.length - str.length; i++) {
        let s = "";
        for (let j = 0; j < str.length; j++) {
            s += arr[i + j]
        }
        if (s == str) {
            ixs.push(i)
        }
    }
    return ixs;
}