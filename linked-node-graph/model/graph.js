"using strict";

let Graph = function(configuration) {
  let g = {};
  console.log('hi');

  g.nodes = [];
  g.generateNodes = function (count = configuration.defaults.nodes.count) {
    for (let i = 0; i < count; i++) {
      this.addNode();
    }
    console.log(this.nodes);
  }
  g.addNode = function () {
    let position = {
      x: genRandNum(0, configuration.defaults.grid.width - 1),
      y: genRandNum(0, configuration.defaults.grid.height -1)
    };
    this.nodes.push(new Node(position));
  }
  g.generateLinks = function () {
    let link_count = configuration.defaults.nodes.links;
    for (let i in this.nodes) {
      let n = this.nodes[i];
      let pot_links = this.potentialLinks(n);
    }
    let pot_links = this.potentialLinks(this.nodes[0]);
  }
  g.potentialLinks = function (node) {
    let pot = [];
    Outer:
    for (let i in this.nodes) {
      let n = this.nodes[i];
      if (node.equals(n)) {
        continue;
      }

      let link = new Link(node, n);
      for (let j in node.links) {
        let l = node.links[j];
        if (link.equals(l)) {
          continue Outer;
        }
      }

      pot.push(n);
    }

    return pot;
  }

  g.init = function() {
    this.generateNodes();
    this.generateLinks();
  }

  g.init();
  return g;
}
