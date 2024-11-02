import Particle from "./Particle.js";

export default class Animation {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Particle[]} particles
     * @param {Function} updateParticle
     * @param {Function} drawParticle
     */
    constructor(canvas, particles, updateParticle, drawParticle) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.particles = particles;
        this.updateParticle = updateParticle;
        this.drawParticle = drawParticle;
        this.mouse = { x: null, y: null, radius: 200 };

        this.canvas.addEventListener("mousemove", (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });

        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.updateAll((particle) => {
            let movementInfos = this.getDistFromMouse(particle);
            this.updateParticle(particle, movementInfos);
        });
        this.drawAll(this.drawParticle);
        requestAnimationFrame(this.animate.bind(this));
    }

    /** @param {Particle} particle */
    getDistFromMouse(particle) {
        let dx = this.mouse.x - particle.x;
        let dy = this.mouse.y - particle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = this.mouse.radius;
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let force = (maxDistance - distance) * 2 / maxDistance;
        let directionX = forceDirectionX * force * particle.density;
        let directionY = forceDirectionY * force * particle.density;

        return {
            distance,
            directionX,
            directionY,
            radius: this.mouse.radius,
        };
    }

    /**
     * @param {Function} draw
     */
    drawAll(drawFunction) {
        this.ctx.fillStyle = "white";
        for (let particle of this.particles) {
            drawFunction(particle);
        }
    }

    /** @param {Function} updateFunction */
    updateAll(updateFunction) {
        for (let particle of this.particles) {
            updateFunction(particle);
        }
    }
}
