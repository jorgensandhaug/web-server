let backgrounds = ['background1.jpeg', 'background8.jpg', 'background4.jpg', 'background5.jpg', 'background6.jpg', 'background7.jpg', 'background9.jpg'];

document.querySelector(".container").style.backgroundImage = `url(../images/${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;

let buttonMenuEl = document.getElementById("buttonMenu");
let titleEl = document.getElementById("title");
let count = 0;
const toggleButtons = () => {
    if(count%2 == 0) buttonMenuEl.style.visibility = "visible";
    else buttonMenuEl.style.visibility = "hidden";
    count++;
}

let header = "Astrofysikk";
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
writeHeader(header, titleEl);

