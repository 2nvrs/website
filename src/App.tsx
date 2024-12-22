import { FC, useState, useRef, useEffect } from 'react'
import Logo from './components/Logo'
import Options from './components/Options'
import CustomAudioPlayer from './components/AudioPlayer'
import SplashScreen from './components/SplashScreen'
import './App.css'

const App: FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const audioStartedRef = useRef(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isInverted, setIsInverted] = useState(false);

  const handleEnterSite = () => {
    if (!audioStartedRef.current) {
      audioStartedRef.current = true;
      setHasEntered(true);
    }
  };

  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      document.body.classList.add('fade-out');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const toggleCredits = () => {
    setIsCreditsOpen(!isCreditsOpen);
  };

  const toggleTheme = () => {
    setIsInverted(!isInverted);
  };

  const bokehElements = Array.from({ length: 35 }).map((_, i) => {
    const size = Math.random() * 600 + 400;
    const left = Math.random() * 100;
    const moveX = (Math.random() - 0.5) * 120;
    const duration = Math.random() * 35 + 45;
    const delay = Math.random() * -45;
    const opacity = Math.random() * 0.25 + 0.1;
    
    const types = [
      `radial-gradient(circle at center, 
        rgba(25, 25, 25, ${opacity}) 0%, 
        rgba(20, 20, 20, ${opacity}) 10%, 
        rgba(18, 18, 18, ${opacity}) 20%, 
        rgba(15, 15, 15, ${opacity * 0.9}) 35%, 
        rgba(12, 12, 12, ${opacity * 0.8}) 50%, 
        rgba(10, 10, 10, ${opacity * 0.7}) 65%, 
        rgba(8, 8, 8, ${opacity * 0.5}) 80%,
        rgba(5, 5, 5, ${opacity * 0.3}) 90%,
        transparent 100%
      )`
    ];
    
    return (
      <div
        key={i}
        className="bokeh"
        style={{
          width: size + 'px',
          height: size + 'px',
          left: left + '%',
          bottom: -size/4 + 'px',
          background: types[0],
          animation: `floatUp ${duration}s infinite cubic-bezier(0.25, 0.1, 0.25, 1)`,
          animationDelay: delay + 's',
          '--moveX': moveX + 'px'
        } as React.CSSProperties}
      />
    );
  });

  return (
    <>
      {!hasEntered ? (
        <SplashScreen onEnter={handleEnterSite} />
      ) : (
        <div className={`app ${isInverted ? 'inverted' : ''}`}>
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isInverted ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {isInverted ? '🌙' : '☀️'}
          </button>
          <div 
            className={`top-indicator ${isCreditsOpen ? 'active' : ''}`}
            onClick={toggleCredits}
          />
          <div className={`credits-menu ${isCreditsOpen ? 'open' : ''}`}>
            <h2>Team Credits</h2>
            
            <div className="credits-section">
              <h3>builders</h3>
              <ul>
                <li>.f3ntt <span>unalog studios</span></li>
                <li>NOVAki <span>Website Builder</span></li>
                <li>mr camrunna <span>Unalog Dev</span></li>
              </ul>
            </div>

            <div className="credits-section">
              <h3>moderators</h3>
              <ul>
                <li>NOVAki <span>mod</span></li>
                <li>!OA <span>mod</span></li>
                <li>! cdot <span>mod</span></li>
              </ul>
            </div>

            <div className="credits-section">
              <h3>real unalogians</h3>
              <ul className="unalogians">
                {/* Placeholder for user photos and names */}
                <li>Coming Soon</li>
              </ul>
            </div>

            <p className="copyright">© 2024 spiristic. All Rights Reserved</p>
          </div>
          <div className="grid-background" />
          <div className="bokeh-background visible">
            {bokehElements}
          </div>
          <Options />
          <div className="content">
            <Logo />
            <div className="coming-soon">coming soon</div>
          </div>
          <CustomAudioPlayer />
        </div>
      )}
    </>
  )
}

export default App;
