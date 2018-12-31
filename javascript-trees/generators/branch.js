"using strict";

class Branch {
	constructor (start, angle, length, min_branches, max_branches, decay_rate) {
		this.start = start;
		this.angle = angle;
		this.length = length;
		this.width = length * .1;
		this.min_branches = min_branches;
		this.max_branches = max_branches;
		this.decay_rate = decay_rate;

		this.end = {x: this.start.x + (this.length * Math.cos(this.angle.radians)), y: this.start.y + (this.length * Math.sin(this.angle.radians))};

		this.children = this.generateChildren();
	}

	generateChildren () {
		let children = [];
		let num_branches = Math.ceil(Math.random() * (this.max_branches - this.min_branches + 1) + this.min_branches);
		for (var i = 0; i < num_branches; i++) {
			let next_length = this.length * (Math.random() * (10) + (this.decay_rate-5)) / 100;
			let next_angle = new Angle(this.angle.degrees + Math.random() * 90 - 45);
			if (next_length > 10) {
				children.push(new Branch(this.end, next_angle, next_length, this.min_branches, this.max_branches, this.decay_rate));
			}
		}
		return children;
	}
}
