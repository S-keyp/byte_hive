import Particle from "./primary/Particle.js";
import Animation from "./abstract/Animation.js";

export default class TitleAnimation extends Animation {
    isClicked = false;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Particle[]} particles
     * @param {Function} updateParticle
     * @param {Function} drawParticle
     */
    constructor(canvas, particles) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.particles = particles;
        this.mouse = { x: null, y: null, radius: 100 };

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

    connectParticles() {
        this.ctx.save();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "rgba(68, 68, 68, .3)";
        this.ctx.beginPath();

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i; j < this.particles.length; j++) {
                let dx = this.particles[i].x - this.particles[j].x;
                let dy = this.particles[i].y - this.particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 15 && distance > 7) {
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                }
            }
        }

        this.ctx.stroke();
        this.ctx.restore();
    }

    draw() {
        this.connectParticles();

        const oldColor = this.ctx.fillStyle;
        this.ctx.beginPath();
        for (let particle of this.particles) {
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }

        this.ctx.fillStyle = "#333";
        this.ctx.fill();
        this.ctx.fillStyle = oldColor;
    }

    /** @param {Particle} particle */
    getDistFromMouse(particle) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = this.mouse.radius;
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * particle.density;
        const directionY = forceDirectionY * force * particle.density;

        return {
            distance,
            directionX,
            directionY,
            radius: this.mouse.radius,
            isClicked: this.isClicked,
        };
    }

    update() {
        let lut = [[-1, 1], [-1, 1]];
        for (let particle of this.particles) {
            let movementInfos = this.getDistFromMouse(particle);
            if (movementInfos.distance <= movementInfos.radius) {
                particle.size = 4;

                if (movementInfos.isClicked) {
                    particle.x += movementInfos.directionX / 2;
                    particle.y += movementInfos.directionY / 2;
                } else {
                    particle.x -= movementInfos.directionX +
                        lut[Math.round(Math.random())][
                            Math.round(Math.random())
                        ];
                    particle.y -= movementInfos.directionY +
                        lut[Math.round(Math.random())][
                            Math.round(Math.random())
                        ];
                }
            } else {
                particle.size = 2;

                if (particle.x != particle.baseX) {
                    let dx = particle.x - particle.baseX;
                    particle.x -= dx / 10;
                }

                if (particle.y != particle.baseY) {
                    let dy = particle.y - particle.baseY;
                    particle.y -= dy / 10;
                }
            }
        }
    }
}
