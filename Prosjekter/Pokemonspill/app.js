            var bodyEl = document.querySelector("body")
            var canvas = document.getElementById("canvas")
            var c = canvas.getContext("2d")
            canvas.width = 1200
            canvas.height = 660
            var gridsize = 60
            var pX = 60
            var pY = 60
            bodyEl.addEventListener("keydown", keyFunction)
            var trainerText = "This nigga bout to kick yo ass"
            var batDist = 200
            var circSize = 100
            var pi = Math.PI
            var h = canvas.height
            var w = canvas.width
            var hpColor = "green"
            var speedDiff = 0
            var trainer = true
            
            
            var mapArr = [
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                [1,3,3,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,1],
                [1,3,3,0,4,0,3,3,3,3,3,0,0,0,0,4,0,0,0,1],
                [1,3,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,1],
                [1,3,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,1],
                [1,3,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,1],
                [1,3,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,3,1],
                [1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,1],
                [1,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,1],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
            ]
            
            class Pokemon {
                constructor(name, hp, attack, speed, color){
                    this.name = name
                    this.hp = hp 
                    this.attack = attack
                    this.speed = speed
                    this.color = color
                }
            }

            class Trainer {
                constructor(name, pkmn1, pkmn2, pkmn3, color){
                    this.name = name
                    this.pkmn1 = pkmn1 
                    this.pkmn2 = pkmn2
                    this.pkmn3 = pkmn3
                    this.color = color
                }
            }

            class Move {
                constructor(name, damage, accuracy, pp, type){
                    this.name = name
                    this.damage = damage
                    this.accuracy = accuracy
                    this.pp = pp
                    this.type = type
                }
            }

            var pikachu = new Pokemon("Pikachu", 100, 34, 50, "yellow")
            var charmander = new Pokemon("Charmander", 100, 33, 60, "orange")
            var squirtle = new Pokemon("Squirtle", 100, 36, 40, "lightblue")
            var oddish = new Pokemon("Oddish", 100, 20, 30, "blue")
            var pidgey = new Pokemon("Pidgey", 100, 25, 40, "beige")
            var ratata = new Pokemon("Ratata", 100, 15, 50, "purple")
            
            var player = new Trainer("Ash", pikachu, ratata, pidgey, "black")
            var tyrone = new Trainer("Tyrone", charmander, squirtle, pikachu, "red")
            
            var tackle = new Move ()
            
            var activeTrainer = tyrone
            var activePokemon = ratata
            var opponent = ratata
            
            function fRect(x,y,wid,hei,color){
                c.beginPath()
                c.moveTo(x,y)
                c.fillStyle = color
                c.fillRect(x,y,wid,hei)
                c.fill()
            }

            function fCirc(x,y,r,color){
                c.beginPath()
                c.moveTo(x,y)
                c.fillStyle = color
                c.arc(x,y,r,0,2*pi)
                c.fill()
            }

            function fText(text,x,y,color,font){
                c.beginPath()
                c.moveTo(x, y)
                c.fillStyle = color
                c.font = font
                c.fillText(text, x, y)
                c.fill()
            }
        
            function drawMap() {
                for(var i=0; i<mapArr.length; i++){
                    for(var j=0; j<mapArr[i].length; j++){
                        c.beginPath()
                        c.moveTo(j*gridsize,i*gridsize)
                        if(mapArr[i][j]==0){
                            c.fillStyle = "lightgreen"
                        }
                        if(mapArr[i][j]==1){
                            c.fillStyle = "brown"
                        }
                        if(mapArr[i][j]==2){
                            c.fillStyle = "blue"
                        }
                        if(mapArr[i][j]==3){
                            c.fillStyle = "green"
                        }
                        if(mapArr[i][j]==4){
                            c.fillStyle = "red"
                        }
                        c.fillRect(j*gridsize,i*gridsize,gridsize,gridsize)
                        c.fill()
                    }
                }
            }

            function drawGrid(){
                
                for(i=1; i<canvas.height/gridsize; i++){
                    c.beginPath()
                    c.moveTo(0, gridsize*i)
                    c.lineTo(canvas.width, gridsize*i)
                    c.lineWidth = 3
                    c.stroke()
                }
                
                for(i=1; i<canvas.width/gridsize; i++){
                    c.beginPath()
                    c.moveTo(gridsize*i, 0)
                    c.lineTo(gridsize*i, canvas.height)
                    c.lineWidth = 3
                    c.stroke()
                }
            }
            
            function drawPlayer(){
                c.beginPath()
                c.moveTo(pX,pY)
                c.fillStyle = player.color
                c.fillRect(pX,pY,gridsize,gridsize)
                c.fill()
            }

            function keyFunction(e){
                if(e.keyCode==40){
                    pY+=gridsize
                    text.innerHTML=""
                }
                if(e.keyCode==38){
                    pY-=gridsize
                    text.innerHTML=""
                }
                if(e.keyCode==37){
                    pX-=gridsize
                    text.innerHTML=""
                }
                if(e.keyCode==39){
                    pX+=gridsize
                    text.innerHTML=""
                }
                for(i=0; i<mapArr.length; i++){
                    for(j=0; j<mapArr[i].length; j++){
                        if(mapArr[i][j]==1 || mapArr[i][j]==2 || mapArr[i][j]==4){
                            if(pX==j*gridsize && pY==i*gridsize){
                                if(e.keyCode==40){
                                    pY-=gridsize
                                }
                                if(e.keyCode==38){
                                    pY+=gridsize
                                }
                                if(e.keyCode==37){
                                    pX+=gridsize
                                }
                                if(e.keyCode==39){
                                    pX-=gridsize
                                }
                            }
                        }
                    }    
                }
                if(e.keyCode==32){
                    for(i=0; i<mapArr.length; i++){
                        for(j=0; j<mapArr[i].length; j++){
                            if(mapArr[i][j]==4){
                                if(i*gridsize==pY-gridsize && pX==j*gridsize){
                                    text.innerHTML=trainerText
                                    startBattle()
                                }
                                if(i*gridsize==pY+gridsize && pX==j*gridsize){
                                    text.innerHTML=trainerText
                                    startBattle()
                                }
                                if(j*gridsize==pX-gridsize && pY==i*gridsize){
                                    text.innerHTML=trainerText
                                    startBattle()
                                }
                                if(j*gridsize==pX+gridsize && pY==i*gridsize){
                                    text.innerHTML=trainerText
                                    startBattle()
                                }
                                
                            }
                        }    
                    }
                }
                if(e.keyCode==37||e.keyCode==38||e.keyCode==39||e.keyCode==40){
                    var grassRandom = Math.random()
                    for(k=0; k<mapArr.length; k++){
                        for(l=0; l<mapArr[k].length; l++){
                            if(mapArr[k][l]==3 && pX==l*gridsize && pY==k*gridsize){
                                if(grassRandom<0.2){
                                    trainer = false
                                    startBattle()
                                }
                            }
                        }
                    }
                }
            }

            function battleKeyFunction(e){
                text.innerHTML = "What will Pikachu do?"
                if(e.keyCode==32){
                    console.log(player.pkmn1.hp)
                    battleCalc()
                }
            }
            
            function startBattle(){
                
                bodyEl.removeEventListener("keydown", keyFunction)
                bodyEl.addEventListener("keydown", battleKeyFunction)
                if(trainer == true){
                    findActiveTrainer()
                }
                else{
                    findActivePokemon()
                }
                opponent.hp=100
                player.pkmn1.hp=100
                battleLoop()
            }

            function findActiveTrainer(){
                activeTrainer = tyrone
                opponent = activeTrainer.pkmn1
            }

            function findActivePokemon(){
                var rndmPkmn = Math.random()
                if(rndmPkmn<0.2){
                    activePokemon = oddish
                }
                else if(rndmPkmn<0.6){
                    activePokemon = ratata
                }
                else{
                    activePokemon = pidgey
                }
                opponent = activePokemon
            }

            
            function battleAnimate(){
                fCirc(batDist,h-batDist,circSize,player.pkmn1.color)
                
                fRect(batDist+circSize+50,h-batDist,300,100,"white")
                fText(player.pkmn1.name,batDist+circSize+50,h-batDist+50,"black","50px Arial")
                fText("Hp:",batDist+circSize+50,h-batDist+85,"black","20px Arial")
                fRect(batDist+circSize+80,h-batDist+65,player.pkmn1.hp*2,20,hpColor)
                
                fCirc(w-batDist,batDist,circSize,opponent.color)
                
                fRect(w-350-batDist-circSize,batDist-circSize,300,100,"white")
                fText(opponent.name,w-350-batDist-circSize,batDist-circSize+50,"black","50px Arial")
                fText("Hp:",w-350-batDist-circSize,batDist-circSize+85,"black","20px Arial")
                fRect(w-320-batDist-circSize,batDist-circSize+65,opponent.hp*2,20,hpColor)   
            }

            function speedCheck(){
                speedDiff = pikachu.speed-opponent.speed
            }
            
            function battleCalc(){
                if(speedDiff>=0){
                    opponent.hp-=pikachu.attack
                    if(opponent.hp<=0){
                        text.innerHTML = "You won!"
                    }
                    pikachu.hp-=opponent.attack
                    if(pikachu.hp<=0){
                        text.innerHTML = "You lost!"
                    }
                }
                else{
                    pikachu.hp-=opponent.attack
                    if(pikachu.hp<=0){
                        text.innerHTML = "You lost!"
                    }
                    opponent.hp-=pikachu.attack
                    if(opponent.hp<=0){
                        text.innerHTML = "You won!"
                    }
                }
                if(opponent.hp<=0 || pikachu.hp<=0){
                    bodyEl.addEventListener("keydown", keyFunction)
                    trainer=true
                    requestAnimationFrame(animate)
                }
            }

            function battleLoop(){
                
                c.clearRect(0,0,canvas.width,canvas.height) 
                
                battleAnimate()
                
                requestAnimationFrame(battleLoop)
            }

            function animate(){
                
                c.clearRect(0,0,canvas.width,canvas.height)
                drawMap()
                drawGrid()
                drawPlayer()
                
                requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)