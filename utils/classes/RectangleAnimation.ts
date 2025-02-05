import Animation from "./abstract/Animation";
import Rectangle from "./primary/Rectangle";

export default class RectangleAnimation extends Animation {
    rectangles: Rectangle[];

    constructor(canvas: HTMLCanvasElement, rectangles: Rectangle[]) {
        super(canvas);
        this.rectangles = rectangles;
    }

    easin(x: number): number {
        return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    }

    update(): void {
        for (let rectangle of this.rectangles) {
            rectangle.x += 2;
            if (rectangle.x > this.canvas.width) {
                rectangle.x = -2.5 * rectangle.width;
            }
        }
    }

    draw(): void {
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
        this.ctx.resetTransform();
    }
}
