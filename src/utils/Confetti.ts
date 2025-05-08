class Confetti {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private colors: string[] = [
    '#FF577F', '#FF884B', '#FFDEB4', '#FFC764', 
    '#B983FF', '#94B3FD', '#57CC99', '#FFD6EC'
  ];

  constructor(container: HTMLDivElement) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = container.offsetWidth;
    this.canvas.height = container.offsetHeight;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    container.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    this.ctx = ctx;

    // Handle resize
    window.addEventListener('resize', () => {
      this.canvas.width = container.offsetWidth;
      this.canvas.height = container.offsetHeight;
    });
  }

  public start(): void {
    // Create initial particles
    this.createParticles(100);
    this.animate();
  }

  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private createParticles(count: number): void {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        -20,
        this.getRandomSize(),
        this.colors[Math.floor(Math.random() * this.colors.length)],
        this.canvas.height
      ));
    }
  }

  private getRandomSize(): number {
    return Math.random() * 10 + 5; // Between 5 and 15
  }

  private animate = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Add new particles occasionally
    if (Math.random() < 0.1) {
      this.createParticles(1);
    }
    
    // Update and draw particles
    this.particles.forEach((particle, index) => {
      particle.update();
      particle.draw(this.ctx);
      
      // Remove particles that are out of bounds
      if (particle.y > this.canvas.height || particle.x < 0 || particle.x > this.canvas.width) {
        this.particles.splice(index, 1);
      }
    });
    
    this.animationId = requestAnimationFrame(this.animate);
  };
}

class Particle {
  public x: number;
  public y: number;
  private size: number;
  private color: string;
  private speedY: number;
  private speedX: number;
  private rotation: number;
  private rotationSpeed: number;
  private canvasHeight: number;
  private swingFactor: number;
  private swingOffset: number;

  constructor(x: number, y: number, size: number, color: string, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedY = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2 - 1;
    this.canvasHeight = canvasHeight;
    this.swingFactor = Math.random() * 3;
    this.swingOffset = Math.random() * Math.PI * 2;
  }

  public update(): void {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin((this.y / 100) + this.swingOffset) * this.swingFactor;
    this.rotation += this.rotationSpeed;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    
    ctx.fillStyle = this.color;
    ctx.beginPath();
    
    // Different shapes for variety
    const shapeType = Math.floor(this.rotation % 3);
    
    if (shapeType === 0) {
      // Rectangle
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    } else if (shapeType === 1) {
      // Circle
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Triangle
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);
      ctx.lineTo(-this.size / 2, this.size / 2);
      ctx.lineTo(this.size / 2, this.size / 2);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
  }
}

export default Confetti;