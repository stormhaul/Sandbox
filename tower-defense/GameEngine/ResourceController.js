"using strict";

class ResourceController {
  constructor (configuration = {}) {
    this._gold  = configuration.default_gold  != undefined ? configuration.default_gold  : 400;
    this._lives = configuration.default_lives != undefined ? configuration.default_lives : 20;
  }

  getGold () {
    return this._gold;
  }
  getLives () {
    return this._lives;
  }
  addGold (gold) {
    this._gold += gold;
  }
  addLives (lives) {
    this._lives += lives;
  }
}
