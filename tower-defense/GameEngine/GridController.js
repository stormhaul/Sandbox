"using strict";

class GridController {
  constructor (configuration = {}) {
    this._width                 = configuration.rows                  != undefined ? configuration.rows                  : 55;
    this._height                = configuration.columns               != undefined ? configuration.columns               : 55;

    if (configuration.cell_width != undefined) {
      let padding  = configuration.grid_padding != undefined ? configuration.grid_padding : 10;
      this._width  = Math.floor((window.innerWidth - padding)  / configuration.cell_width);
      this._height = Math.floor((window.innerHeight - padding) / configuration.cell_width);
    }

    this._waypoints_count       = configuration.waypoints             != undefined ? configuration.waypoints             : 5;
    this._min_waypoint_distance = configuration.min_waypoint_distance != undefined ? configuration.min_waypoint_distance : 5;

    this.initGrid();

    this._path = this._generatePath();

    this._tower_builder = new TowerBuilder(configuration);
    this.towers = [];

    this._monster_controller = new MonsterController(configuration);
    this.m_ct = 0;
    this.w_ct = 0;
    this.monsters = {};
  }

  spawnWave () {
    for (let i = 0; i < 20; i++) {
      let monster = this._monster_controller.spawnMonster(this._path[0][0], this.w_ct, this.m_ct + i);
      this.monsters[this.m_ct] = monster;
      this.m_ct++;
    }
    this.w_ct++;
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

  isEmpty (pos) {
    if (this._grid[pos.x][pos.y] != 0) {
      return false;
    }
    for (let i in this._waypoints) {
      if (pos == this._waypoints[i]) {
        return false;
      }
    }
    return true;
  }

  getGrid () {
    return this._grid;
  }

  getWaypoints () {
    return this._waypoints;
  }

  addTower (location) {
    let tower = this._tower_builder.buildTower(location);
    this._grid[location.x][location.y] = tower;
    this.towers.push(tower);
    this._path = this._generatePath();
    console.log(this._grid, this._path, this.towers);
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

  _generatePath () {
    let path = [];

    let a_star = new AStar(this);

    let prev = null;
    for (let i in this._waypoints) {
      let cur = this._waypoints[i];
      if (prev != null) {
        let segment = a_star.findPath(prev, cur);
        if (segment == undefined) {
          return [];
        }
        path.push(segment);
      }
      prev = cur;
    }
    return path;
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
