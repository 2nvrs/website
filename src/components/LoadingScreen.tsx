import { FC } from 'react';
import './LoadingScreen.css';

const LoadingScreen: FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-spinner" />
        <div className="loading-text">Loading</div>
      </div>
    </div>
  );
};

export default LoadingScreen; 