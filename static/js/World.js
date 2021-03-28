class World {
  constructor() {
    this.objects = []
  }
  init() {
    const ranNestPos = world.getOpenRockPosition(NEST_OPEN_AREA)
    const nest = new Nest({ pos: ranNestPos })
    world.spawn(nest)


    for (let rid = 0; rid < MAX_ROCKS; rid++) {
      const r = random(10, 50)
      const ranPos = world.getOpenRockPosition(r)

      if (!ranPos) break

      const rock = new Rock({
        pos: ranPos,
        r,
        noiseScale: random(10, 30)
      })
      world.spawn(rock)
    }

    for (let aid = 0; aid < MAX_ANTS; aid++) {
      const ant = new Ant({
        id: aid,
        pos: nest.pos.copy(),
        world: this
      })
      world.spawn(ant)
    }
  }
  getByType(type) {
    return this.objects.filter(o => o instanceof type)
  }
  update() {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update()
    }
  }
  draw() {
    for (let i = 0; i < this.objects.length; i++) {
      push()
      this.objects[i].draw()
      pop()
    }
  }
  spawn(thing) {
    this.objects.push(thing)
  }

  // look through other rocks
  // is this rock intersecting anything?
  // oh there is one? go to step 0
  // oh its open? place rock
  getOpenRockPosition(r, attempts = 0) {
    if (attempts > MAX_ATTEMPTS) {
      return null
    }

    const rocks = this.getByType(Rock)
    const ranPos = vec2(random(width), random(height))
    for (const rock of rocks) {
      // pick random position
      const d = vdist(rock.pos, ranPos)
      const overlapping = d < r + rock.r + OPEN_SPOT_BUFFER
      if (overlapping) {
        return this.getOpenRockPosition(r, attempts + 1)
      }
    }

    return ranPos;
  }

  isPointWithinWorldBounds(pos, r=1) {
    const withinX = pos.x > r && pos.x < width - r
    const withinY = pos.y > r && pos.y < height - r
    
    return withinX && withinY
  }
}

function vdist(a, b) {
  return dist(a.x, a.y, b.x, b.y)
}