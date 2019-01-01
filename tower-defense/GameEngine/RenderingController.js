"using strict";

class RenderingController {
  constructor (configuration = {}) {
    this._canvas_id    = configuration.canvas_id    != undefined ? configuration.canvas_id    : 'canvas';
    this._rows         = configuration.rows         != undefined ? configuration.rows         : 55;
    this._columns      = configuration.columns      != undefined ? configuration.columns      : 55;
    this._grid_padding = configuration.grid_padding != undefined ? configuration.grid_padding : 10;
    this._$canvas = document.getElementById(this._canvas_id);
    this._ctx = this._$canvas.getContext('2d');

    this._resizeCanvas();

    this._cell_width = configuration.cell_width != undefined ? configuration.cell_width : 10; //this._generateCellWidth();
    //this._testDraw();
  }

  drawGrid (grid_controller) {
    let total_width  = this._cell_width * this._rows;
    let total_height = this._cell_width * this._columns;
    this._drawRect({x: this._grid_padding, y: this._grid_padding}, total_width - 2 * this._grid_padding, total_height - 2 * this._grid_padding);

    for (let i = 1; i < this._rows - 2; i++) {
      this._drawLine(
        {x: this._grid_padding, y: this._grid_padding + this._cell_width * i},
        {x: total_width - this._grid_padding, y: this._grid_padding + this._cell_width * i}
      );
    }
    for (let i = 1; i < this._columns - 2; i++) {
      this._drawLine(
        {x: this._grid_padding + this._cell_width * i, y: this._grid_padding},
        {x: this._grid_padding + this._cell_width * i, y: total_width - this._grid_padding}
      );
    }

    this.drawWaypoints(grid_controller);
  }

  drawWaypoints(grid_controller) {
    let waypoints = grid_controller.getWaypoints();
    for (let i in waypoints) {
      let waypoint = waypoints[i];
      this._drawCircle({x: waypoint.x * this._cell_width, y: waypoint.y * this._cell_width});
    }
  }

  _resizeCanvas () {
    this._$canvas.width  = window.innerWidth - 2 * this._grid_padding;
    this._$canvas.height = window.innerHeight - 2 * this._grid_padding;
  }

  _generateCellWidth () {
    if (this._$canvas.width <= this._$canvas.height) {
      return this._$canvas.width / this._rows;
    } else {
      return this._$canvas.height / this._columns;
    }
  }

  _testDraw (n = 1) {
    if (20 * n >= this._$canvas.width || 20 * n >= this._$canvas.height) {
      return;
    }
    this._ctx.strokeStyle = "white";
    this._ctx.rect(10 * n, 10 * n, this._$canvas.width - 20 * n, this._$canvas.height - 20 * n);
    this._ctx.stroke();
    this._testDraw(n+1);
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
    this._ctx.arc(waypoint.x + .5 * this._cell_width, waypoint.y + .5 * this._cell_width, .5 * this._cell_width, 0, Math.PI * 2);
    this._ctx.fill();
  }
}
