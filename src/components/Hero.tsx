import { useEffect, useRef } from 'react';
import '../styles/Hero.css';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const text = title.textContent || '';
    title.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'letter';
      span.style.animationDelay = `${index * 0.05}s`;
      title.appendChild(span);
    });
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-background">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="hero-grid"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-text">EST. 2025</span>
          <span className="badge-divider">•</span>
          <span className="badge-text">ELITE COMPETITION</span>
        </div>
        
        <h1 ref={titleRef} className="hero-title">
          The League That Matters Most
        </h1>
        
        <p className="hero-subtitle">
          Where Champions Rise Above The Rest
        </p>
        
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">8</span>
            <span className="stat-label">Elite Teams</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number">17</span>
            <span className="stat-label">Weeks of Glory</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number">1</span>
            <span className="stat-label">Ultimate Champion</span>
          </div>
        </div>

        <div className="hero-cta">
          <button className="cta-primary" onClick={() => document.getElementById('standings')?.scrollIntoView({ behavior: 'smooth' })}>
            View League Teams
            <svg className="cta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};