
//sørger for at enemiesa skal følge etter "halen"
setInterval(()=>{
    prevPos = player.pos
}, 1000)

//sørger for at elapsed time oppdateres hele tiden (ikke helt nøyaktig, men funker helt greit)
setInterval(function(){
    tid+=0.01
}, 10)

//selve loopen som kjører alt av bevegelse og kollisjoner
function loop(){
    requestAnimationFrame(loop)

    //sjekker om banen er tom for enemies og at jeg har satt variabelen slik at ny wave skal starte lik true 
    if(hunterArr.length == 0 && readyToStartNewWave){
        wave += 1
        if(wave > record) {
            record = wave
            localStorage.setItem("record", record)
        }

        //caller funksjon for å starte waven
        waves[wave-1]()
    }
    if(!stop){
        c.clearRect(0, 0, canvas.width, canvas.height)

        //sjekker om spilleren prøver å skyte
        if(mouseIsPressed && (mode == "lmg" || mode == "smg")){
            spray()
        }
        

        //oppdaterer alle splintene som kommer fra de gule enemiesa
        for(let i = 0; i < splintArr.length; i++){
            splintArr[i].update()
            if(splintArr[i].dead){
                splintArr.splice(i, 1)
                i-=1
            }
        }


        


        //alt med bullets
        for(let i = 0; i<bulletArr.length; i++){
            
            //oppdaterer posisjonen
            bulletArr[i].update()

            
            for(let k = 0; k<hunterArr.length; k++){
                //sjekker om bullets treffer noen av enemiesa(hunters), og sørger for at den ikke kan treffe den samme flere ganger
                if(distance(hunterArr[k].pos, bulletArr[i].pos) < bulletArr[i].r + hunterArr[k].r && bulletArr[i].connectedHunter != hunterArr[k]){
                    bulletArr[i].connectedHunter = hunterArr[k]
                    bulletArr[i].pierces += 1

                    //hvis truffet mister enemien liv
                    hunterArr[k].health -= bulletArr[i].damage
                }
            }

            //gjelder for shotgun
            if(bulletArr[i].fallOff == true){
                if(distance(bulletArr[i].pos, bulletArr[i].startPos) > fallOffRange*0.25 && bulletArr[i].switch1) {bulletArr[i].damage -= 50; bulletArr[i].switch1 = false}
                if(distance(bulletArr[i].pos, bulletArr[i].startPos) > fallOffRange*0.7 && bulletArr[i].switch2) {bulletArr[i].damage -= 70; bulletArr[i].switch2 = false}
                if(distance(bulletArr[i].pos, bulletArr[i].startPos) > fallOffRange) {
                    bulletArr.splice(i, 1)
                    i-=1
                }
            }

            //bullets skal bli ødelagt etter at de har gått gjennom et visst antall enemies
            else if(bulletArr[i].pierces > pierces + basePierces){
                bulletArr.splice(i, 1)
                i-=1
            }
            //eller hvis de er utenfor skjermen (for å hindre at unødvendige prosesser gjør at det lagger)
            else if(bulletArr[i].pos.x < 0 || bulletArr[i].pos.x > canvas.width || bulletArr[i].pos.y < 0 || bulletArr[i].pos.y > canvas.height){
                bulletArr.splice(i, 1)
                i-=1
            }
        }

        //sørger for at enemiesa holder seg litt unna hverandre (de dyttes fra hverandre)
        for(let i = 0; i<hunterArr.length; i++){
            for(let k = 0; k<hunterArr.length; k++){
                if(i!=k && distance(hunterArr[i].pos, hunterArr[k].pos) < hunterArr[i].r + hunterArr[k].r){
                    //finner vinkelen(phi) mellom enemies og dytter de hver sin vei langs denne retningen
                    let deltaX = hunterArr[k].pos.x - hunterArr[i].pos.x
                    let deltaY = hunterArr[k].pos.y - hunterArr[i].pos.y
                    let phi = Math.atan2(deltaY, deltaX)
                    hunterArr[i].pos.x+= -Math.cos(phi)*pushAwayStrengt
                    hunterArr[i].pos.y+= -Math.sin(phi)*pushAwayStrengt
                    hunterArr[k].pos.x+= Math.cos(phi)*pushAwayStrengt
                    hunterArr[k].pos.y+= Math.sin(phi)*pushAwayStrengt
                }
            }
            
            //sjekker om spilleren kolliderer med enemy
            if(distance(hunterArr[i].pos, player.pos) < player.r + hunterArr[i].r){
                damagedAudio.play()
                player.health -= 50
                //finner vinkelen(phi)mellom spiller og enemy og dytter enemy unna langs denne retningen
                let deltaX = player.pos.x - hunterArr[i].pos.x
                let deltaY = player.pos.y - hunterArr[i].pos.y
                let phi = Math.atan2(deltaY, deltaX)
                hunterArr[i].vel.x += -Math.cos(phi)*pushWhenHitStrength
                hunterArr[i].vel.y += -Math.sin(phi)*pushWhenHitStrength

                //kjører en manuell oppdatering
                hunterArr[i].pos.x += hunterArr[i].vel.x
                hunterArr[i].pos.y += hunterArr[i].vel.y
                hunterArr[i].slowDown = true
                
                //caller funksjon som sørger for at slowdown stopper igjen
                stopSlowDown(hunterArr[i])
            }
            //oppdaterer posisjonen til enemies
            hunterArr[i].update()

            //sjekker om enemy er død
            if(hunterArr[i].health <=0){
                //hvis det er en sploder så skal den eksplodere i det den dør
                if(hunterArr[i].constructor.name == "Sploder") hunterArr[i].explode()
                
                hunterArr.splice(i, 1)
                i-=1
                killCount += 1
                player.money += moneyPerKill
            }
        }

        //oppdaterer og tegner player, healthbar, moneybar og healthpots
        player.update()
        healthBar.draw()
        moneyBar.draw()
        healthPots.draw()

        //displayer wavenummer og våpen og kills osv
        c.font = "19px monospace"
        c.fillText(`Weapon: ${mode.toUpperCase()}  ::  Wave: ${wave}, Record: ${record}`, 20, 25)

        //regner ut antall minutter og sekunder basert på antall sekunder som har gått
        c.fillText(`${Math.floor(tid/60)} min, ${Math.floor(tid)%60} sek  ::  Kills: ${killCount}`, 20, 75)

        //tegner crosshair istedet for å tegne musepeker
        c.drawImage(crosshair, 0, 0, 100, 100, mouse.x-8, mouse.y-8, 16, 16)
    }
}
loop()