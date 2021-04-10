const contentContainer = document.getElementById("contentContainer");
contentContainer.style.visibility = "visible";
let equations = [];
const showCalculator = name => {
    contentContainer.innerHTML = `<img class="arrowBack" src="images/arrowback.png" alt="Tilbake til formler"  width="50px" height="50px" onclick="loadPage()">`;
    contentContainer.innerHTML += `<div id="calculatorDiv"></div>`;
    let calcDiv = document.getElementById("calculatorDiv");
    calcDiv.innerHTML = `${name}<br>`;
    calcDiv.innerHTML += `<div id="inputDiv"></div>`;
    let inputDiv = document.getElementById("inputDiv");
    let index = 0;
    for (let i = 0; i < equations.length; i++)
        if (equations[i].name == name) index = i;
    for (let i = 0; i < equations[index].inputs.length; i++) inputDiv.innerHTML += `<input class="calcInput" id="input${i}" type="number" placeholder="${equations[index].inputs[i]}" value=""><br>`;
    calcDiv.innerHTML += `<button id="calcButton" onclick="calculate(\`${name}\`)">Calculate</button>`;
    calcDiv.innerHTML += `<p id="output"></p>`
}
const calculate = name => {
    let inputs = document.querySelectorAll(".calcInput");
    let output = document.getElementById("output");
    let outputValue;
    output.innerHTML = "";
    switch (name) {
        case 'Stefan-Boltzmanns lov':
            if (inputs[0].value == "" || inputs[0].value == "0") {
                outputValue = `U = ${parseFloat(((5.67*Math.pow(10, -8))*Math.pow(parseFloat(inputs[1].value), 4))).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} W/m^2`;
            }
            if (inputs[1].value == "" || inputs[1].value == "0") {
                outputValue = `T = ${parseFloat((Math.pow(inputs[0].value / (5.67*Math.pow(10, -8)), 1/4))).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} K`;
            }
            break;
        case 'Wiens forkyvningslov':
            if (inputs[0].value == "" || inputs[0].value == "0") {
                outputValue = `λ = ${parseFloat(((2.9*Math.pow(10, -3))/(inputs[1].value))).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m`;
            }
            if (inputs[1].value == "" || inputs[1].value == "0") {
                outputValue = `T = ${parseFloat(((2.9*Math.pow(10, -3))/(inputs[0].value))).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} K`;
            }
            break;
        case 'Dopplerformelen':
            if (inputs[0].value == "" || inputs[0].value == "0") {
                outputValue = `v = ${parseFloat((((inputs[1].value - inputs[2].value) / inputs[2].value)*Math.pow(3, 8))).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m/s`;
            }
            if (inputs[1].value == "" || inputs[1].value == "0") {
                outputValue = `λ = ${parseFloat((((inputs[0].value/Math.pow(3, 8))*inputs[2].value) + inputs[2].value)).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m`;
            }
            if (inputs[2].value == "" || inputs[2].value == "0") {
                outputValue = `λ0 = ${parseFloat(((Math.pow(3, 8) / inputs[0].value * inputs[1].value)/2)).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m`;
            }
            break;
        case 'Hubbles lov':
            if (inputs[0].value == "" || inputs[0].value == "0") {
                outputValue = `v = ${(21.7 * inputs[1].value).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m/s`;
            }
            if (inputs[1].value == "" || inputs[1].value == "0") {
                outputValue = `r = ${(inputs[0].value/21.7).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m`;
            }
            case 'Luminositet / Utstrålt effekt':
                if (inputs[0].value == "" || inputs[0].value == "0") {
                    outputValue = `L = ${parseFloat(((4 * Math.PI * (5.67*Math.pow(10, -8))*Math.pow(parseFloat(inputs[1].value), 4))) * Math.pow(parseFloat(inputs[2].value), 2)).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} W`;
                }
                if (inputs[1].value == "" || inputs[1].value == "0") {
                    outputValue = `T = ${(Math.pow(inputs[0].value) / (5.67*Math.pow(10, -8) * 4 * Math.PI * Math.pow(parseFloat(inputs[2]).value, 2), 1/4).toExponential(2).replace(/e\+?/, ' ⋅ 10^'), (1/4))} K`;
                }
                if (inputs[2].value == "" || inputs[2].value == "0") {
                    outputValue = `R = ${(Math.pow(parseFloat(inputs[0].value) / (4 * Math.PI * (5.67*Math.pow(10, -8)) * (Math.pow(parseFloat(inputs[1].value)), 4))), 1/2).toExponential(2).replace(/e\+?/, ' ⋅ 10^')} m`;
                }
    }
    let i = 0;

    function typeOutput() {
        if (i < outputValue.length) {
            output.innerHTML += outputValue.charAt(i);
            i++;
            setTimeout(typeOutput, 200);
        }
    }
    typeOutput();
}

const writeHeader = (header, output) => {
    let i = 0;
    setInterval(() => {
        if (i < header.length) output.innerHTML += header.charAt(i);
        else {
            if (i % 2 == 0) output.innerHTML += "_";
            else output.innerHTML = output.innerHTML.replace("_", "");
        }
        i++
    }, 300);
}
const loadPage = () => {
    equations = [{
        name: 'Stefan-Boltzmanns lov',
        equation: 'U = σ ⋅ T<sup>4</sup>',
        variableMeanings: ['U = Utsrålingstetthet', 'σ = Konstant(5.67 ⋅ 10<sup>-8</sup>)', 'T = Temperatur'],
        inputs: ['U', 'T'],
        units: ['U = W/m<sup>2</sup>', 'σ = W/m<sup>2</sup>K<sup>4</sup>', 'T = K'],
        info: 'Utstrålingstettheten fra en svart gjenstand er proporsjonal med fjerde potens av temperaturen på overflaten av gjenstanden.',
    }, {
        name: 'Wiens forkyvningslov',
        equation: 'λ<sub>topp</sub> ⋅ T = a',
        variableMeanings: ['λ<sub>topp</sub> = Bølgelengdetopp', 'T = Temperatur', 'a = Konstant(2.90 ⋅ 10<sup>-3</sup>)'],
        inputs: ['λ', 'T'],
        units: ['λ<sub>topp</sub> = m', 'T = K', 'a = Km'],
        info: 'Bølgelengden for energimaksimum i termisk stråling er omvendt proporsjonal med temperaturen i gjenstanden som stråler',
    }, {
        name: 'Dopplerformelen',
        equation: `<span class="fractionConstant">v = </span><span class="fraction"><span class="top">λ - λ<sub>0</sub></span><span class="bottom">λ<sub>0</sub></span></span><span class="fractionConstant"> ⋅ c</span>`,
        variableMeanings: ['v = Farten til objektet', 'λ = Observert bølgelengde til en spektrallinje', 'λ<sub>0</sub> = Bølgelengden til den observerte bølgelengden λ i laboratoriet', 'c = Konstant(3 ⋅ 10<sup>8</sup>)'],
        inputs: ['v', 'λ', 'λ0'],
        units: ['v = m/s', 'λ = m', 'λ<sub>0</sub> = m', 'c = m/s'],
        info: 'Sammenheng mellom bølgelengde-forskyvningen og farten til lyskilden i forhold til oss.',
    }, {
        name: 'Hubbles lov',
        equation: `v = H ⋅ r`,
        variableMeanings: ['v = Radialfarten til galaksen', 'H = Konstant(~21.7 ± 1.0)', 'r = Avstanden fra jorda til galaksen'],
        inputs: ['v', 'r'],
        units: ['v = m/s', 'H = (km/s) / 10<sup>6</sup> l.y', 'r = m'],
        info: 'Galakser har en radialfart som er større jo større avstanden er fra jorda. H er Hubbles konstant og blir bestemt med stadig større nøyaktighet.',
    }, {
        name: 'Luminositet / Utstrålt effekt',
        equation: `L = 4πσT<sup>4</sup>R<sup>2</sup>`,
        variableMeanings: ['L = Luminositet', 'σ = Konstant(5.67 ⋅ 10<sup>-8</sup>)', 'T = Temperatur', 'R = Radius til stjernen'],
        inputs: ['L', 'T', 'R'],
        units: ['L = W', 'σ = W/m<sup>2</sup>K<sup>4</sup>', 'T = K', 'R = m'],
        info: 'Det er en direkte sammenheng mellom en stjernes luminositet, temperatur og radius',
    }, ]
    contentContainer.innerHTML = `<img class="arrowBack" src="images/arrowback.png" alt="Tilbake til hovedmeny"  width="50px" height="50px" onclick=location.href='index.html'>`
    contentContainer.innerHTML += `<h1 id="title"></h1>`;
    contentContainer.innerHTML += `<table id="table"><tbody id="tbody"><tr><th>Navn</th><th>Formel</th><th>Variabler</th><th>Enheter</th><th>Info</th><th>Kalkulator</th></tr></tbody></table>`
    let tbodyEL = document.getElementById("tbody");
    for (let i = 0; i < equations.length; i++) tbodyEL.innerHTML += `<tr><td>${equations[i].name}</td><td class="formel">${equations[i].equation}</td><td>${equations[i].variableMeanings.join('<div class="break"></div>')}</td><td>${equations[i].units.join('<div class="break"></div>')}</td><td class="info">${equations[i].info}</td><td><button class="regnut" onclick='showCalculator(\`${equations[i].name}\`)'>Bruk Formel</button></td></tr>`;
    writeHeader('Formler', document.getElementById("title"))
}
loadPage();