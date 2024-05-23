export default class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: { x: number; y: number };

  constructor(x: number, y: number, radius: number, color: string, speed: { x: number; y: number }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speed.x;
    this.y += this.speed.y;

    if (this.x > canvasWidth || this.x < 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.y > canvasHeight || this.y < 0) {
      this.speed.y = -this.speed.y;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
