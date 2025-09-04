import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-brand-text">TLTMM</span>
          <span className="nav-brand-divider">|</span>
          <span className="nav-brand-year">2025</span>
        </div>
        
        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li className="nav-item">
            {location.pathname === '/' ? (
              <button onClick={() => scrollToSection('hero')} className="nav-link">
                Home
              </button>
            ) : (
              <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            )}
          </li>
          <li className="nav-item">
            {location.pathname === '/' ? (
              <button onClick={() => scrollToSection('standings')} className="nav-link">
                Teams
              </button>
            ) : (
              <Link to="/#standings" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                Teams
              </Link>
            )}
          </li>
          <li className="nav-item">
            <Link 
              to="/schedule" 
              className={`nav-link ${location.pathname === '/schedule' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Schedule
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};