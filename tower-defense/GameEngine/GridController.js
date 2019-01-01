"using strict";

class GridController {
  constructor (configuration = {}) {
    this._width                 = configuration.width                 != undefined ? configuration.width                 : 100;
    this._height                = configuration.height                != undefined ? configuration.height                : 100;
    this._waypoints_count       = configuration.waypoints             != undefined ? configuration.waypoints             : 5;
    this._min_waypoint_distance = configuration.min_waypoint_distance != undefined ? configuration.min_waypoint_distance : 5;

    this.initGrid();
  }

  initGrid () {
    this._grid = [];

    for (let i = 0; i < this._width; i++) {
      this._grid.push([]);
      for (let j = 0; j < this._height; j++) {
        this._grid[i].push(0);
      }
    }

    this._generateWaypoints();
  }

  getGrid () {
    return this._grid;
  }

  getWaypoints () {
    return this._waypoints;
  }

  _generateWaypoints () {
    this._waypoints = [];
    while (this._waypoints.length < this._waypoints_count) {
      let x = Math.floor(Math.random() * this._width);
      let y = Math.floor(Math.random() * this._height);
      let point = {x: x, y: y};
      if (this._isValidWaypoint(point)) {
        this._waypoints.push(point);
      }
    }
  }

  _isValidWaypoint (point) {
    for (let i in this._waypoints) {
      let waypoint = this._waypoints[i];
      if (this._calculateDistance(waypoint, point) < this._min_waypoint_distance) {
        return false;
      }
    }

    return true;
  }

  _calculateDistance (p1, p2) {
    return Math.pow(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2), 0.5);
  }

  _pointKey (point) {
    return point.x + ',' + point.y;
  }

  _keyPoint (key) {
    let arr = key.split(',');
    return {x: parseInt(arr[0]), y: parseInt(arr[1])};
  }
}
