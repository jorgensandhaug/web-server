const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const w = canvas.width;
const h = canvas.height;

const mainEqX = "x-y-x*y+x*t"//-x^2+y^2";
const mainEqY = "x-y+x*t-y*t"//-x^2-y^2-t^2";

const n = 2;

let colorArr = [];
let equations = [new Equation("return t", "return t")];
//console.log(toString(equations[0].equationX))

for(let i = 0; i < n; i++){
    colorArr[i] = [Math.random()*255, Math.random()*255, Math.random()*255];
    equations[i+1] = new Equation(newEquation(mainEqX, equations[i].equationX, equations[i].equationY), newEquation(mainEqY, equations[i].equationX, equations[i].equationY));
}

equations.forEach(eq =>{
    console.log(eq.equationX)
})