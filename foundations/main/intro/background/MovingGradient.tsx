import React, { useEffect, useRef } from "react";
import Particle from "./Particle";

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const MovingGradient: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createParticles = () => {
      const particles: Particle[] = [];

      for (let i = 0; i < 45; i++) {
        const radius = canvas.width * getRandom(0.1, 0.5);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `hsl(${getRandom(0, 360)}, ${getRandom(30, 60)}%, ${getRandom(10, 20)}%)`;
        const speed = {
          x: (Math.random() - 0.5) * 1.8,
          y: (Math.random() - 0.5) * 1.8,
        };

        particles.push(new Particle(x, y, radius, color, speed));
      }

      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default MovingGradient;
