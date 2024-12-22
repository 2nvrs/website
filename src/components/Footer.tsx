import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My TSX Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer; 