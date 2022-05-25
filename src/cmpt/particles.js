/*globals cc particles*/

class Particle {
  constructor(x, y, r, color, velocity) {
    this.x = x;
    this.y = y;

    this.r = r;
    this.velocity = velocity;

    this.color = color;
    this.alpha = 1;
    
    
  }
  draw() {
    context.save();
    context.shadowBlur = 5;
    context.shadowColor = this.color;

    context.fillStyle = this.color;
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
  update() {
    this.draw();
    this.x += this.velocity.x * 1.5;
    this.y += this.velocity.y * 1.5;
    this.velocity.x *= 0.99;
    this.velocity.y *= 0.99;
    this.alpha -= 0.01;
  }
}



function spawnParticles(x, y, color, max, array) {
  for (let i = 0; i < max; i++) {
    array.push(
      new Particle(x, y, Math.random()*3, `${color}`, {
        x: (Math.random() - 0.5) * (Math.random() * 10),
        y: (Math.random() - 0.5) * (Math.random() * 10),
      })
    );
  }
}

function boom(x, y, color, max) {
  for (let i = 0; i < max; i++) {
    particles.push(
      new Particle(x, y, Math.random() * 2, `${color}`, {
        x: (Math.random() - 0.5) * (Math.random() * 10),
        y: (Math.random() - 0.5) * (Math.random() * 10),
      })
    );
  }
}
