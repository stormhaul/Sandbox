"using strict";

class TreeEncoder {
	constructor (configuration) {
		// the amount of change in distance for a rendering step
		this.delta = configuration != undefined && configuration.delta != undefined ? configuration.delta : 10;
	}

	encodeTree(tree) {
		console.log(tree);
		let instruction_queue = new PriorityQueue();
		let n = 0;// step number
    for (let i = 0; i*this.delta < tree.length; i++) {
			let start = this.getPoint(tree.start, tree.angle, i*this.delta);
			let end   = this.getPoint(start, tree.angle, Math.min(tree.length - i*this.delta, this.delta));
			instruction_queue.enqueue(new Instruction(start, end, tree.width, tree.angle), n);
			n++;
		}

    for (var j in tree.children) {
      this.encodeBranches (tree.children[j], n, instruction_queue);
    }
    return instruction_queue;
	}

	encodeBranches (branch, n, instruction_queue) {
    for (let i = 0; i*this.delta < branch.length; i ++) {
      let start = this.getPoint(branch.start, branch.angle, i*this.delta);
      let end = this.getPoint(start, branch.angle, Math.min(branch.length - i*this.delta, this.delta));
      instruction_queue.enqueue(new Instruction(start, end, branch.width, branch.angle), n);
      n++;
    }

    for (var j in branch.children) {
      this.encodeBranches (branch.children[j], n, instruction_queue);
    }
	}

	getPoint (start, angle, length) {
		return {
			x: start.x + Math.cos(angle.radians) * length,
			y: start.y + Math.sin(angle.radians) * length,
		};
	}
}
