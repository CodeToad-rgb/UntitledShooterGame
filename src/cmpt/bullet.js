/*globals c cc started bullets powered sound u context*/

class Bullet {
  constructor(x, y, r, color, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    context.shadowBlur = 5;
    context.shadowColor = this.color;
    context.lineWidth = 2.5;
    context.strokeStyle = this.color;
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

class BulletOld {
  constructor(x, y, r, color, vel) {
    [this.x, this.y, this.r, this.color, this.vel] = [x, y, r, color, vel];
  }
  draw() {
    cc.beginPath();
    cc.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    cc.fillStyle = this.color;
    cc.fill();
  }
  update() {
    this.draw();
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}

// Create bullets

// $(document).on("click", function (e) {
//   if (started) {
//     let angle = Math.atan2(e.clientY - c.height / 2, e.clientX - c.width / 2);
//     let vel = {
//       x: Math.cos(angle) * 7,
//       y: Math.sin(angle) * 7,
//     };

//     if (!powered.has("spread")) {
//       sound.shot.play();
//       bullets.push(new Bullet(c.width / 2, c.height / 2, 5, "red", vel));
//     } else {
//       if (powered.has("spread")) {
//         sound.spread.shot.play();
//         bullets.push(new Bullet(c.width / 2, c.height / 2, 5, "red", vel));
//         bullets.push(
//           new Bullet(c.width / 2, c.height / 2, 5, "red", {
//             x: Math.cos(angle) * 7,
//             y: Math.sin(angle) * 7.5,
//           })
//         );
//         bullets.push(
//           new Bullet(c.width / 2, c.height / 2, 5, "red", {
//             x: Math.cos(angle) * 7,
//             y: Math.sin(angle) * 7.5,
//           })
//         );
//       }
//     }
//   }
// });
