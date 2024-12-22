import { FC, useState } from 'react';
import './Options.css';
import OptionsMenu from './OptionsMenu';

const Options: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button 
        className="options-button" 
        aria-label="Options"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="options-circle">
          <span className="options-dot"></span>
          <span className="options-dot"></span>
          <span className="options-dot"></span>
        </div>
      </button>
      <OptionsMenu isOpen={isMenuOpen} />
    </>
  );
};

export default Options; 