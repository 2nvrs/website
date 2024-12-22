import { FC, useEffect, useRef } from 'react';
import './SpotifyPlayer.css';

const SpotifyPlayer: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Start playing after loading screen
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Set volume to 30%
        audioRef.current.play();
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="spotify-player">
      <audio 
        ref={audioRef}
        controls 
        src="/Aces - Sped Up Version.mp3"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SpotifyPlayer;