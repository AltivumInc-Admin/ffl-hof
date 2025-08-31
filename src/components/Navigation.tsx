import { useState, useEffect } from 'react';
import '../styles/Navigation.css';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-brand-text">TLTMM</span>
          <span className="nav-brand-divider">|</span>
          <span className="nav-brand-year">2025</span>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <button onClick={() => scrollToSection('hero')} className="nav-link">
              Home
            </button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('standings')} className="nav-link">
              Teams
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};