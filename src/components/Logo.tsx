import { FC } from 'react';
import './Logo.css';
import logoImage from '../components/logo.png';

const Logo: FC = () => {
  return (
    <div className="logo-container">
      <img 
        src={logoImage}
        alt="cnvrs browser" 
        className="glowing-logo"
        draggable="false"
      />
    </div>
  );
};

export default Logo; 
