const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const infoEl = document.getElementById("infoOutput");

let slideCounter = 0;

class Slide {
    constructor(info) {
        this.info = info;
    }
    showInfo = () => infoEl.innerHTML = this.info;
}


const slideInfo = [{
        info: "En gjennomgang av HR-Diagram. Trykk NESTE for å gå videre til neste slide, og TILBAKE for å gå tilbake til forrige slide"
    },
    {
        info: "Stjerner klassifiseres i 7 forskjellige spektralklasser med navnene O, B, A, F, G, K, M. <br> ⋅ O- og B-stjerner har spektrallinjer fra helium og hydrogen. <br> ⋅ A- og F-stjerner har sterkest spektrallinjer fra hydrogen. <br> ⋅ G- og K-stjerner har spektrallinjer fra metaller. <br> ⋅ M-stjerner har spektrallinjer fra molekyler."
    },
    {
        info: "De forskjellige spektralklassene assosieres også med forskjellige farger. Som vi kan se i diagrammet er det en klar sammenheng mellom fargen til en stjerne, dens spektralklasse, og overflatetemperatur."
    },
    {
        info: "Det er også en koherens mellom en stjernes masse, temperatur og levetid. De stjernene som har fisjonert mye har tyngre grunnstoffer (metaller og molekyler) i kjernen. Disse finner vi da lenger til høyre i diagrammet. Disse har også lavest levetid på grunn av at fisjonering fører de nærmere en supernova i stjernenes livssyklus. Det vil da si at stjerner med høyere masse har også mindre levetid og lavere overflatetemperatur."
    },
    {
        info: "Y-aksen viser utstrålt effekt. Vi kan beskrive dette på en annen måte L eller Luminositet. Dette vil si hvor sterkt stjernen lyser. Formelen for L = 4πσT<sup>4</sup>R<sup>2</sup>. Dette vil si at stjerner som er lenger opp i diagrammet og har større luminositet, har også større radius. Altså har kjemper og superkjemper stor radius og lav overflatetemperatur, mens hvite dverger har liten radius (ca lik sola) og høy overflatetemperatur."
    }
];

const drawContentForSlide = (counter) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(`Side ${counter + 1} av 5`, 10, canvas.height - 10);
    switch (counter) {
        case 1:
            ctx.beginPath();
            ctx.moveTo(183, 85);
            ctx.lineTo(207, 68);
            ctx.moveTo(230, 85);
            ctx.lineTo(207, 68);
            ctx.fillText("Helium" , 185, 58);
            ctx.moveTo(275, 85);
            ctx.lineTo(297, 68);
            ctx.moveTo(320, 85);
            ctx.lineTo(297, 68);
            ctx.fillText("Hydrogen" , 267, 58);
            ctx.moveTo(367, 85);
            ctx.lineTo(386, 68);
            ctx.moveTo(410, 85);
            ctx.lineTo(386, 68);
            ctx.fillText("Metaller" , 367, 58);
            ctx.moveTo(455, 85);
            ctx.lineTo(460, 68);
            ctx.fillText("Molekyler" , 435, 58);
            ctx.stroke();
            ctx.closePath();
            break;
    }
}

const nextSlide = () => {
    if (slideInfo[slideCounter]) {
        new Slide(slideInfo[slideCounter + 1].info).showInfo();
        slideCounter++;
        drawContentForSlide(slideCounter);
    }
}

const previousSlide = () => {
    if (slideInfo[slideCounter - 1]) {
        new Slide(slideInfo[slideCounter - 1].info).showInfo();
        slideCounter--;
        drawContentForSlide(slideCounter);
    }
}

new Slide(slideInfo[slideCounter].info).showInfo();

canvas.addEventListener("mousemove", e => {
    console.log(e.offsetX, e.offsetY);
});

ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.fillStyle = 'black';
ctx.font = '15px Arial';

ctx.fillText(`Side 1 av 5`, 10, canvas.height - 10);