export default class Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;
    directionX: number;
    directionY: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 40) + 5;
        this.directionX = Math.random() * 2 - 1;
        this.directionY = Math.random() * 2 - 1;
    }
}