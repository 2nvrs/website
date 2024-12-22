import { FC, useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  maxLife: number;
}

const ParticleEffect: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const [isMouseInWindow, setIsMouseInWindow] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsMouseInWindow(true);
    const handleMouseLeave = () => setIsMouseInWindow(false);

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      const maxLife = Math.random() * 30 + 20;

      particles.current.push({
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: maxLife,
        maxLife
      });

      if (particles.current.length > 80) {
        particles.current.shift();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isMouseInWindow) {
        createParticle();
        createParticle();
      }

      particles.current = particles.current.filter(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.life--;

        const opacity = Math.max((particle.life / particle.maxLife) * 0.8, 0);
        const size = Math.max((particle.life / particle.maxLife) * 3, 1);

        // Draw glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${opacity * 0.3})`;
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 255, 218, ${opacity})`;
        ctx.fill();

        // Draw center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        return particle.life > 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMouseInWindow]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
        background: 'black'
      }}
    />
  );
};

export default ParticleEffect; 