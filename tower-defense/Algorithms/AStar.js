"using strict";

class AStar {
  constructor (grid_controller) {
    this._grid = grid_controller.getGrid();

    this._vectors = [
      {x:-1, y:-1},
      {x: 0, y:-1},
      {x: 1, y:-1},
      {x:-1, y: 0},
      {x: 1, y: 0},
      {x:-1, y: 1},
      {x: 0, y: 1},
      {x: 1, y: 1}
    ];

    this._blockers = {1: true};
  }

  updateGrid (grid_controller) {
    this._grid = grid_controller.getGrid();
  }

  findPath (start, end) {
    console.log(start, end, this._grid);
    let closed_set = {};
    let open_set   = new PriorityQueue();

    let start_key = this._pointKey(start)

    let came_from = [];

    let g_score = {};
    let f_score = {};
    for (let i in this._grid) {
      let row = this._grid[i];
      for (let j in row) {
        let cell = row[j];
        let coord_key = this._pointKey({x:i, y:j});
        g_score[coord_key] = Math.INFINITY;
        f_score[coord_key] = Math.INFINITY;
      }
    }

    g_score[start_key] = 0;
    f_score[start_key] = this._heuristicCostEstimate(start, end);

    open_set.enqueue(start_key, f_score[start_key]);
    let current = open_set.dequeue();
    while (current != null) {
      if (current == this._pointKey(end)) {
        let path = this._reconstructPath(came_from, current);
        path.push(end);
        console.log(g_score, f_score);
        return path;
      }
      let current_coord = this._keyPoint(current);
      closed_set[current] = current_coord;

      let neighbors = this._getNeighbors(current_coord);
      for (let i in neighbors) {
        let n     = neighbors[i];
        let n_key = this._pointKey(n);
        if (closed_set[this._pointKey(n)] !== undefined) {
          continue;
        }

        let tentative_g_score = g_score[current] + this._heuristicCostEstimate(current_coord, n);

        f_score[n_key]   = tentative_g_score + this._heuristicCostEstimate(n, end);
        if (!open_set.contains(n_key)) {
          open_set.enqueue(n_key, f_score[n_key]);
        } else if (tentative_g_score >= g_score[n_key]) {
          continue;
        }
        came_from[n_key] = current;
        g_score[n_key]   = tentative_g_score;
      }

      current = open_set.dequeue();
    }
  }

  _pointKey (point) {
    return point.x + ',' + point.y;
  }
  _keyPoint (key) {
    let arr = key.split(',');
    return {x: parseInt(arr[0]), y: parseInt(arr[1])};
  }
  _heuristicCostEstimate (start, goal) {
    return Math.pow(Math.pow(goal.x - start.x, 2) + Math.pow(goal.y - start.y, 2), 0.5);
  }
  _getNeighbors (point) {
    let neighbors = [];
    for (let i in this._vectors) {
      let v_add = this._vectors[i];
      let possible = {x: point.x + v_add.x, y: point.y + v_add.y};
      if (possible.x >= 0 &&
          possible.x < this._grid.length &&
          possible.y >= 0 &&
          possible.y < this._grid[0].length &&
          this._blockers[this._grid[possible.x][possible.y]] == undefined) {
        neighbors.push(possible);
      }
    }
    return neighbors;
  }
  _reconstructPath (came_from, current) {
    let path = [];
    let c = came_from[current];
    while (c != undefined) {
      path.push(this._keyPoint(c));
      c = came_from[c];
    }

    return path.reverse();
  }
}
