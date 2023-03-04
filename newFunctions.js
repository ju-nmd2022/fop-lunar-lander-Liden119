time = 2;
background(0, 0, 0);
translate(windowWidth / 2, windowHeight / 2);

rect(-250, -100, 500, 200);

fill(0, 255, 0);
rect(-250, -100, 500, 50);
rect(-250, 100, 500, 50);

textSize(30);

text("Congratz! You landed safely!", -178, 0);
text("Time: " + time + "s", -178, 50);
