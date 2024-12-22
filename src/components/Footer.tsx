import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} cnvrs browser</p>
    </footer>
  );
};

export default Footer; 
