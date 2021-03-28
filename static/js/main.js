function setup() {
  world = new World()
  // createCanvas(windowWidth,windowHeight);
  createCanvas(800, 800);

  if (USE_SEEDS) {
    noiseSeed(333);
    randomSeed(224242);
  }

  world.init()
}

function draw() {
  background(BACKGROUND_COLOR)
  world.update()
  world.draw()
}

// lib

function vec2(x = 0, y = 0) {
  return createVector(x, y)
}