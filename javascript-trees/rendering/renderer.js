"using strict";

class Renderer {
  constructor (ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  wipeScreen () {
    this.ctx.strokeStyle = "#000";
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
  }

  drawLine (instruction) {
    this.ctx.strokeStyle = "#fff";
    this.ctx.shadowBlur = 1;
    this.ctx.shadowColor = "#000";
    this.ctx.shadowOffsetX = 1 * Math.cos(instruction.angle.radians);
    this.ctx.shadowOffsetY = 1 * Math.sin(instruction.angle.radians);
    this.ctx.lineWidth = instruction.width;
    this.ctx.beginPath();
    this.ctx.moveTo(instruction.start.x, instruction.start.y);
    this.ctx.lineTo(instruction.end.x, instruction.end.y);
    this.ctx.stroke();
  }
}
