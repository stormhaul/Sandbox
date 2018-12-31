"using strict";

class GridController {
  constructor (configuration = {}) {
    this._width                 = configuration.width                 != undefined ? configuration.width     : 100;
    this._height                = configuration.height                != undefined ? configuration.height    : 100;
    this._waypoints_count       = configuration.waypoints             != undefined ? configuration.waypoints : 5;
    this._min_waypoint_distance = configuration.min_waypoint_distance != undefined ? configuration.min_waypoint_distance : 5;

    this.initGrid();
  }

  initGrid () {

  }

  _generateWaypoints () {
    this.waypoints = {};
    while (this._waypoints.length < this._waypoints_count) {
      let x = Math.floor(Math.rand() * this._width);
      let y = Math.floor(Math.rand() * this._height);
      let proposed_point = {x: x, y: y};
      if (this._isValidWaypoint(point)) {

      }
    }
  }

  _isValidWaypoint (point) {
    for (let i in this.waypoints) {
      let waypoint = this.waypoints[i];
      if (this._calculateDistance(waypoint, point) < this._min_waypoint_distance) {
        return false;
      }
    }

    return true;
  }

  _calculateDistance (p1, p2) {
    return Math.pow(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2), 0.5);
  }
}
