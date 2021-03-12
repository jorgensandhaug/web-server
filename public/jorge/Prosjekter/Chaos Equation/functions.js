function toString(foo){
    const string = foo.toString();
    return string.substring(string.indexOf("{")+2, string.indexOf("}")).replace("return", "");
}


function newEquation(mainEqString, x, y){
    return "return " + replaceXY(mainEqString, toString(x), toString(y));
}

function replaceXY(main, x, y){
    const arr = main.split("");
    for(let i = 0; i < arr.length; i++){
        if(arr[i] == "x") arr[i] = "("+x+")";
        else if(arr[i] == "y") arr[i] = "("+y+")";
    }
    return arr.join("");
}


function evaluate(string){
    let leftCount = 0;
    let rightCount = 0;
    const startIndex = string.indexOf("(");
    if(startIndex != -1){
        let endIndex;
        for(let i = string.length-1; i > startIndex; i--){
            
        }
    }
    
}