const body = document.querySelector(".container");
let stars;
class Star {
    constructor(name, age, kelvin, distance, img, fact) {
        this.name = name;
        this.age = age;
        this.kelvin = kelvin,
            this.distance = distance,
            this.img = img,
            this.fact = fact;
    }

    showInfo() {
        body.innerHTML += `<div id="contentContainer"></div>`
        document.getElementById("contentContainer").innerHTML = ``;
        document.getElementById("contentContainer").innerHTML += `<div class="starInfoHeader"><h1>Info om ${this.name}</h1><br></div>`;
        document.getElementById("contentContainer").innerHTML += `<div class="starInfo"><h2>Alder: ${this.age} år</h2><h2>Fargetemperatur: ${this.kelvin} K</h2><h2>Avstand: ${this.distance}</h2><br><h2>λ<sub>topp:</sub> <br>2.9 ⋅ 10<sup>-3</sup> / ${this.kelvin} = ${Math.floor(((2.9*0.01)/this.kelvin)*Math.pow(10, 8))} nm<br><h2>Utstrålingstetthet:<br> 5.67 ⋅ 10<sup>-8</sup> ⋅ ${this.kelvin}<sup>4</sup> = ${Math.floor((Math.pow(5.67, -8) * Math.pow(this.kelvin,4))).toExponential(1).replace(/e\+?/, ' ⋅ 10<sup>')}</sup> W/m<sup>2</sup></h2><h2>Bilde</h2></h2><br><img class="starIMG" src="${this.img}"<br></div>`;
        document.getElementById("contentContainer").innerHTML += `<div class="starFact"><p>Funfacts</p><p>${this.fact}</p></div>`;
    }
}
const writeHeader = (header, output) => {
    let i = 0;
    setInterval(() => {
        if(i < header.length) output.innerHTML += header.charAt(i);
        else {
            if(i%2 == 0) output.innerHTML += "_";
            else output.innerHTML = output.innerHTML.replace("_", "");
        }
        i++
    }, 300);
}
const showStar = id => {
    stars.forEach(star => {
        if (id == star.name) {
            let temporary = new Star(star.name, star.age, star.kelvin, star.distance, star.img, star.fact);
            temporary.showInfo();
        }
    });
}
const loadPage = () => {
    document.querySelector("body").style.overflow = "hidden";
    stars = [{
            name: 'Betelgeuse',
            age: '~7.3 ⋅ 10<sup>6</sup>',
            kelvin: 3300,
            distance: '643 ± 146 lysår <br> Spektralklasse: M',
            img: '/images/betelgeuse.jpeg',
            fact: 'Betelgeuse er en rød supergigant. Betelgeuse er en enormt variabel stjerne som endres i størrelse fra mellom 700 ganger til 1000 større enn solen. Når en stjerne blir eldre, brenner den raskt ut hydrogendrivstoffet, og bytter deretter til helium og andre elementer. I løpet av dette utvides og avkjøles den. Under fusjonen oppstår tyngre og tyngre atomer helt til kjernen er jern og ikke får fusjonert mer, og går tom for drivstoff. Hvis stjernen er tilstrekkelig massiv, slik som Betelgeuse, kollapser hele stjernen og eksploderer som en supernova.'
        },
        {
            name: 'Proxima Centauri',
            age: '~4.8 ⋅ 10<sup>9</sup>',
            kelvin: 3000,
            distance: '4.2465 ± 0.0003 lysår <br> Spektralklasse: M',
            img: '/images/proxima-centauri.jpeg',
            fact: 'Proxima Centauri er den stjernen som ligger nærmest solen. Den tilhører stjernebildet Kentauren, derav navnet Centauri. Den ligger i trippelstjernesystemet Alfa Centauri der den kretser rundt hovedstjernen Alfa Centauri med en omløpstid på ca. én million år. Den er en rød dverg, noe som betyr at den er relativt liten og "kjølig". Bildet over ble tatt av Hubble Teleskopet i 2013.'
        },
        {
            name: 'Sirius',
            age: '~2.3 ⋅ 10<sup>8</sup>',
            kelvin: 9940,
            distance: '8.611 lysår <br> Spektralklasse: A',
            img: '/images/Sirius.png',
            fact:'Sirius er det greske navnet på stjernen α Canis Majoris. Stjernen blir også kalt «Hundestjernen» fordi den er den mest lyssterke stjernen i stjernebildet Store hund. Sirius er den mest lyssterke stjernen på himmelen og lyser med en hvit farge. Det våre øyne oppfatter som en enkelt stjerne, er faktisk et dobbeltstjernesystem som består av en hvit hovedseriestjerne av spektraltype A1V, kalt Sirius A, og en svak hvit dverg av spektraltype DA2, kalt Sirius B.',
        },
        {
            name: 'Rigel',
            age: '8.005 ⋅ 10<sup>6</sup>',
            kelvin: 11000,
            distance: '864.3 lysår <br> Spektralklasse: B',
            img: '/images/Rigel.png',
            fact: 'Rigel er en ung, blåhvit kjempestjerne med en masse som er 17 ganger solas. Rigel ligger 700 - 900 lysår unna Jorda og er en del av stjernebildet Orion. Den har en absolutt luminositet minst 120 000 ganger sterkere enn sola og er himmelens 7. mest lyssterke objekt. Rigel er omgitt av et skall av gass utstøtt fra stjernen av solvind, eller et resultat av at stjernen pulserer. Rigel er en dobbeltstjerne slik som Sirius, hvor Rigel A er 500 ganger mer lyssterk enn Rigel B.',
        },
        {
            name: 'Sola',
            age: '4.603 ⋅ 10<sup>9</sup>',
            kelvin: 5778,
            distance: '0.00001581 lysår <br> Spektralklasse: G',
            img: '/images/Sola.png',
            fact: 'Sola er betegnelsen på stjernen som er sentrum i solsystemet hvor Jorden og andre kjente objekter (planeter, asteroider, meteoroider, kometer og støv) går i bane rundt. Den er nesten perfekt kuleformet og består av varm plasma sammenvevd i magnetfelt.  Massen til Sola er ca. 2 ⋅ 10<sup>30</sup> kg (ca. 333 000 ganger jordens) og utgjør ca. 99.86 % av massen i solsystemet. Med en effektiv overflatetemperatur på 5 778 K (5 505 °C) har solen en tilnærmet hvit farge, men fra jordoverflaten fremstår den som gul på grunn av atmosfærisk spredning av blått lys.',
        }
    ];
    body.innerHTML += `<img class="arrowBack" src="images/arrowback.png" alt="Tilbake til hovedmeny"  width="50px" height="50px" onclick=location.href='index.html'>`
    body.innerHTML += `<div id="contentContainer"><h1 id="title"></h1></div>`
    body.innerHTML += `<canvas id="panCanvas" width="1200px" height="1000px"></canvas>`
    document.getElementById("contentContainer").innerHTML += `<div id="starList"></div>`;
    stars.forEach(star => {
        document.getElementById("starList").innerHTML += `<button class="button" id="${star.name}" onclick="showStar(this.id)">${star.name}</button><br>`;
    });
    writeHeader('Stjerner', document.getElementById("title"));
}
loadPage();