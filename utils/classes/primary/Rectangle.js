import * as Types from "../typedefs.js";

/**
 * @type {Types.Rectangle}
 */
export default class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
    }
}
