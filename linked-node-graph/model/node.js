"using strict";

let Node = function(position) {
  let n = {};

  n.location = position;
  n.links = [];
  n.addLink = function (link) {
    this.links.push(link);
  }

  return n;
}
