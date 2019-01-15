"using strict";

let Link = function (n1, n2) {
  let l = {};

  l.from   = n1.position;
  l.to     = n2.position;
  l.equals = function (link) {
    return (this.from == link.from && this.to == link.to) || (this.from == link.to && this.to == link.from);
  }

  return l;
}
