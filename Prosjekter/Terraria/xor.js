function encrypt(s, k){
    var a = ""
    console.log(s.length)
    for(i=0; i<s.length; i++){
        console.log(s[i])
        console.log(s[i].charCodeAt())
        a+=(String.fromCharCode(toNumber(xor(toBinary(s[i].charCodeAt()), toBinary(k)))))
    }
    return a
}
function toBinary(n){
    var b = []
    for(j=6; j>=0; j--){
        if(n>=Math.pow(2, j)){
            b.push(1)
            n-=Math.pow(2, j)
        }
        else{
            b.push(0)
        }
    }
    return b
}

function xor(a, b){
    var r = []
    for(k=0; k<a.length; k++){
        if(a[k]==b[k]){
            r.push(0)
        }
        else{
            r.push(1)
        }
    }
    return r
}

function toNumber(b){
    var s = 0
    for(l=0; l<b.length; l++){
        if(b[l]==1){
            s+=Math.pow(2, b.length-1-l)
        }
    }
    return s
}
console.log(encrypt("heisann", 63))