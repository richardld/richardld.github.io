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
  ut = loadImage("icons/ut.png");
  paint = loadImage("icons/paint.png");
  
  orbit1 = [[javascript, "I have 2+ years of JavaScript experience! I've used JavaScript to create many websites, including this one."], [html5, "I have 3+ years of HTML5 experience! Check out the projects tab to see some websites I have made."], [java, "I have 5+ years of Java experience! I've used Java to create many programs and publish an Android app."], [python, "I have 3+ years of Python experience! I've used it to create programs for tax analysis and more."]];
  orbit2 = [[cal, "I'm currently a student at the University of California, Berkeley!"], [computerscience, "I'm an intended computer science major in the College of Letters and Sciences at Berkeley."], [westwood, "I graduated from Westwood High School, located in Austin, TX."], [cat, "I have a cat!"], [ut, "The University of Texas at Austin is pretty cool! I like to watch their football games. They're doing pretty well this year too."], [paint, "I made these icons in Paint! Actually, I do a lot of art in Paint. Ask me to show you my art sometime."]];
  //[cal, computerscience, westwood, cat, ut, paint];
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

