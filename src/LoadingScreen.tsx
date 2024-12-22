import { FC } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  return (
    <div className="loading-screen" onClick={onLoadComplete}>
      <div className="loading-content">
        <div className="loading-spinner" />
        <div className="loading-text">Loading</div>
      </div>
    </div>
  );
};

export default LoadingScreen; 