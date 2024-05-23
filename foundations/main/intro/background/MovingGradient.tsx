import React, { useEffect, useRef } from "react";
import Particle from "./Particle";

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const MovingGradient: React.FC = ({ uiState }: any) => {
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

      for (let i = 0; i < 25; i++) {
        const radius = canvas.width * getRandom(0.2, 0.4);
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = `hsl(${getRandom(180, 360)}, 100%, ${getRandom(8, 15)}%)`;
        const speed = {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
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
