import { teams as staticTeams } from '../data/leagueData';
import { useESPNData } from '../hooks/useESPNData';
import '../styles/Standings.css';

export const Standings = () => {
  const { teams: liveTeams, isLoading, error, lastUpdated, refreshData } = useESPNData();
  
  // Use live data if available, fallback to static data
  const teams = liveTeams.length > 0 ? liveTeams : staticTeams;
  return (
    <section id="standings" className="standings-section">
      <div className="standings-container">
        <div className="standings-header">
          <span className="standings-label">2025 Inaugural Season</span>
          <h2 className="standings-title">League Teams</h2>
          <p className="standings-subtitle">
            Eight Contenders. One Champion.
            {isLoading && <span className="loading-indicator"> • Updating...</span>}
            {error && <span className="error-indicator"> • Using cached data</span>}
            {lastUpdated && !isLoading && (
              <span className="last-updated"> • Updated {lastUpdated.toLocaleTimeString()}</span>
            )}
          </p>
        </div>

        <div className="standings-table">
          <div className="standings-table-header">
            <div className="col-rank">#</div>
            <div className="col-team">Team</div>
            <div className="col-manager">Manager</div>
            <div className="col-record">Record</div>
            <div className="col-points">PF</div>
            <div className="col-points">PA</div>
          </div>

          <div className="standings-rows">
            {teams.map((team, index) => (
              <div 
                key={team.abbreviation} 
                className={`standings-row ${index === 0 ? 'first-place' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="col-rank">
                  <span className="rank-number">{team.rank}</span>
                </div>
                <div className="col-team">
                  <div className="team-info">
                    <span className="team-abbr">{team.abbreviation}</span>
                    <span className="team-name">{team.teamName}</span>
                  </div>
                </div>
                <div className="col-manager">{team.managerName}</div>
                <div className="col-record">
                  <span className="record-text">
                    {team.wins}-{team.losses}{team.ties > 0 ? `-${team.ties}` : ''}
                  </span>
                </div>
                <div className="col-points">{team.pointsFor.toFixed(2)}</div>
                <div className="col-points">{team.pointsAgainst.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="standings-footer">
          <div className="standings-controls">
            <button 
              className="refresh-button"
              onClick={refreshData}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Refresh Data'}
            </button>
          </div>
          
          <div className="legend">
            <div className="legend-item">
              <span className="legend-dot playoff"></span>
              <span className="legend-text">Playoff Position</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot bubble"></span>
              <span className="legend-text">Playoff Bubble</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot eliminated"></span>
              <span className="legend-text">Eliminated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};