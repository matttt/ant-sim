class Ant {
  constructor({ pos, id, world }) {
    this.pos = pos
    this.id = id

    this.vel = p5.Vector.random2D()

    const opts = {
      ant: this,
      world,
      r: SENSOR_SIZE
    }

    this.sensorLeft = new Sensor({
      ...opts,
      dir: DIRS.LEFT
    })

    this.sensorRight = new Sensor({
      ...opts,
      dir: DIRS.RIGHT
    } ) 
  }
  update() {

    if (this.sensorLeft.detected) {
      this.vel = this.vel.rotate(PI/32);
    } else if (this.sensorRight.detected) {
      this.vel = this.vel.rotate(-PI/32);
    } else {
      const noiseVal = noise(frameCount / 100, this.id * ANT_MOVEMENT_DELTA)
      const noiseAngle = map(noiseVal, 0, 1, 0, TWO_PI)

      const nudge = p5.Vector.fromAngle(noiseAngle).mult(.01)

      this.vel.add(nudge)
      this.vel.normalize()
    }


    this.pos.add(this.vel)
    this.sensorLeft.update()
    this.sensorRight.update()
  }
  draw() {
    fill('green')
    circle(this.pos.x, this.pos.y, ANT_SIZE)
    // this.sensorLeft.draw()
    // this.sensorRight.draw()
  }
}