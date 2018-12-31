"using strict";

class Angle {
  constructor (angle, radians = false) {
    if (radians) {
      this.degrees = angle * 180 / Math.PI;
      this.radians = angle;
    } else {
      this.degrees = angle;
      this.radians = angle * Math.PI / 180;
    }
  }

  addDegrees (degrees) {
    this.degrees += degrees;
    this.radians += degrees * Math.PI / 180;
  }

  addRadians (radians) {
    this.radians += radians;
    this.degrees += radians * 180 / Math.PI;
  }
}
