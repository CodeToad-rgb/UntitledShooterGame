/*globals cc c enemies*/

// let enemies = []

class Enemy {
  constructor(x, y, r, color, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    
    context.shadowBlur = 5;
    context.shadowColor = `hsl(${this.color},100%,50%)`;
    context.lineWidth = 2.5;
    context.strokeStyle = `hsl(${this.color},100%,50%)`;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.stroke();
  }
  update() {
    this.draw();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

class EnemyOld {
  constructor(x, y, r, color, vel) {
    (this.x = x), (this.y = y), (this.r = r);

    this.color = color;

    this.vel = vel;
  }
  draw() {
    cc.beginPath();
    cc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    cc.fillStyle = `hsl(${this.color},50%,50%)`;
    cc.fill();

    cc.lineWidth = 2.5;
    cc.beginPath();
    cc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    cc.strokeStyle = `hsl(${this.color},50%,25%)`;
    cc.stroke();
    cc.lineWidth = 1;
  }
  update() {
    this.draw();
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}

function spawnE() {
  setInterval(function () {
    //     Create monster in random position

    let r = Math.random() * (30 - 10) + 10;

    let x = Math.random() > 0.5 ? 0 - r : c.width + r,
      y = Math.random() * c.height;

    let color = Math.random() * 360;

    let angle = Math.atan2(c.height / 2 - y, c.width / 2 - x);

    let vel = { x: Math.cos(angle) * 100, y: Math.sin(angle) * 15 };

    enemies.push(new Enemy(x, y, r, color, vel));
  }, 1000);
}
