import Particle from './Particle.js';

export default class StandaloneParticleAnimetion {
    timer = 0;
    
    constructor(canvas, amountOfPartciles){
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        /** @type {CanvasRenderingContext2D} */
        this.ctx = canvas.getContext("2d");

        this.particleArray = [];
        for(let i = 0; i < amountOfPartciles; i++){
            this.particleArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
        this.animate()
    }

    updateParticles(){
        for(let i = 0; i < this.particleArray.length; i++){
            this.particleArray[i].x += this.particleArray[i].directionX;
            this.particleArray[i].y += this.particleArray[i].directionY;
            if(this.particleArray[i].x < 0 || this.particleArray[i].x > this.canvas.width){
                this.particleArray[i].directionX *= -1;
            }
            if(this.particleArray[i].y < 0 || this.particleArray[i].y > this.canvas.height){
                this.particleArray[i].directionY *= -1;
            }
        }
    }

    drawParticles(){
        for(let i = 0; i < this.particleArray.length; i++){
            this.ctx.beginPath();
            this.ctx.arc(this.particleArray[i].x, this.particleArray[i].y, this.particleArray[i].size, 0, Math.PI * 2);
            this.ctx.fillStyle = "rgba(68, 68, 68, 0.05)";
            this.ctx.fill();
        }
    }

    connectParticles(){
        for(let i = 0; i < this.particleArray.length; i++){
            for(let j = i; j < this.particleArray.length; j++){ 
                let dx = this.particleArray[i].x - this.particleArray[j].x;
                let dy = this.particleArray[i].y - this.particleArray[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < 100){
                    this.ctx.strokeStyle = "rgba(68, 68, 68, 0.05)";
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particleArray[i].x, this.particleArray[i].y);
                    this.ctx.lineTo(this.particleArray[j].x, this.particleArray[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate(timeStamp){
        const lastTime = timeStamp;
        while (this.timer < lastTime) {
            this.timer += 1000 / 60;
            this.updateParticles();
        }
        this.connectParticles();
        this.drawParticles();
        requestAnimationFrame(this.animate.bind(this));
    }

}