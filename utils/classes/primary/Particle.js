import * as Types from "../typedefs.js";

/**
 * @type {Types.Particle}
 */
export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 40) + 5;
    this.directionX = Math.random() * 2 - 1;
    this.directionY = Math.random() * 2 - 1;
    // this.hue = hue;
  }
}
