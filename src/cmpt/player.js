/*globals context*/

class Player {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }
  
  draw() {
    context.shadowBlur = 5;
    context.shadowColor = this.color;
    context.lineWidth = 2.5
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.stroke();
  }
}
