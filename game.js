// Rotation is inspired from garrits car example from:
//https://pixelkind.github.io/foundationsofprogramming/programming/12-03-example
// , with some changes
//Line ... - ...

//Star generator for the background is copied from..
//Line ... - ...

//Colors
let black = [0, 0, 0];
let white = [255, 255, 255];
let blueStart = [50, 50, 180];
let whiteR2D2 = [245, 245, 255];
let colorR2D2 = [40, 50, 135];
let lightGrayR2D2 = [200, 200, 220];
let grayTF = [112, 111, 120];
let landingBox = [56, 59, 59];
let lavaOrange = [207, 83, 37];
let lavaRed = [192, 55, 37];
let lavaYellow = [195, 127, 30];
let greenWin = [56, 78, 41];
let redLoose = [106, 0, 0];

//variables
let gameState = 1;
let scaleR2D2 = 0.1;
let scaleTF = 1;
let xR2D2 = windowWidth / 2;
let yR2D2 = 50;
let xTF = 400;
let yTF = 300;
let yVelocity = 0;
let xVelocity = 0;
let rotationR2D2start = 0;
let rotationR2D2 = 0;
let rotationTF = 0;
let gravity = 0;
let speed = 0.05;
let counter = 0;
let time = 1;
let bestTime = -1;
let reason;

let xLanding;
let landingY = (windowHeight / 5) * 4.25;
let maxWidth = windowWidth - 125;
let minWidth = 50;
let menuHeight = 360;

//R2D2 Crash "animation"
let crashR2D2 = [];
function createCrashR2D2(x, y) {
  const v = 0.2 + Math.random();
  const a = Math.PI + Math.random() * Math.PI;
  const maxLife = 100 + Math.floor(Math.random() * 100);
  return { x: x, y: y, velocity: v, angle: a, life: 0, maxLife: maxLife };
}
function drawCrashR2D2(particleR2D2) {
  push();
  translate(particleR2D2.x, particleR2D2.y);
  noStroke();
  fill(0, 0, 150);
  ellipse(0, 0, 2);
  fill(255, 255, 255);
  ellipse(0, 0, 1);
  pop();
}
function updateCrashR2D2(particleR2D2) {
  particleR2D2.x =
    particleR2D2.x + Math.cos(particleR2D2.angle) * particleR2D2.velocity;
  particleR2D2.y =
    particleR2D2.y + Math.sin(particleR2D2.angle) * particleR2D2.velocity;
  particleR2D2.velocity = particleR2D2.velocity * 0.99;
  particleR2D2.life = particleR2D2.life + 1;

  if (particleR2D2.life > particleR2D2.maxLife) {
    const particleIndex = crashR2D2.indexOf(particleR2D2);
    crashR2D2.splice(particleIndex, 1);
  }
}

//Star generator
let stars = [];
function createStar() {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return { x: x, y: y };
}
function drawStar(star) {
  push();
  translate(star.x, star.y);
  noStroke();
  fill(255, 255, 255, 140);
  ellipse(0, 0, 1);
  pop();
}
for (let i = 0; i < 500; i++) {
  const star = createStar();
  stars.push(star);
}

//R2-D2 "drawing"
function r2d2(xR2D2, yR2D2, scaleR2D2, rotationR2D2) {
  push();
  strokeWeight(1 * scaleR2D2);
  stroke(1 * scaleR2D2);
  translate(xR2D2, yR2D2);
  scale(scaleR2D2);
  rotate(rotationR2D2);

  // Head structure
  function r2Head() {
    push();
    fill(lightGrayR2D2);
    ellipse(0, -50, 200);
    fill(lightGrayR2D2);
    rect(-100, -50, 200, 10);
    pop();

    //eye
    fill(colorR2D2);
    beginShape();
    vertex(20, -120);
    vertex(-15, -121);
    vertex(-25, -85);
    bezierVertex(-25, -82, 25, -82, 26, -85);
    endShape();
    fill(black);
    ellipse(0, -104, 20);
    fill(whiteR2D2);
    ellipse(-1, -104, 3);

    //blue details
    fill(colorR2D2);
    rect(-15, -78, 40, 20);
    rect(-29, -78, 10, 20);
    rect(-50, -85, 17, 27);
    rect(-90, -85, 35, 27);
    rect(-100, -55, 200, 6);
    fill(220, 0, 0);
    ellipse(5, -68, 18);
    fill(lightGrayR2D2);
    ellipse(42, -70, 22);
    fill(black);
    ellipse(44, -72, 10);
    fill(colorR2D2);
    rect(60, -85, 12, 27);
    rect(75, -85, 12, 27);

    beginShape();
    vertex(-57, -130);
    vertex(-20, -130);
    vertex(-17, -145);
    vertex(-28, -145);
    bezierVertex(-34, -145, -57, -135, -57, -130);
    endShape();
    beginShape();
    vertex(18, -130);
    vertex(-11, -130);
    vertex(-8, -145);
    vertex(15, -145);
    vertex(18, -130);
    endShape();
    beginShape();
    vertex(57, -130);
    vertex(25, -130);
    vertex(23, -145);
    vertex(30, -145);
    bezierVertex(34, -145, 57, -135, 57, -130);
    endShape();
  }

  function r2Body() {
    push();
    fill(whiteR2D2);
    rect(-100, -40, 200, 230);
    beginShape();
    vertex(-100, 190);
    vertex(-80, 210);
    vertex(80, 210);
    vertex(100, 190);
    endShape();
    pop();

    //function for a blue detail
    function blueDetail(detailX, detailY, rotateDetail) {
      push();
      fill(colorR2D2);
      beginShape();
      vertex(detailX, detailY);
      vertex(detailX, detailY + 12);
      vertex(detailX + 15, detailY + 13);
      vertex(detailX + 20, detailY + 11);
      vertex(detailX + 40, detailY + 8);
      vertex(detailX + 40, detailY + 13);
      vertex(detailX + 110, detailY + 13);
      vertex(detailX + 110, detailY - 1);
      vertex(detailX + 40, detailY - 1);
      vertex(detailX + 40, detailY + 4);
      vertex(detailX + 20, detailY + 1);
      vertex(detailX + 15, detailY - 1);
      vertex(detailX, detailY);
      rotate(rotateDetail);
      endShape();
      pop();
    }
    push();
    fill(colorR2D2);
    blueDetail(-55, -22, 0);
    blueDetail(-55, -14, PI);

    //details
    fill(colorR2D2);
    rect(-55, -40, 110, 7);
    rect(-20, 45, 40, 75);
    rect(-15, 145, 30, 30);
    fill(lightGrayR2D2);
    ellipse(0, 65, 30, 31);
    ellipse(0, 100, 30, 31);

    noFill();
    strokeWeight(0.2);
    rect(-85, -20, 20, 140, 3);
    rect(-90, 130, 30, 45, 1);
    rect(-53, 150, 30, 25, 5);
    rect(65, -20, 20, 140, 3);
    ellipse(75, 155, 35);
    rect(40, 145, 10, 30);
    rect(27, 145, 10, 30);
    rect(-55, 45, 30, 30);
    rect(-40, 80, 15, 40);
    rect(-55, 80, 10, 3);
    rect(-55, 87, 10, 3);
    rect(-55, 94, 10, 3);
    rect(-55, 101, 10, 3);
    rect(-55, 108, 10, 3);
    rect(-55, 115, 10, 3);
    rect(27, 45, 30, 75, 1);
    rect(-55, 25, 113, 10);

    pop();
  }

  // Make the legs turn by have a negative or positive number for "turn"
  function r2Legs(turn) {
    push();

    if (turn < 0) {
      fill(whiteR2D2);
      rect(100, -40, 40, 100, 6);
      rect(105, 60, 30, 110);
      fill(colorR2D2);
      rect(124, 60, 12, 110);

      turn = -1;
    } else if (turn >= 1) {
      fill(whiteR2D2);
      rect(-140, -40, 40, 100, 6);
      rect(-135, 60, 30, 110);
      fill(colorR2D2);
      rect(-136, 60, 12, 110);
      turn = 1;
    }

    fill(whiteR2D2);
    beginShape();
    vertex(-140 * turn, 170);
    bezierVertex(-145 * turn, 190, -130 * turn, 190, -135 * turn, 210);
    vertex(-160 * turn, 260);
    vertex(-160 * turn, 270);
    vertex(-90 * turn, 270);
    vertex(-90 * turn, 260);
    vertex(-100 * turn, 190);
    vertex(-100 * turn, 170);
    endShape();
    pop();
  }

  function r2Rocket(turn) {
    push();

    // Turn variable to move the rockets to the other side
    if (turn < 0) {
      turn = -1;
    } else if (turn >= 1) {
      turn = 1;
    }

    //The rockets
    fill(lightGrayR2D2);

    beginShape();
    vertex(140 * turn, 0);
    vertex(160 * turn, 5);
    vertex(160 * turn, 15);
    vertex(140 * turn, 10);
    endShape();

    beginShape();
    vertex(140 * turn, 50);
    vertex(160 * turn, 45);
    vertex(160 * turn, 35);
    vertex(140 * turn, 40);
    endShape();

    beginShape();
    vertex(145 * turn, -10);
    vertex(145 * turn, 50);
    bezierVertex(145 * turn, 40, 145 * turn, 55, 150 * turn, 55);
    vertex(145 * turn, 70);
    vertex(165 * turn, 70);
    vertex(160 * turn, 55);
    bezierVertex(165 * turn, 55, 165 * turn, 40, 165 * turn, 50);
    vertex(165 * turn, -10);
    endShape();

    beginShape();
    vertex(140 * turn, 20);
    vertex(160 * turn, 20);
    vertex(160 * turn, 30);
    vertex(140 * turn, 30);
    endShape();

    ellipse(150 * turn, 25, 5);

    pop();
  }

  r2Head();
  r2Body();
  r2Rocket(1);
  r2Rocket(-1);

  //right leg (-1)
  r2Legs(-1);
  //left leg (1)
  r2Legs(1);

  pop();
}

//tie fighter "drawing"
function tieFighter(xTF, yTF, scaleTF, rotationTF) {
  push();
  translate(xTF, yTF);
  stroke(1 * scaleTF);
  scale(scaleTF);
  rotate(rotationTF);

  function wingTF(wingTFx, wingTFy) {
    push();
    fill(black);
    beginShape();
    vertex(-10, -48);
    vertex(9, -45);
    vertex(11.5, -4);
    vertex(7.5, 38);
    vertex(-9.5, 51);
    vertex(-17, 5.5);
    vertex(-10, -48);
    endShape();

    stroke(grayTF);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(-10, -48);
    vertex(9, -45);
    vertex(11.5, -4);
    vertex(7.5, 38);
    vertex(-9.5, 51);
    vertex(-17, 5.5);
    vertex(-10, -48);
    endShape();

    fill(grayTF);
    scale(0.3);
    beginShape();
    endShape();
    pop();
  }

  wingTF();
}

//Generates the random x position for the landing spot
function landingGenerator() {
  let randomNumber = Math.floor(Math.random() * windowWidth);
  if (randomNumber > maxWidth) {
    randomNumber = randomNumber - 125;
  } else if (randomNumber < minWidth) {
    randomNumber = randomNumber + 50;
  }
  xLanding = randomNumber;
}

//Generates the random x position for the landing spot
// and the lava on the sides
function landing(xLanding) {
  push();
  fill(lavaRed);
  noStroke();
  rect(0, (windowHeight / 5) * 4.25, windowWidth, windowHeight);
  fill(lavaOrange);
  rect(0, (windowHeight / 5) * 4.25, windowWidth, 50);
  fill(lavaYellow);
  rect(0, (windowHeight / 5) * 4.25, windowWidth, 20);
  pop();
  push();
  noStroke();
  fill(landingBox);

  quad(
    xLanding,
    (windowHeight / 5) * 4.24,
    xLanding + 100,
    (windowHeight / 5) * 4.24,
    xLanding + 70,
    (windowHeight / 5) * 4.6,
    xLanding + 30,
    (windowHeight / 5) * 4.6
  );

  pop();
}

//start screen
function startScreen() {
  push();

  textFont("Inconsolata");
  fill(blueStart);
  rect(100, 50, windowWidth - 200, windowHeight - 100);
  fill(white);
  textSize(80);
  text("R2-Lander", windowWidth / 2 - 180, 150);

  strokeWeight(5);
  line(100, 190, windowWidth - 100, 190);

  strokeWeight(2);
  fill(200, 200, 200);
  ellipse(windowWidth / 2 - 150, menuHeight, 120);
  ellipse(windowWidth / 2, menuHeight, 120);
  ellipse(windowWidth / 2 + 150, menuHeight, 120);

  fill(white);
  rect(windowWidth / 2 - 168, menuHeight + 80, 36, 36);
  rect(windowWidth / 2 - 18, menuHeight + 80, 36, 36);
  rect(windowWidth / 2 + 132, menuHeight + 80, 36, 36);

  fill(black);
  textSize(25);
  text("H", windowWidth / 2 - 160, menuHeight + 105);
  text("E", windowWidth / 2 - 8, menuHeight + 105);
  text("S", windowWidth / 2 + 143.5, menuHeight + 105);

  textSize(80);
  fill(white);
  text("?", windowWidth / 2 - 168, menuHeight + 26);
  r2d2(windowWidth / 2, menuHeight - 9, 0.15, 0);
  push();
  translate(windowWidth / 2 + 150, menuHeight);
  strokeWeight(0);
  triangle(-15, -25, -15, 25, 25, 0);
  pop();

  textSize(15);
  fill(white);
  text(
    "(OBS: If you change screen-width or height, restart the game as well!)",
    windowWidth / 2 - 218,
    70
  );

  pop();
}

//start screen custom R2 colors
function startScreenE() {
  push();

  textFont("Inconsolata");
  fill(blueStart);
  rect(100, 50, windowWidth - 200, windowHeight - 100);
  fill(white);
  textSize(80);
  text("R2-Lander", windowWidth / 2 - 180, 150);

  strokeWeight(5);
  line(100, 190, windowWidth - 100, 190);

  r2d2(windowWidth / 2, menuHeight + 30, 0.4, 0);

  fill(white);
  textSize(30);
  strokeWeight(1.5);
  rect(windowWidth / 2 - 200, menuHeight - 130, 36, 36);
  rect(windowWidth / 2 - 150, menuHeight - 130, 36, 36);
  rect(windowWidth / 2 - 100, menuHeight - 130, 36, 36);
  rect(windowWidth / 2 - 50, menuHeight - 130, 36, 36);
  rect(windowWidth / 2 + 130, menuHeight - 130, 100, 36);

  fill(black);
  text("R", windowWidth / 2 - 194, menuHeight - 103);
  text("G", windowWidth / 2 - 144, menuHeight - 103);
  text("B", windowWidth / 2 - 94, menuHeight - 103);
  text("Y", windowWidth / 2 - 44, menuHeight - 103);

  //backspace key
  triangle(
    windowWidth / 2 + 140,
    menuHeight - 112,
    windowWidth / 2 + 155,
    menuHeight - 121,
    windowWidth / 2 + 155,
    menuHeight - 103
  );
  line(
    windowWidth / 2 + 140,
    menuHeight - 112,
    windowWidth / 2 + 220,
    menuHeight - 112
  );

  fill(white);
  textSize(14);
  text("BACK", windowWidth / 2 + 164, menuHeight - 75);

  textSize(15);
  fill(white);
  text(
    "(OBS: If you change screen-width or height, restart the game as well!)",
    windowWidth / 2 - 218,
    70
  );

  pop();
}

//start screen How to play
function startScreenH() {
  push();

  textFont("Inconsolata");
  fill(blueStart);
  rect(100, 50, windowWidth - 200, windowHeight - 100);
  fill(white);
  textSize(80);
  text("R2-Lander", windowWidth / 2 - 180, 150);

  strokeWeight(5);
  line(100, 190, windowWidth - 100, 190);

  textSize(30);

  //Rotate mechanics:
  text("Rotate:", windowWidth / 2 - 136, menuHeight - 100);
  strokeWeight(1.5);
  fill(white);
  rect(windowWidth / 2 + 2, menuHeight - 126, 36, 36);
  rect(windowWidth / 2 + 83, menuHeight - 126, 36, 36);
  fill(black);
  text("A", windowWidth / 2 + 9, menuHeight - 98);
  text("D", windowWidth / 2 + 90, menuHeight - 98);

  //fly mechanics:
  fill(white);
  text("Fly up:", windowWidth / 2 - 136, menuHeight - 50);
  strokeWeight(1.5);
  fill(white);
  rect(windowWidth / 2 + 2, menuHeight - 76, 117, 36);
  fill(black);
  text("Space", windowWidth / 2 + 24, menuHeight - 48);

  //instructions

  fill(white);
  textSize(20);
  text(
    "Land within the gray area without crashing",
    windowWidth / 2 - 167,
    menuHeight + 40
  );
  noFill();
  rect(windowWidth / 2 - 200, menuHeight, 410, 70);

  //backspace key
  fill(white);
  rect(windowWidth / 2 - 48, menuHeight + 123, 96, 34);
  textSize(16);
  text("BACK", windowWidth / 2 - 20, menuHeight + 178);
  fill(black);
  triangle(
    windowWidth / 2 - 40,
    menuHeight + 140,
    windowWidth / 2 - 25,
    menuHeight + 149,
    windowWidth / 2 - 25,
    menuHeight + 131
  );
  line(
    windowWidth / 2 - 40,
    menuHeight + 140,
    windowWidth / 2 + 40,
    menuHeight + 140
  );

  textSize(15);
  fill(white);
  text(
    "(OBS: If you change screen-width or height, restart the game as well!)",
    windowWidth / 2 - 218,
    70
  );

  pop();
}

//Press enter to start
function pressStart(xPress, yPress) {
  push();
  translate(xPress, yPress);
  fill(white);
  rect(-100, -18, 200, 36);
  fill(black);
  textSize(20);
  text("SPACE", -32, 7);

  fill(white);
  textSize(30);
  text("Press", -36, -50);
  text("To Start!", -53, 75);

  pop();
}

//loosing screen
function looseSceen() {
  push();
  fill(redLoose);
  rect(0, windowHeight / 4, windowWidth, windowHeight / 4);
  fill(white);
  textSize(40);
  text("You Lost!", windowWidth / 6, windowHeight / 3);
  textSize(26);
  text(reason, windowWidth / 6, windowHeight / 2.4);

  fill(white);
  rect(windowWidth / 2 + 160, windowHeight / 2.4 - 25, 36, 36);
  fill(black);
  textSize(20);
  text("M", windowWidth / 2 + 169, windowHeight / 2.4);

  fill(white);
  textSize(26);
  text("Menu:", windowWidth / 2 + 70, windowHeight / 2.4);

  pop();
}

//win screen
function winScreen() {
  push();
  fill(greenWin);
  rect(0, windowHeight / 4, windowWidth, windowHeight / 4);
  fill(white);
  textSize(40);
  text("Good landing!", windowWidth / 6, windowHeight / 3);

  //Time result
  textSize(26);
  text("Time: " + time + "s", windowWidth / 6, windowHeight / 2.4);

  fill(white);
  rect(windowWidth / 2 + 160, windowHeight / 2.4 - 25, 36, 36);
  fill(black);
  textSize(20);
  text("M", windowWidth / 2 + 169, windowHeight / 2.4);

  fill(white);
  textSize(26);
  text("Menu:", windowWidth / 2 + 70, windowHeight / 2.4);

  pop();
}

//draw function
function draw() {
  // the black space with stars background
  background(black);
  for (let star of stars) {
    drawStar(star);
  }

  //At this gameState you are at the starter screen
  if (gameState === 1) {
    startScreen();
    //resets all values
    counter = 0;
    floorColor = [55, 55, 55];
    xR2D2 = windowWidth / 2;
    yR2D2 = 50;
    xTF = 400;
    yTF = 300;
    yVelocity = 0;
    xVelocity = 0;
    rotationR2D2 = 0;
    rotationTF = 0;
    gravity = 0;
    speed = 0.05;
    landingGenerator();

    crashR2D2 = [];

    //To change state / screen of the game
    if (keyIsDown(83)) {
      gameState = 1.3;
    } else if (keyIsDown(72)) {
      gameState = 1.1;
    } else if (keyIsDown(69)) {
      gameState = 1.2;
    }
  }

  //startscreen when you "open instructions"
  else if (gameState === 1.1) {
    startScreenH();

    if (keyIsDown(8)) {
      gameState = 1;
    }
  }

  //Start screen when you custom R2
  else if (gameState === 1.2) {
    startScreenE();

    if (keyIsDown(82)) {
      colorR2D2 = [135, 50, 50];
    } else if (keyIsDown(71)) {
      colorR2D2 = [50, 135, 50];
    } else if (keyIsDown(66)) {
      colorR2D2 = [40, 50, 135];
    } else if (keyIsDown(89)) {
      colorR2D2 = [205, 175, 0];
    } else if (keyIsDown(8)) {
      gameState = 1;
    }
  }

  //Opens game screen and start when you press space
  else if (gameState === 1.3) {
    landing(xLanding);
    r2d2(xR2D2, yR2D2, scaleR2D2, rotationR2D2);
    pressStart(windowWidth / 2, windowHeight / 2);

    //Starts the game when you press space
    if (keyIsDown(32)) {
      gameState = 2;
    }
  }

  //At this game state the game is running
  else if (gameState === 2) {
    landing(xLanding);
    r2d2(xR2D2, yR2D2, scaleR2D2, rotationR2D2);

    //timer, 30 tics on counter = 1s
    // Counter = 30 --> time = 1. Time = s
    counter = counter + 1;
    time = round(counter / 30);
    push();
    fill(white);
    textSize(50);
    text(time + "s", 50, 75);
    pop();

    //rotation
    if (keyIsDown(65) && rotationR2D2 > -1) {
      rotationR2D2 = rotationR2D2 - speed / 2;
    } else if (keyIsDown(68) && rotationR2D2 < 1) {
      rotationR2D2 = rotationR2D2 + speed / 2;
    }

    //Velocity and gravity
    if (keyIsDown(32) && yR2D2 < landingY) {
      if (rotationR2D2 > 0) {
        yVelocity = yVelocity - speed * -Math.sin(rotationR2D2);
      } else {
        yVelocity = yVelocity - speed * Math.sin(rotationR2D2);
      }

      if (rotationR2D2 > -1.1 && rotationR2D2 < 0) {
        xVelocity = xVelocity + 0.05 * Math.sin(rotationR2D2);
      } else if (rotationR2D2 < 1.1 && rotationR2D2 > 0) {
        xVelocity = xVelocity + 0.05 * Math.sin(rotationR2D2);
      } else {
        xVelocity = xVelocity * 0.98;
      }

      gravity = gravity - speed;
      yR2D2 = yR2D2 + yVelocity + gravity;
      xR2D2 = xR2D2 + xVelocity;
    } else if (yR2D2 < landingY) {
      if (xVelocity < 0) {
        xVelocity = xVelocity + 0.05;
      } else if (xVelocity > 0) {
        xVelocity = xVelocity - 0.05;
      }

      if (yVelocity < 0) {
        yVelocity = yVelocity + speed;
      }
      gravity = gravity + speed / 1.2;
      yR2D2 = yR2D2 + yVelocity + gravity;
      xR2D2 = xR2D2 + xVelocity;
    }

    //Good landing (Win)
    if (
      yR2D2 > landingY - 30 &&
      yVelocity + gravity < 0.7 &&
      xLanding < xR2D2 &&
      xLanding + 100 > xR2D2 &&
      rotationR2D2 < 0.2
    ) {
      gameState = 3;
    }
    //lava landing
    else if (
      (xLanding > xR2D2 && yR2D2 > landingY - 30) ||
      (xLanding + 100 < xR2D2 && yR2D2 > landingY - 30)
    ) {
      gameState = 3.1;
      reason = "Avoid the Lava";

      //Crash "animation"
      for (let i = 0; i < 100; i++) {
        let particleR2D2 = createCrashR2D2(xR2D2, yR2D2 + 25);
        crashR2D2.push(particleR2D2);
      }
    }
    //too much speed
    else if (yR2D2 > landingY - 30 && yVelocity + gravity > 0.7) {
      gameState = 3.1;
      reason = "Too much speed";

      //Crash "animation"
      for (let i = 0; i < 100; i++) {
        let particleR2D2 = createCrashR2D2(xR2D2, yR2D2 + 25);
        crashR2D2.push(particleR2D2);
      }
    }
    //too much rotation
    else if (yR2D2 > landingY - 30 && rotationR2D2 >= 0.2) {
      gameState = 3.1;
      reason = "Too much rotation";

      //Crash "animation"
      for (let i = 0; i < 100; i++) {
        let particleR2D2 = createCrashR2D2(xR2D2, yR2D2 + 25);
        crashR2D2.push(particleR2D2);
      }
    }
    //outside screen
    else if (yR2D2 < -25 || xR2D2 < -15 || xR2D2 > windowWidth + 10) {
      gameState = 3.1;
      reason = "Outside Game-Area";
    }
  }

  // win screen
  else if (gameState === 3) {
    landing(xLanding);
    rotationR2D2 = 0;
    r2d2(xR2D2, yR2D2, scaleR2D2, rotationR2D2);
    winScreen();

    //return to main screen
    if (keyIsDown(77)) {
      gameState = 1;
    }
  }

  //loose screen
  else if (gameState === 3.1) {
    landing(xLanding);
    looseSceen();
    //crash R2D2 "Animation"
    for (let particleR2D2 of crashR2D2) {
      drawCrashR2D2(particleR2D2);
      updateCrashR2D2(particleR2D2);
    }

    //return to main screen
    if (keyIsDown(77)) {
      gameState = 1;
    }
  }
}
