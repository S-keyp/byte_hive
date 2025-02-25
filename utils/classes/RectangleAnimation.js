import Animation from "./abstract/Animation.js";
import Rectangle from "./primary/Rectangle.js";

export default class RectangleAnimation extends Animation {
    constructor(canvas, rectangles) {
        super(canvas);

        /** @type {Rectangle[]} */
        this.rectangles = rectangles;
    }

    easin(x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    }

    update() {
        for (let rectangle of this.rectangles) {
            rectangle.x += 2;
            if (rectangle.x > this.canvas.width) {
                rectangle.x = -2.5 * rectangle.width;
            }
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.setTransform(1, Math.tan(45), 0, 1, 0, 0);

        for (let rectangle of this.rectangles) {
            this.ctx.fillStyle = rectangle.color;

            this.ctx.fillRect(
                this.easin((rectangle.x + 150) / this.canvas.width) *
                    rectangle.x,
                rectangle.y,
                rectangle.width,
                rectangle.height,
            );
        }

        this.ctx.restore();
    }
}
