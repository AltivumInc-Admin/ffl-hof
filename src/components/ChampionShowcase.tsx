import '../styles/ChampionShowcase.css';

interface ChampionData {
  year: string;
  name: string;
  teamName: string;
  record: string;
  points: string;
  playoff: string;
}

export const ChampionShowcase = () => {
  const currentChampion: ChampionData = {
    year: '2025',
    name: 'Season In Progress',
    teamName: 'The Crown Awaits',
    record: '0-0',
    points: '0.00',
    playoff: 'TBD'
  };

  return (
    <section id="champion" className="champion-showcase">
      <div className="showcase-container">
        <div className="showcase-header">
          <span className="showcase-label">Current Season</span>
          <h2 className="showcase-title">The Throne Awaits</h2>
        </div>

        <div className="champion-display">
          <div className="trophy-container">
            <div className="trophy-glow"></div>
            <svg className="trophy-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path d="M60 50C60 50 60 70 70 80C80 90 100 90 100 90C100 90 120 90 130 80C140 70 140 50 140 50H60Z" 
                    fill="url(#trophyGold)" 
                    filter="url(#glow)" />
              <path d="M50 50H150V60H50V50Z" fill="url(#trophyGold)" />
              <rect x="90" y="90" width="20" height="40" fill="url(#trophyGold)" />
              <path d="M70 130H130L120 150H80L70 130Z" fill="url(#trophyGold)" />
              <rect x="60" y="150" width="80" height="10" fill="#1B2951" />
              <path d="M40 60C40 60 30 60 30 70C30 80 40 80 40 80" 
                    stroke="url(#trophyGold)" 
                    strokeWidth="4" 
                    fill="none" />
              <path d="M160 60C160 60 170 60 170 70C170 80 160 80 160 80" 
                    stroke="url(#trophyGold)" 
                    strokeWidth="4" 
                    fill="none" />
            </svg>
          </div>

          <div className="champion-info">
            <div className="champion-year">{currentChampion.year}</div>
            <div className="champion-name">{currentChampion.name}</div>
            <div className="champion-team">{currentChampion.teamName}</div>
            
            <div className="champion-stats-grid">
              <div className="champion-stat-item">
                <span className="champion-stat-value">{currentChampion.record}</span>
                <span className="champion-stat-label">Season Record</span>
              </div>
              <div className="champion-stat-item">
                <span className="champion-stat-value">{currentChampion.points}</span>
                <span className="champion-stat-label">Total Points</span>
              </div>
              <div className="champion-stat-item">
                <span className="champion-stat-value">{currentChampion.playoff}</span>
                <span className="champion-stat-label">Playoff Result</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};