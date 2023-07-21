var swayTrack = [];
var orbiterList = [];

function preload() {
  python = loadImage("icons/python.png");
  java = loadImage("icons/java.png");
  html5 = loadImage("icons/html5.png");
  javascript = loadImage("icons/javascript.png");
  
  cal = loadImage("icons/cal.png");
  westwood = loadImage("icons/westwood.png");
  computerscience = loadImage("icons/computerscience.png");
  cat = loadImage("icons/cat.png");
  linkedin = loadImage("icons/linkedin.png");
  github = loadImage("icons/github.png");
  
  orbit1 = [[javascript, "I use a lot of JavaScript. Often with React/Next.js."], [html5, "I've made a few dozen websites, like a birthday card maker."], [java, "Me and Java are good friends."], [python, "Python is my favorite. When I write code I sometimes use python."]];
  orbit2 = [[cal, "I graduated from University of California, Berkeley. Go bears!"], [computerscience, "I'm a Computer Science and Data Science major."], [westwood, "I graduated from Westwood High School, located in Austin, TX."], [cat, "I have a cat!"], [linkedin, "My LinkedIn can be found at linkedin.com/in/richardld."], [github, "My GitHub can be found at github.com/richardld."]];
}

function setup() {
  createCanvas(windowWidth - 20, windowHeight * .75);
  smooth();
  imageMode(CENTER);
  angleMode(DEGREES);
  frameRate(60);
  textFont('Helvetica');
  textSize(16);
  textAlign(LEFT, TOP);
  
  centerOfHead = [width/2, height - 150];
  headDiameter = 50;
  backgroundColor = 255;
  
  shouldPauseSway = false;
  shouldDrawInfoBox = false;
  
  // [x, y, text]
  infoBoxInfo = [];
  
}

function draw() {
  background(backgroundColor);
  
  dx = mouseX - width/2;
  dy = mouseY - height - 105;
  angle1 = atan2(dy, dx);
  
  
  orbit(1, orbit1)
  orbit(2, orbit2);
  
  if(mouseX > width/2) {
    // Left Arm
    line(width/2, height - 105, mouseX, mouseY);
    line(width/2, height - 105, width/2 - 15, height - 95);
  } else {
    // Right Arm
    line(width/2, height - 105, mouseX, mouseY);
    line(width/2, height - 105, width/2 + 15, height - 95);
  }
    
  // Backbone
  line(width/2, height - 150, width/2, height - 60);
  // Left Leg
  line(width/2, height - 60, width/2 + 20, height - 45);
  // Right Leg
  line(width/2, height - 60, width/2 - 20, height - 45);
  // Head
  circle(width/2, height - 150, headDiameter);
  
  if(shouldDrawInfoBox) {
    rect(centerOfHead[0] - 225, centerOfHead[1] - 165, 200, 125);
    text(infoBoxInfo[2], centerOfHead[0] - 225 + 10, centerOfHead[1] - 165 + 10, 190, 115);
  }

}

function placeOnRadius(degrees, radius) {
  return [centerOfHead[0] + cos(degrees) * radius, centerOfHead[1] - sin(degrees) * radius];
}

function initializeOrbitCheck(orbitCount) {
  if(swayTrack.length < orbitCount) {
    orbiterList.push([]);
    if(orbitCount % 2 == 0) {
      swayTrack.push(["Right", -35]);
    } else {
      swayTrack.push(["Left", 35]);
    }
  }
}

function addSwayIntoOrbits(orbitCount) {
  if(swayTrack[orbitCount - 1][1] <= 20 && swayTrack[orbitCount - 1][1] >= -20) {
    if(swayTrack[orbitCount - 1][0] == "Right") {
      swayTrack[orbitCount - 1][1] = swayTrack[orbitCount - 1][1] + 1/17; 
    } else {
      swayTrack[orbitCount - 1][1] = swayTrack[orbitCount - 1][1] - 1/17; 
    }
  } else {
    if(swayTrack[orbitCount - 1][0] == "Right") {
      swayTrack[orbitCount - 1][0] = "Left";
      swayTrack[orbitCount - 1][1] = 20;
    } else {
      swayTrack[orbitCount - 1][0] = "Right";
      swayTrack[orbitCount - 1][1] = -20;
    }
  }
}

function orbit(orbitCount, images) {
  initializeOrbitCheck(orbitCount);
  if(!shouldPauseSway) {
    addSwayIntoOrbits(orbitCount);
  }
  
  orbiterList[orbitCount - 1] = [];
  for(var i = 0; i < images.length; i++) {
    var loc = placeOnRadius((180 * i)/(images.length - 1) + swayTrack[orbitCount - 1][1], 50 + 150 * orbitCount);
    loc.push(images[i][1]);
    orbiterList[orbitCount - 1].push(loc);
    image(images[i][0], loc[0], loc[1]);
  }
}

function mousePressed() {
  mousePressedObject = false;
  for(var i = 0; i < orbiterList.length; i++) {
    for(var j = 0; j < orbiterList[i].length; j++) {
      if(mouseOverObject(orbiterList[i][j][0], orbiterList[i][j][1])) {
        mousePressedObject = true;
        shouldDrawInfoBox = true;
        infoBoxInfo = orbiterList[i][j];
      }
    }
  }
  if(!mousePressedObject) {
    shouldDrawInfoBox = false;
  }
}

function mouseOverObject(x, y) {
  var distance = dist(mouseX, mouseY, x, y); 
  if(distance < 25) {
    return true;
  } else {
    return false;
  }
}

