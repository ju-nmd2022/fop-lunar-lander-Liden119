//Colors
let black = [0, 0, 0];
let whiteR2D2 = [245, 245, 255];
let blueR2D2 = [40, 50, 135];
let lightGrayR2D2 = [200, 200, 220];

function r2d2(xR2D2, yR2D2, scaleR2D2, rotationR2D2) {
  push();
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
    fill(blueR2D2);
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
    fill(blueR2D2);
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
    fill(blueR2D2);
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
      fill(blueR2D2);
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
    fill(blueR2D2);
    blueDetail(-55, -22, 0);
    blueDetail(-55, -14, PI);

    //details
    fill(blueR2D2);
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
      fill(blueR2D2);
      rect(124, 60, 12, 110);

      turn = -1;
    } else if (turn >= 1) {
      fill(whiteR2D2);
      rect(-140, -40, 40, 100, 6);
      rect(-135, 60, 30, 110);
      fill(blueR2D2);
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

xR2D2 = 400;
yR2D2 = 200;
velocity = 0;
rotation = 0;
function draw() {
  background(black);
  r2d2(xR2D2, yR2D2, 0.2, rotation);

  for (let i = 0; i < 1; i++) {
    // x = x + Math.cos(rotation) * speed;
    // y = y + Math.sin(rotation) * speed;

    // yR2D2 = yR2D2 + Math.sin(rotation) + velocity;
    //   xR2D2 = xR2D2 + Math.cos(rotation);

    if (keyIsDown(32) && yR2D2 < 600) {
      velocity = velocity - 0.15;
      yR2D2 = yR2D2 + velocity;
    } else if (yR2D2 < 600) {
      velocity = velocity + 0.1;
      yR2D2 = yR2D2 + velocity;
    }

    //Rotation is taken from garrits car example
    if (keyIsDown(65) && rotation > -0.8) {
      rotation = rotation - 0.05;
    } else if (keyIsDown(68) && rotation < 0.8) {
      rotation = rotation + 0.05;
    }
  }
}
