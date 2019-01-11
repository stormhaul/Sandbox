"using strict";

class MonsterController {
  constructor (configuration) {
    this._speed  = configuration.monster_speed  != undefined ? configuration.monster_speed  : 5;
    this._health = configuration.monster_health != undefined ? configuration.monster_health : 100;
    this._growth = configuration.monster_growth != undefined ? configuration.monster_growth : 1.05;
    this._value  = configuration.monster_value  != undefined ? configuration.monster_value  : 20;

  }

  spawnMonster (location, wave, id) {
    let that = this;
    let factor = Math.pow(this._growth, wave);
    let monster = {};
    monster.location = location;//location of monsters unlike other objects should be in pixels
    monster.speed = this._speed;
    monster.health = this.health * factor;
    monster.id = id;
    monster.target = {segment: 0, part: 0};
    monster.escaped = function(resource_controller, grid_controller) {
      resource_controller.addLives(-1);
      grid_controller.removeMonster(id);
    };
    monster.died = function(resource_controller, grid_controller) {
      resource_controller.addGold(that._value);
      grid_controller.removeMonster(id);
    };
    return monster;
  }
}
