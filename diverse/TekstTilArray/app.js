const output = document.getElementById("output")
const knapp = document.getElementById("submit")
const input = document.getElementById("input")
const dividerIn = document.getElementById("dividerIn")
const dividerBt = document.getElementById("dividerBt")
var arr = []
var verdi = ""
var dividerx = ""


dividerBt.addEventListener("click", function() {
  return dividerx = dividerIn.value
}
)

knapp.addEventListener("click", function() {
verdi = input.value;
var verdiArr = verdi.split(dividerx);
output.innerHTML= "["
for (var i = 0; i < verdiArr.length; i++) {
if(verdiArr.indexOf(verdiArr[i]) == verdiArr.length-1) {
  output.innerHTML+= '"' + verdiArr[i] + '"' }
else {
  output.innerHTML+= '"' + verdiArr[i] + '"' + ', ' }
}
output.innerHTML+="]"
}
)

function test() {
  console.log("Det funker")
}


// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    knapp.click();
    input.value=""
  }
});

// Execute a function when the user releases a key on the keyboard
dividerIn.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    dividerBt.click();
    dividerIn.value=""
  }
});
