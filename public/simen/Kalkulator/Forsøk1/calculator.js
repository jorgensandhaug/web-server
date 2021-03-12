// import {
//     arrayPush,
//     updateDisplay,
//     calculate,
//     getOperator,
//     clearAll,
//     sqrt,
//     backSpace,
//     plusMinus,
//     sinCosTanLgLn,
//     aSinCosTan,
//     factorial,
// } from 'functions';

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

let currentSecondOperand;

const opArr = ["+", "-", "*", "/", "^"];

const display = document.querySelector('#display');

const miniDisplay = document.querySelector('#miniDisplay');

const frstOpNum = () => Number(firstOperandArr.join(""));

let firstOperandArr = [];
let secondOperandArr = [];

updateDisplay();

function arrayPush(n) {
    if (!calculator.waitingForSecondOperand) {
        firstOperandArr.push(n.toString());
        calculator.displayValue = frstOpNum();
        updateDisplay();
    } else {
        secondOperandArr.push(n.toString());
        calculator.displayValue = Number(secondOperandArr.join(""));
        updateDisplay();
    }
}

function updateDisplay() {
    display.value = calculator.displayValue;
    if (display.value == Infinity) miniDisplay.innerHTML = "Error";
}

function calculate() {
    if (secondOperandArr != 0) currentSecondOperand = secondOperandArr;
    miniDisplay.innerHTML = frstOpNum();
    let a = frstOpNum();
    let b = Number(currentSecondOperand.join(""));
    secondOperandArr = [];
    calculator.waitingForSecondOperand = true;
    if (opArr.includes(calculator.operator)) {
        let ans;
        let op = calculator.operator;
        miniDisplay.innerHTML += " " + calculator.operator + " " + b + " = ";
        if (op == "*") ans = a * b;
        else if (op == "/") ans = a / b;
        else if (op == "+") ans = a + b;
        else if (op == "-") ans = a - b;
        else if (op == "^") ans = Math.pow(a, b);
        calculator.displayValue = ans;
        updateDisplay();
        firstOperandArr = Number(ans).toString().split("");
    } else if (calculator.operator == "xroot") {
        let ans = Math.pow(a, 1 / b);
        miniDisplay.innerHTML = a + "^1/" + b;
        calculator.displayValue = ans;
        updateDisplay();
        firstOperandArr = Number(ans).toString().split("");
    } else miniDisplay.innerHTML = calculator.displayValue;
}


function getOperator(a) {
    if (!calculator.waitingForSecondOperand) {
        miniDisplay.innerHTML = calculator.displayValue;
        let A = a == "x" ? "*" : a
        calculator.operator = A
        calculator.firstOperand = Number(calculator.displayValue);
        calculator.waitingForSecondOperand = true;
    }
}

function clearAll() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;

    firstOperandArr = [];
    secondOperandArr = [];
    updateDisplay();
    miniDisplay.innerHTML = "0";
}

function sqrt() {
    let a = frstOpNum();
    miniDisplay.innerHTML = "sqrt(" + firstOperandArr.join("") + ") = ";
    calculator.displayValue = Math.sqrt(a);
    updateDisplay();
    firstOperandArr = Math.sqrt(a).toString().split("");
    secondOperandArr = [];
    calculator.waitingForSecondOperand = false;
}

function backSpace() {
    firstOperandArr.pop();
    calculator.displayValue = frstOpNum();
    updateDisplay();
}

function plusMinus() {
    firstOperandArr = (frstOpNum() * -1).toString().split("");
    calculator.displayValue = frstOpNum();
    updateDisplay();
}

function sinCosTanLgLn(a) {
    let ans;
    if(a == "sin") ans = Math.sin(frstOpNum());
    else if(a == "tan") ans = Math.tan(frstOpNum());
    else if(a == "cos") ans = Math.cos(frstOpNum());
    else if(a == "lg") ans = Math.log10(frstOpNum());
    else if(a == "ln") ans = Math.log(frstOpNum());
    miniDisplay.innerHTML = a + "(" + firstOperandArr.join("") + ") = ";
    calculator.displayValue = ans;
    updateDisplay();
    firstOperandArr = ans.toString().split("");
    secondOperandArr = [];
    calculator.waitingForSecondOperand = false;
}

function aSinCosTan(a) {
    let ans;
    if(a == "asin") ans = Math.asin(frstOpNum());
    else if(a == "atan") ans = Math.asin(frstOpNum());
    else if(a == "acos") ans = Math.acos(frstOpNum());
    miniDisplay.innerHTML = a + "(" + firstOperandArr.join("") + ") = ";
    calculator.displayValue = ans;
    updateDisplay();
    firstOperandArr = ans.toString().split("");
    secondOperandArr = [];
    calculator.waitingForSecondOperand = false;
}

function factorial() {
    let sum = frstOpNum();
    miniDisplay.innerHTML = frstOpNum() + "! = ";
    for (i = frstOpNum() - 1; i > 0; i--) {
        sum *= i;
    }
    calculator.displayValue = sum;
    updateDisplay();
    firstOperandArr = sum.toString().split("");
    secondOperandArr = [];
    calculator.waitingForSecondOperand = false;
}

document.addEventListener("keypress", function (e) {
    if (/[0-9]/.test(e.key)) arrayPush(Number(e.key));
    else if (e.key == ".") arrayPush(".");
    else if (e.key == "!") factorial();
    else if (opArr.includes(e.key)) getOperator(e.key);
    else if (e.key == "=") calculate();
    else if (e.key == "c") clearAll();
})

document.addEventListener("keydown", function (e) {
    if (e.key == "Backspace") backSpace();
})