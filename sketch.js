var mySong;
var myImage;
var analyzer;
var col1 = '#1e96fc';
var col2 = '#ffc600';
var col3 = '#072ac8';
var col4 = '#fcf300';


function preload() {
  mySong = loadSound('./assets/downtown.mp3');
  bellSound = loadSound('./assets/bikebell.mp3');
  myImage = loadImage('./assets/bike.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  noStroke();
  angleMode(DEGREES);

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

}

function draw() {
  //move the center of the canvas
  translate(windowWidth / 2, windowHeight / 2);

  //set variables
  var volume = 0;
  var t = 150;
  var t2 = 80;

  // if condition for the music
  if (mouseX > width / 2) {
    background(color(col3));
    if (mySong.isPlaying() == false) {
      mySong.play();
    }
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, height);
  } else if (mouseX < width / 2) {
    background(200)
    mySong.stop();
  }

  //image
  imageMode(CENTER);
  image(myImage, 20, 0, myImage.width, myImage.height);

  //rotate the wheels
  push()
  translate(-t, t2)
  rotate(frameCount);
  wheel();
  rotate(frameCount * 2);
  wheel2();
  pop()

  push()
  translate(t, t2)
  rotate(frameCount);
  wheel();
  rotate(frameCount * 2);
  wheel2();
  pop()

  // bell
  if (bellSound.isPlaying() === true) {
    push()
    noFill()
    strokeWeight(4)
    stroke(color(col4))
    arc(200, -150, 60, 60, 270, 330)
    arc(195, -140, 55, 55, 270, 330)
    arc(190, -130, 50, 50, 270, 330)
    pop()
  }


  text
  push()
  var myTextA = 'Press ENTER to ring the bell';
  var myTextB = 'Move from left to right to start music'
  drawingContext.font = "15px Nanum Gothic Coding";
  drawingContext.textAlign = "center";
  fill(240);
  text(myTextA, 400, -100)
  text(myTextB, 0, height / 2 - 40)
  pop();

  push();
  var myText1 = '<< Life is like riding a bicycle.';
  var myText2 = ' To keep your balance you must keep moving. >>';
  drawingContext.font = "30px Poiret One";
  drawingContext.textAlign = "center";
  fill(color(col4));
  text(myText1, 0, -350)
  text(myText2, 0, -300)
  pop();
}

function wheel() {

  var volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 10, height / 2);

//set ray's start and stop angles
  var start = 0;
  var stop = 30;

// rays of the wheel
  for (var i = 0; i < 6; i++) {
    fill(color(col1));
    arc(0, 0, volume, volume, start, stop, PIE);
    start += 60;
    stop += 60;
  }
}

function wheel2() {

  var volume = 0;
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 10, height / 1.5);

//set ray's start and stop angles
  var start = 35;
  var stop = 55;

// rays of the wheel + wheel
  for (var i = 0; i < 6; i++) {
    fill(color(col2));
    arc(0, 0, volume, volume, start, stop, PIE);
    start += 60;
    stop += 60;
  }
  push()
  stroke(color(col4));
  strokeWeight(8);
  noFill()
  ellipse(0, 0, volume);
  pop()
}

//bell ring sound
function keyPressed() {
  if (keyCode === ENTER) {
    bellSound.play();

    return false;
  } else {
    bellSound.stop();
  }
}


// Music credit: bensound.com "Downtown"
