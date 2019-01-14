"using strict";

let Renderer = function(configuration) {
  let r = {};

  r.canvas = document.getElementById(configuration.defaults.ids.canvas);
  r.ctx    = r.canvas.getContext('2d');

  r.drawLine = function(start, end, color=configuration.defaults.colors.line, width=configuration.defaults.widths.line) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth   = width;
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  return r;
}
