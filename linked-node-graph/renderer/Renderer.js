"using strict";

let Renderer = function(configuration) {
  let r = {};

  r.canvas = document.getElementById(configuration.defaults.ids.canvas);
  r.ctx    = r.canvas.getContext('2d');

  r.redrawCanvas = function() {
    let wheight = window.innerHeight;
    let wwidth  = window.innerWidth;

    let min_size = Math.min(wheight, wwidth);
    let margin   = Math.abs(wwidth - wheight) / 2;
    this.canvas.style = 'width: ' + min_size + 'px; height: ' + min_size + 'px; margin: 0 ' + margin;
    this.drawRect({x:1,y:1}, 998, 998, "pink", 3);
  }

  r.drawLine = function(start, end, color=configuration.defaults.colors.line, width=configuration.defaults.widths.line) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth   = width;
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  r.drawRect = function (origin, width, length, color=configuration.defaults.colors.line, lineWidth=configuration.defaults.widths.line) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth   = lineWidth;
    this.ctx.rect(origin.x, origin.y, width, length);
    this.ctx.stroke();
  }

  r.drawCircle = function (origin, radius, color=configuration.defaults.colors.line, lineWidth=configuration.defaults.widths.line) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth   = lineWidth;
    this.ctx.beginPath();
    this.ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  r.drawSolidCircle = function (origin, radius, color=configuration.defaults.colors.fill) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  return r;
}
