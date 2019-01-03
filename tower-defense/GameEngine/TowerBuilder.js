"using strict";

class TowerBuilder {
  constructor (configuration = {}) {
    this._cost       = configuration.tower_cost   != undefined ? configuration.tower_cost   : 100;
    this._range      = configuration.tower_range  != undefined ? configuration.tower_range  : 5;
    this._rate       = configuration.tower_rate   != undefined ? configuration.tower_rate   : 1;
    this._damage     = configuration.tower_damage != undefined ? configuration.tower_damage : 20;
  }

  buildTower (location) {
    let tower = {};

    tower.location = location;
    tower.cost = this._cost;
    tower.range = this._range;
    tower.damage = this._damage;
    tower.fired = false;
    tower.attack = function(monster, fire_animation) {
      let location = monster.location;
      distance = Math.pow(Math.pow(location.x - this.location.x, 2) + Math.pow(location.y - this.location.y, 2), 0.5);
      if (this.fired && distance <= this.range) {
        this.fired = true;
        fire_animation(this.location, monster.location);
        monster.health -= this.damage;
        if (monster.health <= 0) {
          monster.died();
        }
        let that = this;
        setTimeout(function(){that.fired = false;}, this.rate * 1000);
      }
    }

    return tower;
  }
}
