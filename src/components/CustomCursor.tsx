import { FC, useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor: FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateCursorPosition = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        setPosition(prev => ({
          x: lerp(prev.x, targetRef.current.x, 0.35),
          y: lerp(prev.y, targetRef.current.y, 0.35)
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    animate();

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  );
};

export default CustomCursor; 