// I denne fila ligger alt som har med wave-systemet å gjøre

//funksjon som brukes i hver wave, der parameterene endrer seg
function startNewWave(text, countDownTime, text2, foo){
    playAudio(winAudio)
    let rgbAlpha = 0
    let tempTime = 0
    overlayInterval = setInterval(() => {
        if(!stop){
            overlay.style.color = `rgba(0, 0, 0, ${rgbAlpha})`
            overlay.innerHTML = `${text} ${countDownTime - Math.ceil(tempTime)} <br> <br> <p>${text2}</p>`
            if(rgbAlpha < 1) rgbAlpha += 0.002
            tempTime += 0.01
            if(tempTime > countDownTime) foo()
        }
    }, 10)
}

// alle funksjonene som setter i gang de ulike wavesa
// de er ganske like alle sammen, men det er mange små justeringer for hver runde
// med tanke på health, spawninterval, speed osv
let waves = [
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 1 starting in", 15, "Move with the WASD keys <br> Aim and shoot with the mouse <br> Press ESC to pause/unpause the game at any time <br> Press H to use Health Potion <br> <br> Try to survive as long as possible",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 6                                                       
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(1, 100))
                }
            }, 1000)
        }
    )
},
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 2 starting in", 10, "Tankier enemies",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 12                                                      
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(1, 150))
                }
            }, 1000)
        }
    )
},
() => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 3 starting in", 10, "Increased speed",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 24                                                    
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(2, 150))
                }
            }, 1000)
        }
    )
},
    () => {
        readyToStartNewWave = false
        canvas.style.filter = "blur(3px)"
        startNewWave("Wave 4 starting in", 10, "Quicker spawns",
        function(){
            clearInterval(overlayInterval)
            overlay.innerHTML = ""
            stop = false
            canvas.style.filter = "none"
            let antallHunters = 35                                                      
            let deployedHunters = 1
            hunterInterval = setInterval(() => {
                if(!stop){
                    if(deployedHunters == antallHunters){
                        clearInterval(hunterInterval)
                        readyToStartNewWave = true
                    }
                    deployedHunters += 1
                    hunterArr.push(new Hunter(2, 150))
                }
            }, 700)
        }
    )
},
() => {
    readyToStartNewWave = false
    canvas.style.filter = "blur(3px)"
    startNewWave("Wave 5 starting in", 10, "Even tankier",
    function(){
        clearInterval(overlayInterval)
        overlay.innerHTML = ""
        stop = false
        canvas.style.filter = "none"
        let antallHunters = 40                                                     
        let deployedHunters = 1
        hunterInterval = setInterval(() => {
            if(!stop){
                if(deployedHunters == antallHunters){
                    clearInterval(hunterInterval)
                    readyToStartNewWave = true
                }
                deployedHunters += 1
                hunterArr.push(new Hunter(2, 200))
            }
        }, 700)
    }
)
},
() => {
    readyToStartNewWave = false
    canvas.style.filter = "blur(3px)"
    startNewWave("Wave 6 starting in", 10, "Tanky enemies that explode upon death (extra cash)",
    function(){
        clearInterval(overlayInterval)
        moneyPerKill *= 2
        splodeDamage += 100
        splodeRange += 150
        overlay.innerHTML = ""
        stop = false
        canvas.style.filter = "none"
        let antallHunters = 5                                                   
        let deployedHunters = 1
        hunterInterval = setInterval(() => {
            if(!stop){
                if(deployedHunters == antallHunters){
                    clearInterval(hunterInterval)
                    readyToStartNewWave = true
                    moneyPerKill /= 2
                    splodeDamage -= 100
                    splodeRange -= 150
                }
                deployedHunters += 1
                hunterArr.push(new Sploder(2.5, 1000))
            }
        }, 100)
    }
)
},
() => {
    readyToStartNewWave = false
    canvas.style.filter = "blur(3px)"
    startNewWave("Wave 7 starting in", 10, "Chaos",
    function(){
        clearInterval(overlayInterval)
        overlay.innerHTML = ""
        let tempSplodeDamage = splodeDamage
        splodeDamage -= 25
        stop = false
        canvas.style.filter = "none"
        let antallHunters = 100                                               
        let deployedHunters = 1
        hunterInterval = setInterval(() => {
            if(!stop){
                if(deployedHunters == antallHunters){
                    clearInterval(hunterInterval)
                    readyToStartNewWave = true
                    splodeDamage = tempSplodeDamage
                }
                deployedHunters += 1
                hunterArr.push(new Sploder(1.5, 26))
            }
        }, 400)
    }
)
}
]

let tempSpeed = 2
let tempHealth = 200
let deployedHunters = 1

for(let i = 8; i < 100; i++){
    
    waves.push(
        () => {
            readyToStartNewWave = false
            canvas.style.filter = "blur(3px)"
            startNewWave(`Wave ${i} starting in`, 5, "",
            function(){
                clearInterval(overlayInterval)
                overlay.innerHTML = ""
                stop = false
                canvas.style.filter = "none"
                
                let antallHunters = randomInt(40, 150)                                
                deployedHunters = 1
                tempSpeed += 0.025
                tempHealth += 1.5

                hunterInterval = setInterval(() => {
                    if(!stop){
                        if(deployedHunters >= antallHunters){
                            clearInterval(hunterInterval)
                            readyToStartNewWave = true
                        }
                        deployedHunters += 1
                        i%4==0 ? hunterArr.push(new Sploder(tempSpeed, tempHealth)) : hunterArr.push(new Hunter(tempSpeed, tempHealth))
                    }
                }, randomInt(300, 800))
            }
        )
        },
    )
}


let freemode = () => {
    readyToStartNewWave = false
    canvas.style.filter = "blur(3px)"
    startNewWave("Freemode starting in", 10, "Have fun",
    function(){
        wave = "Freemode"
        clearInterval(overlayInterval)
        overlay.innerHTML = ""
        stop = false
        canvas.style.filter = "none"                                                  
        hunterInterval = setInterval(() => {
            if(!stop){
                hunterArr.push(new Hunter(2, 400))
            }
        }, 300)
    }
)
}
waves.push(freemode)