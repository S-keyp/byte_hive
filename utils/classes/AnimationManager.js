import Animation from "./abstract/Animation";

export default class AnimationManager {
    timer = 0;
    /** @type {Animation[]} */
    animations = [];
    /** @type {HTMLCanvasElement} */
    canvas = null;
    /** @type {CanvasRenderingContext2D} */
    ctx = null;

    constructor(canvas, animations) {
        for (let anim of animations) {
            this.animations.push(anim);
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.strokeStyle = "rgba(68, 68, 68, 0.05)";
        this.ctx.fillStyle = "rgba(68, 68, 68, 0.05)";
        // this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    }

    draw() {
        for (let animation of this.animations) {
            animation.draw();
        }
    }

    update() {
        for (let animation of this.animations) {
            animation.update();
        }
    }

    animate(timeStamp) {
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
