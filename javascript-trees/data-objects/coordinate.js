"using strict";

class Coordinate {
  constructor (param1, param2) {
    if (!isNaN(param1) && !isNaN(param2)) {
      this.x = param1;
      this.y = param2;
    } else if (param1.length == 2 && param1.x != undefined && param1.y != undefined) {
      this.x = param1.x;
      this.y = param1.y;
    } else if (param1.length == 2 && param1[0] != undefined && param1[1] != undefined) {
      this.x = param1[0];
      this.y = param1[1];
    } else {
      throw new Error("Invalid Format Passed into Coordinate constructor" + typeof param1 + " " + typeof param2);
    }
  }

  distanceTo (coordinate) {
    return Math.sqrt(Math.pow(coordinate.x - this.x, 2) + Math.pow(coordinate.y - this.y, 2));
  }
}
