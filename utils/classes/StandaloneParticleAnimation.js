import Animation from "./abstract/Animation.js";
import Particle from "./primary/Particle.js";

export default class StandaloneParticleAnimetion extends Animation {
    constructor(canvas, amountOfPartciles) {
        super(canvas);
        this.defaultFill = "rgba(249, 250, 253, 0.1)";
        this.defaultStroke = "rgba(249, 250, 253, 0.1)";
        this.particleArray = [];
        for (let i = 0; i < amountOfPartciles; i++) {
            this.particleArray.push(
                new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                ),
            );
        }
    }

    update() {
        for (let i = 0; i < this.particleArray.length; i++) {
            this.particleArray[i].x += this.particleArray[i].directionX;
            this.particleArray[i].y += this.particleArray[i].directionY;
            if (
                this.particleArray[i].x < 0 ||
                this.particleArray[i].x > this.canvas.width
            ) {
                this.particleArray[i].directionX *= -1;
            }
            if (
                this.particleArray[i].y < 0 ||
                this.particleArray[i].y > this.canvas.height
            ) {
                this.particleArray[i].directionY *= -1;
            }
        }
    }

    draw() {
        this.connectParticles();

        for (let i = 0; i < this.particleArray.length; i++) {
            this.ctx.moveTo(this.particleArray[i].x, this.particleArray[i].y);
            this.ctx.arc(
                this.particleArray[i].x,
                this.particleArray[i].y,
                this.particleArray[i].size,
                0,
                Math.PI * 2,
            );
        }

        this.ctx.fillStyle = this.defaultFill;
        this.ctx.fill();
    }

    connectParticles() {
        this.ctx.beginPath();

        for (let i = 0; i < this.particleArray.length; i++) {
            for (let j = i; j < this.particleArray.length; j++) {
                let dx = this.particleArray[i].x - this.particleArray[j].x;
                let dy = this.particleArray[i].y - this.particleArray[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 110) {
                    this.ctx.moveTo(
                        this.particleArray[i].x,
                        this.particleArray[i].y,
                    );
                    this.ctx.lineTo(
                        this.particleArray[j].x,
                        this.particleArray[j].y,
                    );
                }
            }
        }

        this.ctx.strokeStyle = this.defaultStroke;
        this.ctx.stroke();
    }
}
