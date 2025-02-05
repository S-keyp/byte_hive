import Animation from "./abstract/Animation";
import Particle from "./primary/Particle";

export default class StandaloneParticleAnimetion extends Animation {
    particleArray: Particle[];

    constructor(canvas: HTMLCanvasElement, amountOfParticles: number) {
        super(canvas);

        this.particleArray = [];
        for (let i = 0; i < amountOfParticles; i++) {
            this.particleArray.push(
                new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                ),
            );
        }
    }

    update(): void {
        for (let particle of this.particleArray) {
            particle.x += particle.directionX;
            particle.y += particle.directionY;
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.directionX *= -1;
            }

            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.directionY *= -1;
            }
        }
    }

    draw(): void {
        this.connectParticles();
        for (let particle of this.particleArray) {
            this.ctx.beginPath();
            this.ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2,
            );
            this.ctx.fillStyle = "rgba(68, 68, 68, 0.05)";
            this.ctx.fill();
        }
    }

    connectParticles(): void {
        this.ctx.strokeStyle = "rgba(68, 68, 68, 0.05)";
        this.ctx.lineWidth = 1;
        for (let i = 0; i < this.particleArray.length; i++) {
            const particle_i = this.particleArray[i];
            for (let j = i; j < this.particleArray.length; j++) {
                const particle_j = this.particleArray[j];
                let dx = particle_i.x - particle_j.x;
                let dy = particle_i.y - particle_j.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    this.ctx.moveTo(particle_i.x, particle_i.y);
                    this.ctx.lineTo(particle_j.x, particle_j.y);
                }
            }
        }
        this.ctx.stroke();
    }
}
