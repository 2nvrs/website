import { FC, useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

const BAR_COUNT = 15;
const SENSITIVITY = 0.4;
const MIN_HEIGHT = 2;
const BASE_HEIGHT = 0.005;
const MAX_HEIGHT = 0.3;

// Higher frequency bands
const FREQUENCY_BANDS = [
  [2, 4], [5, 8], [9, 13], [14, 19], [20, 27],
  [28, 37], [38, 49], [50, 64], [65, 83], [84, 108],
  [109, 140], [141, 182], [183, 236], [237, 306], [307, 396]
];

const CustomAudioPlayer: FC = () => {
  const [, setIsTabVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [, setCurrentText] = useState('unalog');

  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const ctx = canvas.getContext('2d')!;
    
    if (!contextRef.current) {
      contextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = contextRef.current.createAnalyser();
      gainNodeRef.current = contextRef.current.createGain();
      filterNodeRef.current = contextRef.current.createBiquadFilter();

      const source = contextRef.current.createMediaElementSource(audio);
      
      // Set up audio nodes chain
      source
        .connect(gainNodeRef.current)
        .connect(filterNodeRef.current)
        .connect(analyserRef.current)
        .connect(contextRef.current.destination);

      // Configure nodes
      filterNodeRef.current.type = 'lowpass';
      filterNodeRef.current.frequency.value = 20000; // Start with no filter
      gainNodeRef.current.gain.value = 0.15; // Initial volume

      analyserRef.current.fftSize = 1024;
      analyserRef.current.smoothingTimeConstant = 0.65;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }

    // Handle visibility change
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === 'visible';
      setIsTabVisible(isVisible);

      if (gainNodeRef.current && filterNodeRef.current) {
        // Smooth volume transition
        gainNodeRef.current.gain.linearRampToValueAtTime(
          isVisible ? 0.15 : 0.05,
          contextRef.current!.currentTime + 0.5
        );

        // Smooth filter transition
        filterNodeRef.current.frequency.linearRampToValueAtTime(
          isVisible ? 20000 : 800,
          contextRef.current!.currentTime + 0.5
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const drawBars = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
      
      const barWidth = (canvas.width / BAR_COUNT) - 2;
      const cornerRadius = 4;
      
      for (let i = 0; i < BAR_COUNT; i++) {
        const [start, end] = FREQUENCY_BANDS[i];
        let sum = 0;
        for (let j = start; j <= end; j++) {
          sum += dataArrayRef.current[j];
        }
        
        const avgValue = sum / (end - start + 1);
        const normalizedHeight = (avgValue / 255) * canvas.height;
        
        const baseHeight = canvas.height * BASE_HEIGHT;
        const variableHeight = Math.max(MIN_HEIGHT, normalizedHeight * SENSITIVITY);
        const totalHeight = Math.min(
          baseHeight + variableHeight,
          canvas.height * MAX_HEIGHT
        );
        
        const intensity = Math.min(1, totalHeight / (canvas.height * 2));
        const brightness = Math.floor(255 * (0.7 + intensity * 0.3));
        
        ctx.shadowBlur = 15 + (intensity * 10);
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        
        const x = i * (barWidth + 2);
        const y = canvas.height - totalHeight;
        
        ctx.beginPath();
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + barWidth - cornerRadius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + cornerRadius);
        ctx.lineTo(x + barWidth, y + totalHeight - cornerRadius);
        ctx.quadraticCurveTo(x + barWidth, y + totalHeight, x + barWidth - cornerRadius, y + totalHeight);
        ctx.lineTo(x + cornerRadius, y + totalHeight);
        ctx.quadraticCurveTo(x, y + totalHeight, x, y + totalHeight - cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
        ctx.closePath();
        ctx.fill();
      }
      
      rafRef.current = requestAnimationFrame(drawBars);
    };

    const timer = setTimeout(() => {
      audio.volume = 0.15;
      audio.play()
        .then(drawBars)
        .catch(console.error);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (audio) {
        audio.pause();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const texts = ['unalog', 'presents...', 'cnvrs Browser'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setCurrentText(texts[currentIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="audio-player-wrapper">
        <canvas
          ref={canvasRef}
          width={300}
          height={1200}
          className="visualizer"
        />
        <div className="song-info">
          <div className="song-title">u weren't here i really miss you</div>
          <div className="song-artist">cult member</div>
          <div className="song-version">(slowed x reverb)</div>
        </div>
        <audio
          ref={audioRef}
          src="/videoplayback.weba"
          loop
          preload="auto"
        />
      </div>
      <div className="unalog-text">
        unalog
      </div>
    </>
  );
};

export default CustomAudioPlayer; 