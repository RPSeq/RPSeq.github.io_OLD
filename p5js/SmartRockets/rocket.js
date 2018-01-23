// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// Constructor function
function Rocket(dna) {
  // Physics of rocket at current instance
  this.pos = createVector(width / 2, height);
  this.vel = createVector();
  this.acc = createVector();
  // Checkes rocket has reached target
  this.completed = false;
  // Checks if rocket had crashed
  this.crashed = false;
  // Gives a rocket dna
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;
  this.maxfitness = 0;
  this.d = 0;

  //counts cycles since rocket launch
  this.count = 0;

  // Object can recieve force and add to acceleration
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  // Calulates fitness of rocket
  this.calcFitness = function() {

    // If rocket gets to target increase fitness of rocket
    if (this.completed) {
      this.fitness *= (100+map(this.count, 0, lifespan, 0, 10));
    }
    // If rocket does not get to target decrease fitness
    if (this.crashed) {
      this.fitness /= (10+map(this.count, 0, lifespan, 0, 10));
    }

  }
  // Updates state of rocket
  this.update = function() {
    this.count++;

    // Takes distance to target
    this.d = dist(this.pos.x, this.pos.y, target.x, target.y);

    // Maps range of fitness
    this.fitness = map(this.d, 0, width, width, 0);

    // // Check if greater than maxfitness
    // if (this.fitness > this.maxfitness) {
    //   this.maxfitness = this.fitness;
    // }

    // If distance less than 10 pixels, then it has reached target
    if (this.d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }
    // Rocket hit the barrier
    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true;
    }
    // Rocket has hit left or right of window
    if (this.pos.x > width || this.pos.x < 0) {
      this.crashed = true;
    }
    // Rocket has hit top or bottom of window
    if (this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }


    //applies the random vectors defined in dna to consecutive frames of rocket
    this.applyForce(this.dna.genes[this.count]);
    // if rocket has not got to goal and not crashed then update physics engine
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  }
  // displays rocket to window
  this.show = function() {
    // push and pop allow's rotating and translation not to affect other objects
    push();
    //color customization of rockets
    noStroke();
    fill(255, 255-map(log(this.d), 5, 10, 60, 255));
    //translate to the postion of rocket
    translate(this.pos.x, this.pos.y);
    //rotatates to the angle the rocket is pointing
    rotate(this.vel.heading());
    //creates a rectangle shape for rocket
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
