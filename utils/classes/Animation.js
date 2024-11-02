import Particle from "./Particle.js";

export default class Animation {
    timer = 0;
    isClicked = false;

    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Particle[]} particles
     * @param {Function} updateParticle
     * @param {Function} drawParticle
     */
    constructor(canvas, particles, updateParticle, drawParticle) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.ctx.fillStyle = "white";
        this.particles = particles;
        this.updateParticle = updateParticle;
        this.drawParticle = drawParticle;
        this.mouse = { x: null, y: null, radius: 100 };

        this.canvas.addEventListener("mousemove", (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });

        this.canvas.addEventListener("mousedown", () => {
            this.isClicked = true 
            this.mouse.radius = 300
        });
        this.canvas.addEventListener("mouseup", () => {
            this.isClicked = false 
            this.mouse.radius = 100
        });

        this.animate();
    }

    /** @param {DOMHighResTimeStamp} timeStamp */
    animate(timeStamp) {
        const lastTime = timeStamp;
        // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.fillStyle = "rgba(68, 68, 68, 0.6)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        while (this.timer < lastTime) {
            this.timer += 1000 / 60
            this.updateAll((particle) => {
                let movementInfos = this.getDistFromMouse(particle);
                this.updateParticle(particle, movementInfos);
            });
        }

        // this.connectParticles();
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
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * particle.density;
        let directionY = forceDirectionY * force * particle.density;

        return {
            distance,
            directionX,
            directionY,
            radius: this.mouse.radius,
            isClicked: this.isClicked
        };
    }

    connectParticles(){
        let opacityValue = 1;
        for (let i = 0; i < this.particles.length; i++){
            for(let j = i; j < this.particles.length; j++){
                let dx = this.particles[i].x - this.particles[j].x;
                let dy = this.particles[i].y - this.particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if(distance < 20 && distance > 7){
                    opacityValue = 1 - (distance / 20);
                    this.ctx.beginPath();
                    // this.ctx.strokeStyle = "white"
                    this.ctx.strokeStyle = "rgba(255, 255, 255, " + opacityValue + ")";
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
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
