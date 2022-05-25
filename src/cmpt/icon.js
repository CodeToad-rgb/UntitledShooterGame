/*globals canvas context gsap*/

class Icon {
  constructor(src, x, y, size) {
    this.image = new Image();
    this.image.src = src;

    this.src = src;
    this.x = x;
    this.y = y;
    this.size = canvas.width / size;

    this.alpha = 0;
  }
  draw() {
    context.save();
    context.globalAlpha = this.alpha;
    context.shadowColor = "white";
    context.shadowBlur = 5;
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
    context.restore();
  }

  hide() {
    this.alpha = 0;
  }
  show() {
    this.alpha = 1;
  }
  fadeOut() {
    gsap.to(this, {
      alpha: 0,
      duration: 0.25,
    });
  }
}
