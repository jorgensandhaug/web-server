var player;
var running = false;
var lives = 20;
var lifeState = true;
var gameState = true;
var block;
var blockArray=[]
var tileArr=[]
var kart, cols, rows;
var tileSize= 32;
var farge;
var grassTop, water, dirt, lavaLilla, lava;
var skyer;
var currentMap;
var tekst = false;
var playerSprite, playerGul, spike0, spike1, spike2, spike3, spikeState, previousSpike;
var currentPlayer = "pFRight";
var currentStatus = "right"

var projectileArr = [];
var testPro;

var musX, musY;

var map1 = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [8, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 3, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ]



  var map2 = [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
              [3, 3, 3, 3, 3, 3, 5, 6, 6, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 1, 1, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
              [3, 3, 3, 3, 3, 3, 5, 0, 0, 5, 3, 3, 3, 6, 8, 3, 3, 3, 3, 0, 1, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 2, 3, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 5, 0, 0, 5, 3, 3, 3, 6, 6, 3, 3, 3, 3, 0, 1, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 3, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 5, 0, 0, 6, 0, 6, 0, 0, 0, 3, 5, 5, 5, 5, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 5, 0, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 5, 0, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 3, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 3, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 5, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],
              [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ,3, 3],

]

var map3 = [
            [0, 0, 6, 0, 0, 6, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 6, 6, 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 8, 0, 0, 0, 2, 2, 2],
            [0, 0, 6, 0, 0, 6, 0, 6, 0, 0, 6, 0, 0, 2, 2, 2, 2, 2, 6, 6, 1, 5, 5, 5, 5, 5, 5, 5, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [2, 2, 2, 5, 5, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 3, 2, 2, 1, 5, 5, 5, 5, 5, 5, 5, 5, 6, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1],
            [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1],
            [0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1],
            [1, 1, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 2, 2],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 0, 6, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            [1, 1, 0, 6, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [5, 5, 5, 5, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 6, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  ]





var mapArr = [map1, map2, map3]








 function preload(){
   grassTop = loadImage("Images/grassTop.png");
   water = loadImage("Images/water.png");
   dirt = loadImage("Images/dirt.png");
   skyer = loadImage("Images/skyer.jpg")
   playerSprite = loadImage("Images/player.png")
   playerGul = loadImage("Images/playerGul.png")
   spike0 = loadImage("Images/spike0.png")
   spike1 = loadImage("Images/spike1.png")
   spike2 = loadImage("Images/spike2.png")
   spike3 = loadImage("Images/spike3.png")
   lavaLilla = loadImage("Images/lavaLilla.png")
   lava = loadImage("Images/lava.png")


}
function setup() {
  createCanvas(innerWidth-20, innerHeight-40);
  player = new Rect(20,  28*tileSize-178, 80, 80);
  frameRate(60)

  spikeState = spike0;



/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////




  newMap(map1)




/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////



setInterval(function(){if(mouseIsPressed){projectileArr.push(new Projectile)}}, 100)





  setInterval(function(){if(running){
if(currentStatus == "right"){
    if(currentPlayer == "pFLeft" || currentPlayer == "pLeft"){currentPlayer = "pFRight"}
  if(currentPlayer == "pFRight"){ player.sx = 200; currentPlayer = "pRight"}
  else if(currentPlayer == "pRight"){ player.sx = 0; currentPlayer = "pFRight"}
}

else if(currentStatus == "left"){
  if(currentPlayer == "pFRight" || currentPlayer == "pRight"){currentPlayer = "pFLeft"}
if(currentPlayer == "pFLeft"){ player.sx = 200; currentPlayer = "pLeft"}
else if(currentPlayer == "pLeft"){ player.sx = 0; currentPlayer = "pFLeft"}
}

}}  , 100);


setInterval(function(){
  switch(spikeState){
    case spike0: spikeState = spike1; previousSpike = 0; break;
    case spike1: if(previousSpike == 0){spikeState = spike2} else {spikeState = spike0}; break;
    case spike2: if(previousSpike == 3){spikeState = spike1} else {spikeState = spike3}; break;
    case spike3: spikeState = spike2; previousSpike = 3; break;
  }
}, 100)


}





function draw() {
  background(skyer);
  translate(-player.pos.x+700, -player.pos.y+400);

  musX = mouseX+player.pos.x-700
  musY = mouseY+player.pos.y-400








 for(var i = 0; i<tileArr.length; i++){
    tileArr[i].draw()



 if(isCollidingRect(player, tileArr[i])){
      if(player.beforeBottom < player.sides.bottom && player.beforeBottom<tileArr[i].sides.top+0.1 && !keyIsDown(16) && tileArr[i].num == 2) {
      player.pos.y = tileArr[i].sides.top - player.h;
      player.vel.y=0; player.jumping = false;
      }
      else if(player.beforeBottom < player.sides.bottom && player.beforeBottom<tileArr[i].sides.top+0.1 && tileArr[i].num == 3) {
      player.pos.y = tileArr[i].sides.top - player.h;
      player.vel.y=0; player.jumping = false;
      }
   }

  if(isCollidingRect(player, tileArr[i]) && tileArr[i].num== 1
    && !keyIsDown(16)) {
  if(player.vel.y>-5){player.vel.y-=2} ;
  }

  if(isCollidingRect(player, tileArr[i])){
    if(tileArr[i].f == "yellow"){ player.sprite = playerGul}
    else if(tileArr[i].f == "green" && player.sprite == playerGul){
      nextMap();
    }
    else if(tileArr[i].num == 6 || tileArr[i].num == 5){restart()}
    else if(tileArr[i].num == 4){player.sprite = playerSprite}
    // else if(tileArr[i].num == 3){solidCollition(tileArr[i])}


  }


hitEnemy(i);





}

  player.update();



for(var i=0; i<projectileArr.length; i++){
    projectileArr[i].update();
}


fill("black");
textStyle(BOLD);
textSize(32);
text("Lives :" + lives, 500, 700)

if(tekst){
  fill("green");
  textSize(100)
  text("You Won!", 500, 600)
}
if(lives <= 0 && !tekst){
  fill("red");
  textSize(100);
  text("You Lost, buhu", 500, 600);
  if(gameState){  setTimeout(function (){restartGame()}, 5000)}
  gameState = false;

}


}






function Rect(x, y, w, h){
  this.pos = createVector(x, y),
  this.vel = createVector(),
  this.acc = createVector(0, 1),
  this.w = w,
  this.h = h,
  this.jumping = false,
  this.color = "grey",
  this.sx = 200,
  this.sy = 0,
  this.sprite = playerSprite,


  this.sides =  {
    top : this.pos.y,
    bottom : this.pos.y+this.h,
    left : this.pos.x+25,
    right : this.pos.x+this.w-25
 }



  this.draw = function(){
    image(this.sprite, this.pos.x, this.pos.y, this.w, this.h, this.sx, this.sy, 180, 180)
  }



  this.update = function(){
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
    this.vel.x+=this.acc.x;
    this.vel.y+=this.acc.y;



  this.beforeTop = this.sides.top;
  this.beforeBottom = this.sides.bottom;
  this.beforeLeft = this.sides.left;
  this.beforeRight = this.sides.right;




    this.sides =  {
    top : this.pos.y,
    bottom : this.pos.y+this.h,
    left : this.pos.x+25,
    right : this.pos.x+this.w-25
 };










    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
      this.vel.x=4; this.sy = 0; currentStatus = "right"; running = true}
    else if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
      this.vel.x=-4; this.sy = 200; currentStatus = "left"; running = true}
   else{this.vel.x*=0.9; running = false}


    if((keyIsDown(32) || keyIsDown(UP_ARROW)) && this.jumping==false){jump(this, 15)}


    // if(this.pos.y+this.h> 28*tileSize-128){this.vel.y=0;
    //   this.pos.y= 28*tileSize-this.h-128; this.jumping=false }



      if(player.pos.y > 2000){restart()}



      if(player.pos.x > 19 && player.pos.x < 25){lifeState = true}






  this.draw();
 }
}



function Tile(x, y, w, h, img, num){
  this.x = x,
  this.y = y,
  this.w = w,
  this.h = h,
  this.img = img
  this.num = num,


  this.sides =  {
    top : this.y,
    bottom : this.y+this.h,
    left : this.x,
    right : this.x+this.w
 }


this.draw = function(){
   image(this.img, this.x, this.y, 32, 32)
  }
}


function isCollidingRect(rect1, rect2){
  if(rect1.sides.right<rect2.sides.left || rect1.sides.left>rect2.sides.right || rect1.sides.bottom<rect2.sides.top || rect1.sides.top>rect2.sides.bottom){return false}

  return true;
}


function hitEnemy(indeks){
  for(var j=0; j<projectileArr.length; j++){
    if(distance(projectileArr[j].x, projectileArr[j].y, tileArr[indeks].x+16, tileArr[indeks].y+16) < 20){
        if(tileArr[indeks].num == 6){tileArr.splice(indeks, 1); projectileArr.splice(j, 1)}

    }
  }
}



// function hitPlayer(){
//   for(var j=0; j<projectileArr.length; j++){
//     if(distance(projectileArr[j].x, projectileArr[j].y, player.pos.x+40, player.pos.y+40) < 40){
//         restart();
//     }
//   }
// }




function bottom(rect){
  return createVector(rect.pos.x+(rect.w/2), rect.y+rect.h)}


function jump(person, amp){
person.vel.y=-amp; person.jumping=true
}




function newMap(kart){
  tileArr=[];
  currentMap = kart;
  for(var i = 0; i<kart.length; i++){
    for(var j = 0; j<kart[i].length; j++){

             if(kart[i][j] === 2){tileArr.push(new Tile(j*tileSize, i*tileSize, tileSize, tileSize, grassTop, 2))}  //grassTop
        else if(kart[i][j] === 1){tileArr.push(new Tile(j*tileSize, i*tileSize, tileSize, tileSize, water, 1))}  //water
        else if(kart[i][j] === 3){tileArr.push(new Tile(j*tileSize, i*tileSize, tileSize, tileSize, dirt, 3))} //dirt
        else if(kart[i][j] === 8){tileArr.push(new CheckBox(j*tileSize+5, i*tileSize+5, "yellow", 8))}
        else if(kart[i][j] === 9){tileArr.push(new CheckBox(j*tileSize+5, i*tileSize+5, "green", 9))}
        else if(kart[i][j] === 6){tileArr.push(new Enemy(j*tileSize+5, i*tileSize+5, 6))}
        else if(kart[i][j] === 4){tileArr.push(new Tile(j*tileSize, i*tileSize, tileSize, tileSize, lavaLilla, 4))}
        else if(kart[i][j] === 5){tileArr.push(new Tile(j*tileSize, i*tileSize, tileSize, tileSize, lava, 5))}  //lava


      }
    }
  return tileArr
}


function CheckBox(x, y, f, num){
this.pos = createVector(x, y)
this.f = f
this.num = num

  this.sides =  {
  top : this.pos.y,
  bottom : this.pos.y+20,
  left : this.pos.x,
  right : this.pos.x+20
},

  this.draw = function(){
    fill(this.f);
    rect(this.pos.x, this.pos.y, 20, 20);
  }
}


function nextMap(){

if(mapArr.indexOf(currentMap) == mapArr.length-1){tekst = true}
else{
  jump(player, 15)
  newMap(mapArr[mapArr.indexOf(currentMap)+1]);
  player.pos = createVector(20,  25*tileSize-player.h);
  player.sprite = playerSprite;
}
}



function Projectile(){
  if(currentPlayer=="pFRight" || currentPlayer=="pRight"){
    this.x = player.pos.x+player.w-25;
    this.y = player.pos.y+40;
    this.dirr = 1
  }
  else if(currentPlayer=="pFLeft" || currentPlayer=="pLeft"){
    this.x = player.pos.x+25;
    this.y = player.pos.y+40;
    this.dirr = -1
  }



  this.r = 10
  this.acc = 0.4
  this.difX = musX-this.x
  this.difY = musY-this.y
  // this.hypotenus = Math.sqrt(Math.pow(this.difX, 2) + Math.pow(this.difY, 2))
  this.angle = atan(this.difY/this.difX)
  if(this.difX<0){this.dirr = -1}
  else{this.dirr = 1}


  this.vel = createVector(cos(this.angle)*10*this.dirr, sin(this.angle)*10*this.dirr),



    this.draw = function(){
      push()
      strokeWeight(5)
      stroke("black")
      line(this.befX, this.befY, this.x, this.y)
      pop()
    }

    this.update = function(){
      this.befX = this.x
      this.befY = this.y
      
      this.x += this.vel.x;
      this.y += this.vel.y;
      this.vel.y += this.acc;

      this.draw();

    }


}


// function mouseClicked(){
// projectileArr.push(new Projectile)
// }




function Enemy(x, y, num){
this.x = x,
this.y = y,
this.num = num

this.sides =  {
top : this.y+5,
bottom : this.y+28,
left : this.x,
right : this.x+28
}

this.draw = function(){
  image(spikeState, this.x, this.y, tileSize, tileSize, 0, 0, tileSize, tileSize)
}

}


function distance(x1, y1, x2, y2){
return  Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
}



function restart(){
      player.pos = createVector(20,  25*tileSize-player.h);
      player.sprite = playerSprite;
      newMap(currentMap);
      projectileArr = [];
      jump(player, 15)
      if(lifeState){lives--; lifeState = false}
}

function restartGame(){
  player.pos = createVector(20,  25*tileSize-player.h);
  player.sprite = playerSprite;
  newMap(map1);
  jump(player, 15)
  lives = 20;
  gameState = true;
}


// function solidCollition(tile){
//   var margin = 0;
//   if(player.beforeRight < tile.sides.left && player.sides.bottom > tile.sides.top){player.pos.x = tile.x-player.w-margin '' 25}
//   else if(player.beforeLeft > tile.sides.right && player.sides.bottom > tile.sides.top){player.pos.x = tile.x + tile.w + margin + 25}
//   else if(player.beforeBottom < tile.sides.top){player.pos.y = tile.y - player.h}
//
// }
