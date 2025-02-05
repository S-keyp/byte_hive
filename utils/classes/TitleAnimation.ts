import Particle from "./primary/Particle";
import Animation from "./abstract/Animation";

export interface MovementInfos { distance: number; directionX: number; directionY: number; radius: number; isClicked: boolean; }
export type ParticleUpdateFunction = (particle: Particle, movementInfos: MovementInfos) => void
export type ParticleDrawFunction = (particle: Particle) => void
export interface MouseInfos {
    x: number
    y: number
    radius: number
}

export default class TitleAnimation extends Animation {
    isClicked = false;

    particles: Particle[]
    updateParticle: ParticleUpdateFunction
    drawParticle: ParticleDrawFunction
    mouse: MouseInfos

    constructor(canvas: HTMLCanvasElement, particles: Particle[], updateParticle: ParticleUpdateFunction, drawParticle: ParticleDrawFunction) {
        super(canvas);
        this.ctx.fillStyle = "white";
        this.particles = particles;
        this.updateParticle = updateParticle;
        this.drawParticle = drawParticle;
        this.mouse = { x: 0, y: 0, radius: 100 };

        this.canvas.addEventListener("mousemove", (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y - this.canvas.getBoundingClientRect().top;
        });
        this.canvas.addEventListener("mousedown", () => {
            this.isClicked = true;
            this.mouse.radius = 300;
        });
        this.canvas.addEventListener("mouseup", () => {
            this.isClicked = false;
            this.mouse.radius = 100;
        });
    }

    getDistFromMouse(particle: Particle) {
        let dx = this.mouse.x - particle.x;
        let dy = this.mouse.y - particle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = this.mouse.radius;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * particle.density;
        let directionY = forceDirectionY * force * particle.density;

        return {
            distance,
            directionX,
            directionY,
            radius: this.mouse.radius,
            isClicked: this.isClicked,
        };
    }

    connectParticles() {
        let opacityValue = 1;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i; j < this.particles.length; j++) {
                let dx = this.particles[i].x - this.particles[j].x;
                let dy = this.particles[i].y - this.particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 20 && distance > 7) {
                    opacityValue = 1 - (distance / 20);
                    this.ctx.beginPath();
                    // this.ctx.strokeStyle = "black"
                    this.ctx.strokeStyle = "rgba(68, 68, 68, " + opacityValue +
                        ")";
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    draw() {
        this.ctx.fillStyle = "white";
        for (let particle of this.particles) {
            this.drawParticle(particle);
        }
    }

    update() {
        for (let particle of this.particles) {
            let movementInfos = this.getDistFromMouse(particle);
            this.updateParticle(particle, movementInfos);
        }
    }
}
