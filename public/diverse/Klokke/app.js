

function klokkeInterval() {
  var tid = new Date();
  var timer = tid.getHours();
  var minutter = tid.getMinutes();
  var sekunder = tid.getSeconds();

  if (timer < 10) {
    timer = "0" + timer;
  }
  if (minutter < 10) {
    minutter = "0" + minutter;
  }
  if (sekunder < 10) {
    sekunder = "0" + sekunder;
  }


  document.getElementById('time').innerHTML=timer + ":";
  document.getElementById('minutt').innerHTML=minutter + ":";
  document.getElementById('sekund').innerHTML=sekunder;
}

setInterval(klokkeInterval, 100);
