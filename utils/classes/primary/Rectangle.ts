export default class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    baseX: number;
    baseY: number;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
    }
}