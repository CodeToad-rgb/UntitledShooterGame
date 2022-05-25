/*globals canvas c cc gsap */

class PowerUp {
  constructor(x, y, r, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = velocity;

    // 0 = spread
    // 1 = god
    // 2 = nuke

    this.timer = 1000;

    this.type = Math.floor(Math.random());

    this.alpha = 0;

    let anim = gsap.timeline({ repeat: -1 });

    this.color = 0;

    switch (this.type) {
      case 0:
        anim
          .to(this, {
            color: 0,
            duration: 0.25,
          })
          .to(this, {
            color: 30,
            duration: 0.5,
          })
          .to(this, {
            color: 0,
            duration: 0.25,
          });

        break;
      case 1:
        break;
      case 2:
        break;
      default:
        throw new Error("something has happend and the random is a failure");
    }
  }

  draw() {
    context.save();
    context.shadowBlur = 5;
    context.shadowColor = `hsl(${this.color},100%,50%)`;
    context.lineWidth = 2.5;
    context.strokeStyle = `hsl(${this.color},100%,50%)`;
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < this.r || this.x > canvas.height - this.r) {
      this.velociy.x = -this.velocity.x;
    }
    if (this.y < this.r || this.y > canvas.height - this.r) {
      this.velocity.y = -this.velocity.y;
    }
  }
}

class PowerUpOLD {
  constructor(x, y, r, type, vel) {
    (this.x = x), (this.y = y), (this.r = r);
    this.vel = vel;
    this.type = type;

    switch (type) {
      case 1:
        this.color = "hsl(0,100%,75%)";

        let anim = gsap.timeline({ repeat: -1 });
        anim
          .to(this, {
            color: "0",
            duration: 0.5,
          })
          .to(this, {
            color: "30",
            duration: 1,
          })
          .to(this, {
            color: "0",
            duration: 1,
          });
        break;
      case 2:
        break;
    }
  }

  draw() {
    cc.beginPath();
    cc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    cc.fillStyle = `hsl(${this.color},75%,50%`;
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

    //     COllison

    if (this.x < this.r || this.x > c.width - this.r) {
      this.vel.x = -this.vel.x;
    }
    if (this.y < this.r || this.y > c.height - this.r) {
      this.vel.y = -this.vel.y;
    }
  }
}
