"using strict";

class MainLoop {
  /**
   * The main loop constructor accepts a configuration parameter
   * but all options should contain default values for ease of configuration
   * @param object configuration
   */
  constructor (configuration = {}) {
    this.tick_rate = configuration.tick_rate != undefined ? configuration.tick_rate : 50; // default is 50 ticks per second
    this._frame_duration = Math.round(1000 / this.tick_rate);
  }

  initializeLoop () {
    this.grid_controller = new GridController(configuration);
    this.rendering_controller = new RenderingController(configuration);

    this.rendering_controller.drawGrid(this.grid_controller);

    this._loop();
  }

  _loop () {
    this.rendering_controller.drawGrid(this.grid_controller);
    let that = this;
    setTimeout(function(){that._loop();}, this._frame_duration);
  }
}
