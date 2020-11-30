// I denne fila ligger alle spesifikasjonene for alle våpen og tanks, og de ligger
// i funksjoner man kan kalle for å endre tilhørende variabler
// small og big refererer til det valget man hadde i starten, small er Fragile, but Agile, mens 
// big er Tanky, but slow
// disse har i tillegg til ulike variabelstørrelser ulikt utseende og form
let tanks = {
    small: [
        function(){
            player.health = 400
            healthBar.startHealth = 400
            speed = 3
            tankImg.src = "sprites/smallTank1.png"
        },
        function(){
            
            speed = 4
            tankImg.src = "sprites/smallTank2.png"
        },
        function(){
        
            speed = 5
            tankImg.src = "sprites/smallTank3.png"
        },
        function(){
         
            speed = 6
            tankImg.src = "sprites/smallTank4.png"
        },
        function(){
            
            speed = 6.5
            tankImg.src = "sprites/smallTank5.png"
        },
        function(){
       
            speed = 7
            tankImg.src = "sprites/smallTank6.png"
        },
        function(){
            
            speed = 8.5
            tankImg.src = "sprites/smallTank7.png"
        },
    ],
    big: [
        function(){
            player.health = 500
            healthBar.startHealth = 500
            speed = 2.5
            tankImg.src = "sprites/bigTank1.png"
        },
        function(){
            healthBar.startHealth = 600
            speed = 2.5
            tankImg.src = "sprites/bigTank2.png"
        },
        function(){
            healthBar.startHealth = 700
            speed = 2.5
            tankImg.src = "sprites/bigTank3.png"
        },
        function(){
            healthBar.startHealth = 800
            speed = 2.5
            tankImg.src = "sprites/bigTank4.png"
        },
        function(){
            healthBar.startHealth = 900
            speed = 2.5
            tankImg.src = "sprites/bigTank5.png"
        },
        function(){
            healthBar.startHealth = 1000
            speed = 2.5
            tankImg.src = "sprites/bigTank6.png"
        },
        function(){
            healthBar.startHealth = 1500
            speed = 2
            tankImg.src = "sprites/bigTank7.png"
        }
    ]
}

let guns = {
    small: [
        function(){
            gunLength = 63
            gunImg.src = "sprites/bigGun1.png"
            addedDmg = 0
        },
        function(){
            gunLength = 63
            gunImg.src = "sprites/bigGun2.png"
            addedDmg = 20
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/bigGun3.png"
            addedDmg = 50
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/bigGun4.png"
            addedDmg = 75
        },
        function(){
            gunLength = 65
            gunImg.src = "sprites/bigGun5.png"
            addedDmg = 120
        },
        function(){
            gunLength = 50
            gunImg.src = "sprites/bigGun6.png"
            addedDmg = 150
        },
        function(){
            gunLength = 59
            gunImg.src = "sprites/bigGun7.png"
            addedDmg = 200
        },
    ],
    big: [
        function(){
            gunLength = 63
            gunImg.src = "sprites/smallGun1.png"
            addedDmg = 0
        },
        function(){
            gunLength = 63
            gunImg.src = "sprites/smallGun2.png"
            addedDmg = 20
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/smallGun3.png"
            addedDmg = 50
        },
        function(){
            gunLength = 56
            gunImg.src = "sprites/smallGun4.png"
            addedDmg = 75
        },
        function(){
            gunLength = 65
            gunImg.src = "sprites/smallGun5.png"
            addedDmg = 120
        },
        function(){
            gunLength = 50
            gunImg.src = "sprites/smallGun6.png"
            addedDmg = 150
        },
        function(){
            gunLength = 59
            gunImg.src = "sprites/smallGun7.png"
            addedDmg = 200
        },
    ]
}