import { FC, useState, useEffect } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onEnter: () => void;
}

const SplashScreen: FC<SplashScreenProps> = ({ onEnter }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleVerify = () => {
    setIsVerified(true);
    setTimeout(() => {
      setIsAnimating(true);
      setTimeout(onEnter, 1000);
    }, 0);
  };

  return (
    <div className={`splash-screen ${isAnimating ? 'fade-out' : ''} ${isVisible ? 'visible' : ''}`}>
      <div className="splash-content">
        <button 
          className={`verify-btn ${isVerified ? 'verified' : ''}`} 
          onClick={handleVerify}
          disabled={isVerified}
        >
          <span className="btn-text">
            {isVerified ? null : 'Enter Experience'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SplashScreen; 