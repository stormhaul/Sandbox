"using strict";

let Graph = function(configuration) {
  let g = {};

  g.nodes = [];
  g.generateNodes = function (count = configuration.defaults.nodes.count) {
    for (let i = 0; i < count; i++) {
      this.addNode();
    }
  }
  g.addNode = function () {
    this.nodes.push(new Node());
  }
  g.generateLinks = function () {
    
  }

  return g;
}
