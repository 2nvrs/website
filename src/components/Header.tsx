import { FC } from 'react';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        <ul>
          <li><a href="/">home</a></li>
          <li><a href="/about">about</a></li>
          <li><a href="/contact">contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 
