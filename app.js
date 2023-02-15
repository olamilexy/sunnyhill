function setup() {
  createCanvas(400, 400);
}
let myMargin;
//Set some variables
let myLat = 0;
let myLon = 0;

let myTable;

let but;

let MySong;

let geoCheck;



var GPScheckTime = 500;
var currentDistance = 1000000;
var currentZoneRad = 0.005;

let defaultImage;




function preload() {
  // preload() runs once
  soundFormats('mp3', 'ogg');
  MySong = "";
  location1Sound = loadSound('Sounds/50CentinDaclub.mp3');

  defaultImage = loadImage('Images/sunnyhillpark.jpg');
}

function setup() {
  //Make the canvas
  createCanvas(window.innerWidth, window.innerHeight);
  //  getAudioContext().resume();
  myMargin = 30;
  geoCheck = true;
  //Check if geolocation is available
  if (geoCheck == true) {

    //.. and set the callback function success
    var options = {
      enableHighAccuracy: true,
      timeout: GPScheckTime,
      maximumAge: 0
    };
    navigator.geolocation.watchPosition(success, error, options);
  } else {
    //error getting geolocaion
  }

  but = createButton('click');
  but.position(myMargin + myMargin, window.innerHeight - 50);
  but.mousePressed(playLocSound);
  but.hide();


  //Location 1

  location1Sound = loadSound('Sounds/50CentinDaclub.mp3');
  location1Image = loadImage('Images/sunnyhillpark.jpg');
  location1Text = "Welcome Enjoy";
  //Road

  location1Lat = 51.5912317;
  location1Lon = -0.2290925;


}
function draw() {
  background(255, 255, 255);
  checkTargets();


}
function checkTargets() {

  var myDisplayImage = defaultImage;
  var myDisplayText = "";
  var myDisplaySnd = "";
  but.hide();
  //but.show();



  // Location 1 (Road)
  currentDistance = getDistance(myLat, myLon, location1Lat, location1Lon, 'km');
  if (currentDistance < currentZoneRad) {
    myDisplayImage = location1Image;
    myDisplayText = location1Text;
    myDisplaySnd = location1Sound;
    but.show();
  }

  textSize(16);
  fill(0, 0, 0);
  image(myDisplayImage, window.innerWidth * .2, 30, window.innerWidth / 2, window.innerHeight / 2);
  if (myDisplayText == "") {
    showText();
  }
  else {
    text(myDisplayText, myMargin, window.innerHeight - 180, window.innerWidth - myMargin, window.innerHeight - myMargin + 10);
  }
  MySong = myDisplaySnd;



}



// function playLocSound() {
//   getAudioContext().resume();
//   if (MySong != "") {
//     if (!MySong.isPlaying()) {
//       // .isPlaying() returns a boolean
//       MySong.play();

//     }
//     else {
//       MySong.stop();
//     }
//   }
// }

function playLocSound(){
  if (MySong != "" && getAudioContext().state === 'suspended') {
    getAudioContext().resume();
  }
  if (MySong.isPlaying()) {
    MySong.stop();
  } else {
    MySong.play();
  }
}

function showText() {
  textSize(16);
  fill(0, 0, 0);
  text('Lat: ' + myLat, myMargin, window.innerHeight - 180);
  text('Lon: ' + myLon, myMargin, window.innerHeight - 160);

  text('Dist: ' + round(currentDistance, 6), myMargin, window.innerHeight - 140);


}

function success(pos) {
  // called every
  var crd = pos.coords;
  myLat = crd.latitude;
  myLon = crd.longitude;
  myLat = round(myLat, 6);
  myLon = round(myLon, 6);

}

function error(err) {
  text('ERROR!!! ' + err.code + ":" + err.message, 20, 240);
  //  console.warn(`ERROR(${err.code}): ${err.message}`);
}


//http://www.movable-type.co.uk/scripts/latlong.html
// Used Under MIT License
function getDistance(lat1, lon1, lat2, lon2, units) {
  if (units == 'km') {
    var R = 6371; //earth radius in KM
  } else {
    var R = 3959; // earth radius in Miles (default)
  }
  var dLat = (lat2 - lat1) * (Math.PI / 180);
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  createCanvas(w, h);
}

function draw() {
  background(220);
}