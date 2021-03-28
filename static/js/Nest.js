class Nest {
  constructor({ pos }) {
    this.pos = pos
  }
  update() {

  }
  draw() {
    fill('red')
    circle(this.pos.x, this.pos.y, NEST_SIZE)
    noFill()
  }
}