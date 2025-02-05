import Animation from "./abstract/Animation";

export default class AnimationManager {
    timer: DOMHighResTimeStamp = 0
    animations: Animation[]
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, animations: Animation[]) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.animations = animations;
    }

    draw() {
        this.animations.forEach(animation => animation.draw());
    }

    update() {
        this.animations.forEach(animation => animation.update());
    }

    animate(timeStamp: DOMHighResTimeStamp) {
        const lastTime = timeStamp;
        while (this.timer < lastTime) {
            this.timer += 1000 / 60;
            this.update();
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
        requestAnimationFrame(this.animate.bind(this));
    }
}