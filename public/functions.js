
//Vector
class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }

    mult(amp){
        this.x *= amp;
        this.y *= amp;
    }

    mag(){
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y,2)) 
    }

    normalize(){
        let previous_magnitude = this.mag();
        this.x = this.x/previous_magnitude;
        this.y = this.y/previous_magnitude;
    }

    normalizeMult(size){
        this.normalize();
        this.mult(size);
    }

    rotate(angle) {
        let previous_x_value = this.x;
        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle)
        this.y = previous_x_value * Math.sin(angle) + this.y * Math.cos(angle)
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


let distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1,2))

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function rotate(vector, angle) {
    const rotatedVector = {
        x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
        y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
    }

    return rotatedVector;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

let randomInt = (fra, til) => Math.random()*(til-fra) + fra

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

let canvas, c;

function createCanvas(width, height){
    canvas = document.createElement("CANVAS");
    c = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    document.querySelector("body").appendChild(canvas);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


function fillColor(r, g, b, a){
    let color_red, color_green, color_blue, color_alpha;
    color_red = r /*.toString()*/;
    //Alle parametere til stede
    if((typeof r) == "string"){
        let color = r
    }

else{
    if((!!r || r==0) && (!!g || g==0) && (!!b||b==0) && (!!a || a==0)){ color_alpha = a /*.toString()*/; color_green = g /*.toString()*/; color_blue = b /*.toString()*/}
    //Bare rgb
    else if((!!r || r==0) && (!!g || g==0) && (!!b || b==0) && !a){ color_alpha = 1; color_green = g /*.toString()*/; color_blue = b /*.toString()*/ }
    //Bare farge og alpha
    else if((!!r || r==0) && (!!g || g==0) && !b && !a){ color_alpha = g /*.toString()*/; color_green = color_red; color_blue = color_red }
    //Bare farge
    else if((!!r || r==0) && !g && !b && !a){ color_alpha = 1; color_green = color_red; color_blue = color_red }

    let color = `rgba(${color_red}, ${color_green}, ${color_blue}, ${color_alpha})`
}
    c.fillStyle = color;

    return color
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function strokeColor(r, g, b, a){
    let color_red, color_green, color_blue, color_alpha;
    color_red = r /*.toString()*/;
    //Alle parametere til stede
    if((typeof r) == "string"){
        let color = r
    }
    
else{
    if((!!r || r==0) && (!!g || g==0) && (!!b||b==0) && (!!a || a==0)){ color_alpha = a /*.toString()*/; color_green = g /*.toString()*/; color_blue = b /*.toString()*/}
    //Bare rgb
    else if((!!r || r==0) && (!!g || g==0) && (!!b || b==0) && !a){ color_alpha = 1; color_green = g /*.toString()*/; color_blue = b /*.toString()*/ }
    //Bare farge og alpha
    else if((!!r || r==0) && (!!g || g==0) && !b && !a){ color_alpha = g /*.toString()*/; color_green = color_red; color_blue = color_red }
    //Bare farge
    else if((!!r || r==0) && !g && !b && !a){ color_alpha = 1; color_green = color_red; color_blue = color_red }

    let color = `rgba(${color_red}, ${color_green}, ${color_blue}, ${color_alpha})`
}
    c.strokeStyle = color;

    return color
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function color(r, g, b, a){
    let color_red, color_green, color_blue, color_alpha;
    color_red = r /*.toString()*/;
    //Alle parametere til stede
    if((typeof r) == "string"){
        let color = r
    }
    
else{
    if((!!r || r==0) && (!!g || g==0) && (!!b||b==0) && (!!a || a==0)){ color_alpha = a /*.toString()*/; color_green = g /*.toString()*/; color_blue = b /*.toString()*/}
    //Bare rgb
    else if((!!r || r==0) && (!!g || g==0) && (!!b || b==0) && !a){ color_alpha = 1; color_green = g /*.toString()*/; color_blue = b /*.toString()*/ }
    //Bare farge og alpha
    else if((!!r || r==0) && (!!g || g==0) && !b && !a){ color_alpha = g /*.toString()*/; color_green = color_red; color_blue = color_red }
    //Bare farge
    else if((!!r || r==0) && !g && !b && !a){ color_alpha = 1; color_green = color_red; color_blue = color_red }

    let color = `rgba(${color_red}, ${color_green}, ${color_blue}, ${color_alpha})`
}
    c.strokeStyle = color;
    c.fillStyle = color;

    return color
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


function background(color, a){
    if ((typeof color) == "number" && !a){
        c.fillStyle = `rgb(${color}, ${color}, ${color})`
    }
    else if((typeof color) == "number"){
        c.fillStyle = `rgba(${color}, ${color}, ${color}, ${a})`
    }
    else{
        c.fillStyle = color;
    }
    c.fillRect(0, 0, canvas.width, canvas.height)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////


function line(x1, y1, x2, y2){
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
    c.closePath();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

let do_stroke = true;
let do_fill = true;

function doFill(bool){
    if(bool){ do_fill = true }
    else{ do_fill = false }
}

function doStroke(bool){
    if(bool){ do_stroke = true }
    else{ do_stroke = false }
}

function rect(x, y, w, h){
    c.beginPath();
    c.rect(x, y, w, h);
    if(do_stroke){ c.stroke() }
    if(do_fill){ c.fill() }
    c.closePath()
}

function strokeWeight(verdi){
    c.lineWidth = verdi
}
