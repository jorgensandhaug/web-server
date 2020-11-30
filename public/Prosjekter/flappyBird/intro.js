var knappEl = document.getElementById("knapp")
var inputEl = document.getElementById("navn")
var p = document.getElementById("p")
var form = document.querySelector("form")
var intro = document.getElementById("intro")

var container = document.getElementById("container")

function startSpill(){
     //viser spillet og skjuler innloggingen
     container.style = "display: flex;"
     intro.style = "display: none;"
}

if(window.localStorage.getItem("name") != null){

   startSpill()
}
form.onsubmit = function(e){
    //denne er med for å hindre at siden lastes inn på nytt
    e.preventDefault()
    //om siden ikke finner et lagret navn må du skrive inn navnet ditt, hvis ikke blir du sendt til spillet
    
            var navn = inputEl.value
            window.localStorage.setItem("name",navn)

           startSpill()
    
}
