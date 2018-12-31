"using strict";

class TowerBuilder {
  constructor (configuration = {}) {
    this._cost   = configuration.tower_cost   != undefined ? configuration.tower_cost   : 100;
    this._range  = configuration.tower_range  != undefined ? configuration.tower_range  : 200;
    this._rate   = configuration.tower_rate   != undefined ? configuration.tower_rate   : 1;
    this._damage = configuration.tower_damage != undefined ? configuration.tower_damage : 20;
  }

  buildTower (resource_controller, grid_controller, location) {

  }
}
