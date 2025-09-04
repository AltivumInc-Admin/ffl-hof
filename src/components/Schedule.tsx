import { useState, useEffect } from 'react';
import { scheduleData } from '../data/leagueData';
import { useESPNData } from '../hooks/useESPNData';
import '../styles/Schedule.css';

export const Schedule = () => {
  const { currentWeek: liveCurrentWeek } = useESPNData();
  const [selectedWeek, setSelectedWeek] = useState(liveCurrentWeek || 1);

  // Update selected week when live current week changes
  useEffect(() => {
    if (liveCurrentWeek && liveCurrentWeek !== selectedWeek) {
      setSelectedWeek(liveCurrentWeek);
    }
  }, [liveCurrentWeek, selectedWeek]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentWeekData = scheduleData.find(week => week.week === selectedWeek);

  return (
    <section id="schedule" className="schedule-section">
      <div className="schedule-container">
        <div className="schedule-header">
          <span className="schedule-label">2025 Season</span>
          <h2 className="schedule-title">Schedule</h2>
          <p className="schedule-subtitle">Track every matchup through the season</p>
        </div>

        {/* Week Navigator */}
        <div className="week-navigator">
          <div className="week-selector">
            {scheduleData.map((week) => (
              <button
                key={week.week}
                className={`week-button ${selectedWeek === week.week ? 'active' : ''} ${week.week === liveCurrentWeek ? 'current-week' : ''}`}
                onClick={() => setSelectedWeek(week.week)}
              >
                Week {week.week}
                {week.week === liveCurrentWeek && <span className="live-indicator">LIVE</span>}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="view-controls">
          <div className="view-toggle">
            <button
              className={`toggle-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={`toggle-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        {/* Games Display */}
        <div className={`games-container ${viewMode}`}>
          <div className="games-header">
            <h3 className="games-title">Week {selectedWeek} Matchups</h3>
            <span className="games-count">{currentWeekData?.games.length || 0} Games</span>
          </div>

          <div className={`games-grid ${viewMode}`}>
            {currentWeekData?.games.map((game, index) => (
              <div 
                key={game.id} 
                className="game-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="game-teams">
                  <div className="team away-team">
                    <div className="team-info">
                      <span className="team-name">{game.awayTeam}</span>
                      <span className="team-location">@ Away</span>
                    </div>
                    <div className="team-score">
                      {game.isCompleted ? game.awayScore.toFixed(1) : '--'}
                    </div>
                  </div>

                  <div className="game-divider">
                    <span className="vs-text">VS</span>
                  </div>

                  <div className="team home-team">
                    <div className="team-info">
                      <span className="team-name">{game.homeTeam}</span>
                      <span className="team-location">🏠 Home</span>
                    </div>
                    <div className="team-score">
                      {game.isCompleted ? game.homeScore.toFixed(1) : '--'}
                    </div>
                  </div>
                </div>

                <div className="game-status">
                  {game.isCompleted ? (
                    <span className="status-completed">Final</span>
                  ) : (
                    <span className="status-upcoming">Upcoming</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="schedule-footer">
          <div className="season-info">
            <div className="info-item">
              <span className="info-label">Regular Season:</span>
              <span className="info-value">Weeks 1-13</span>
            </div>
            <div className="info-item">
              <span className="info-label">Total Games:</span>
              <span className="info-value">{scheduleData.reduce((total, week) => total + week.games.length, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};