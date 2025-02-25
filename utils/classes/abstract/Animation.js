export default class Animation {
    canvas;
    ctx;
    defaultStroke;
    defaultFill;

    constructor(canvas) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");
        this.defaultStroke = this.ctx.strokeStyle;
        this.defaultFill = this.ctx.fillStyle;
    }
    draw() {
        throw new Error("Method not implemented.");
    }
    update() {
        throw new Error("Method not implemented.");
    }
}
