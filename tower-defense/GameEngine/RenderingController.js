"using strict";

class RenderingController {
  constructor (configuration = {}) {
    this._canvas_id    = configuration.canvas_id    != undefined ? configuration.canvas_id    : 'canvas';
    this._rows         = configuration.rows         != undefined ? configuration.rows         : 55;
    this._columns      = configuration.columns      != undefined ? configuration.columns      : 55;
    this._grid_padding = configuration.grid_padding != undefined ? configuration.grid_padding : 10;

    if (configuration.cell_width != undefined) {
      let padding   = this._grid_padding;
      this._rows    = Math.floor((window.innerHeight - padding) / configuration.cell_width);
      this._columns = Math.floor((window.innerWidth  - padding) / configuration.cell_width);
    }

    this._$canvas = document.getElementById(this._canvas_id);
    this._ctx = this._$canvas.getContext('2d');

    this._resizeCanvas();

    this._cell_width = configuration.cell_width != undefined ? configuration.cell_width : 10; //this._generateCellWidth();
    //this._testDraw();
  }

  drawGrid (grid_controller) {
    console.log(grid_controller)
    let total_width  = this._cell_width * this._columns;
    let total_height = this._cell_width * this._rows;
    // this._drawRect({x: this._grid_padding, y: this._grid_padding}, total_width - 2 * this._grid_padding, total_height - 2 * this._grid_padding);

    for (let i = 0; i <= this._rows; i++) {
      this._drawLine(
        {x: this._grid_padding, y: this._grid_padding + this._cell_width * i},
        {x: total_width + this._grid_padding, y: this._grid_padding + this._cell_width * i}
      );
    }
    for (let i = 0; i <= this._columns ; i++) {
      this._drawLine(
        {x: this._grid_padding + this._cell_width * i, y: this._grid_padding},
        {x: this._grid_padding + this._cell_width * i, y: total_height + this._grid_padding}
      );
    }

    this.drawWaypoints(grid_controller);
  }

  drawWaypoints(grid_controller) {
    console.log(grid_controller.getWaypoints(), grid_controller._path);
    let waypoints = grid_controller.getWaypoints();
    for (let i in waypoints) {
      let waypoint = waypoints[i];
      this._drawCircle({x: this._grid_padding + waypoint.x * this._cell_width, y: this._grid_padding + waypoint.y * this._cell_width});
    }
    this.drawPath(grid_controller);
  }

  drawPath (grid_controller) {
    let path = grid_controller._path;
    let waypoints = grid_controller.getWaypoints();
    for (let i in path) {
      let segment = path[i];
      let prev_part = null;
      for (let j in segment) {
        let part = segment[j];
        if (prev_part != null) {
          let c1 = this._getTileCenter(prev_part);
          let c2 = this._getTileCenter(part);
          this._drawArrow(c1, c2);
        }
        prev_part = part;
      }
    }
  }

  _drawArrow (start, end) {
    let distance = this._calculateDistance(start, end);
    let angle = Math.atan2(start.y-end.y, start.x-end.x);
    let flange_angle1 = angle - (30 * Math.PI / 180);
    let flange_angle2 = angle + (30 * Math.PI / 180);
    let flange_length = Math.max(5, distance / 20);
    let flange1 = {x: Math.cos(flange_angle1) * flange_length + end.x, y: Math.sin(flange_angle1) * flange_length + end.y};
    let flange2 = {x: Math.cos(flange_angle2) * flange_length + end.x, y: Math.sin(flange_angle2) * flange_length + end.y};
    this._ctx.strokeStyle = "green";
    this._ctx.lineWidth = 3;
    this._ctx.lineJoin = "round";
    this._ctx.beginPath();
    this._ctx.moveTo(start.x, start.y);
    this._ctx.lineTo(end.x, end.y);
    this._ctx.lineTo(flange1.x, flange1.y);
    this._ctx.moveTo(end.x, end.y);
    this._ctx.lineTo(flange2.x, flange2.y);
    this._ctx.stroke();
  }

  _resizeCanvas () {
    this._$canvas.width  = window.innerWidth;
    this._$canvas.height = window.innerHeight;
  }

  _generateCellWidth () {
    if (this._$canvas.width <= this._$canvas.height) {
      return this._$canvas.width / this._rows;
    } else {
      return this._$canvas.height / this._columns;
    }
  }

  _drawRect (start, width, height) {
    this._ctx.strokeStyle = "white";
    this._ctx.rect(start.x, start.y, width, height);
    this._ctx.stroke();
  }
  _drawLine (start, end) {
    this._ctx.strokeStyle = "white";
    this._ctx.beginPath();
    this._ctx.moveTo(start.x, start.y);
    this._ctx.lineTo(end.x, end.y);
    this._ctx.stroke();
  }
  _drawCircle (waypoint) {
    this._ctx.strokeStyle = "red";
    this._ctx.fillStyle = "red";
    this._ctx.beginPath();
    this._ctx.arc(waypoint.x + .5 * this._cell_width, waypoint.y + .5 * this._cell_width, .25 * this._cell_width -2, 0, Math.PI * 2);
    this._ctx.fill();
  }

  _calculateDistance (p1, p2) {
    return Math.pow(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2), 0.5);
  }

  _getTileCenter (point) {
    return {
      x: this._grid_padding + point.x * this._cell_width + 0.5 * this._cell_width,
      y: this._grid_padding + point.y * this._cell_width + 0.5 * this._cell_width
    };
  }
}
