class Sensor {
  constructor({ ant, r, dir, world }) {
    this.ant = ant
    this.r = r
    this.dir = dir
    this.detected = false
    this.world = world
    this.pos = vec2()
  }

  getPos() {
    const offsetAmt = PI / 4  // radians
    const offset = this.dir === DIRS.LEFT ? -offsetAmt : offsetAmt
    const velOffset = this.ant.vel.copy()
                                  .mult(SENSOR_DISTANCE)
                                  .rotate(offset);
    return this.ant.pos.copy().add(velOffset)
  }

  update() {
    this.pos = this.getPos()

    const isOutsideWalls = !this.world.isPointWithinWorldBounds(this.pos, this.r)
    
    const rocks = this.world.getByType(Rock)
    let isTouchingRock = false

    for (const rock of rocks) {
      const d = vdist(rock.pos, this.pos)
      if (d < rock.r + this.r) {
        isTouchingRock = true
        break
      }
    }

    
    this.detected = isOutsideWalls || isTouchingRock


  }
  draw() {
    fill(this.detected ? 'green' : 'orange')

    circle(this.pos.x, this.pos.y, this.r)
  }
}