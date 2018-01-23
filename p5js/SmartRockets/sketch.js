// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

var population;
// Each rocket is alive till 400 frames
var lifespan = 800;
// Made to display count on screen
var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.2;

// Dimensions of barrier
var rx = 200;
var ry = 300;
var rw = 400;
var rh = 10;

function setup() {
  createCanvas(800, 600);
  population = new Population();
  lifeP = createP();
  target = createVector(width / 2, 50);

  // create sliders
  frameSlider = createSlider(0, 10, 0);
  frameSlider.position(20, 20);

}

function draw() {
  background(0);
  var ended = false;
  var frameskip = frameSlider.value();


  // run without rendering for frameskip
  for (var i = 0; i < frameskip+1; i++) {
    // run returns false if all rockets have stopped
    count++;
    if (!population.run()) {
      ended = true;
      break;
    }
  }

  // Displays count to window
  lifeP.html(count);


  if (count >= lifespan || ended) {
    population.evaluate();
    population.selection();
    // Population = new Population();
    count = 0;
  }
  // Renders barrier for rockets
  fill(255);
  rect(rx, ry, rw, rh);
  // Renders target
  ellipse(target.x, target.y, 16, 16);
}
