class Rock {
  constructor({ pos, r, noiseScale }) {
    this.pos = pos
    this.r = r
    this.noiseScale = noiseScale
  }
  update() {

  }
  draw() {
    beginShape();
    for (let i = 0; i <= TWO_PI; i += 0.05) {
      const nx = (sin(i) * this.r) + this.pos.x;
      const ny = (cos(i) * this.r) + this.pos.y;

      const noise1 = noise(nx, ny) * (this.noiseScale / 5)
      const noise2 = noise(nx / 10, ny / 10) * this.noiseScale
      const noiseVal = noise1 + noise2

      const cx = sin(i) * (this.r + noiseVal)
      const cy = cos(i) * (this.r + noiseVal)

      vertex(cx + this.pos.x, cy + this.pos.y)
    }
    endShape();
  }
}