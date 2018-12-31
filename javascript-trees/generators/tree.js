"using strict";

class TreeGenerator {
	constructor (configuration) {
		this.min_branches  = configuration != undefined && configuration.min_branches  != undefined ? configuration.min_branches  : 0;
		this.max_branches  = configuration != undefined && configuration.max_branches  != undefined ? configuration.max_branches  : 1;
		this.decay_rate    = configuration != undefined && configuration.decay_rate    != undefined ? configuration.decay_rate    : 90;
		this.canvas_height = configuration != undefined && configuration.canvas_height != undefined ? configuration.canvas_height : window.innerHeight;
		this.canvas_width  = configuration != undefined && configuration.canvas_width  != undefined ? configuration.canvas_width  : window.innerWidth;
	}

	requestTree () {
		return new Branch({x:this.canvas_width / 2, y: this.canvas_height}, new Angle(-90), 75, this.min_branches, this.max_branches, this.decay_rate);
	}
}
