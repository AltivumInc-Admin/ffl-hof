import { useState } from 'react';
import { teams as staticTeams } from '../data/leagueData';
import { useESPNData, type TeamWithRoster } from '../hooks/useESPNData';
import { RosterPreview } from './RosterPreview';
import '../styles/Standings.css';

export const Standings = () => {
  const { teams: liveTeams, isLoading, error, lastUpdated, refreshData } = useESPNData();
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  
  // Use live data if available, fallback to static data
  const teams = liveTeams.length > 0 ? liveTeams : staticTeams;
  
  const toggleTeamExpanded = (teamName: string) => {
    setExpandedTeam(expandedTeam === teamName ? null : teamName);
  };
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
            <div className="col-actions">Actions</div>
          </div>

          <div className="standings-rows">
            {teams.map((team, index) => {
              const teamWithRoster = liveTeams.find(t => t.teamName === team.teamName) as TeamWithRoster | undefined;
              const isExpanded = expandedTeam === team.teamName;
              
              return (
                <div key={team.abbreviation}>
                  <div 
                    className={`standings-row ${index === 0 ? 'first-place' : ''} ${isExpanded ? 'expanded' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="col-rank">
                      <span className="rank-number">{team.rank}</span>
                    </div>
                    <div className="col-team">
                      <div className="team-info">
                        <span className="team-abbr">{team.abbreviation}</span>
                        <span className="team-name">{team.teamName}</span>
                        {teamWithRoster?.roster && (
                          <span className="roster-indicator">
                            {teamWithRoster.roster.filter(p => p.isStarter).length} starters
                          </span>
                        )}
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
                    <div className="col-actions">
                      {teamWithRoster?.startingLineup && (
                        <button 
                          className="view-roster-btn"
                          onClick={() => toggleTeamExpanded(team.teamName)}
                        >
                          {isExpanded ? '▼' : '▶'} Roster
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {isExpanded && teamWithRoster?.startingLineup && (
                    <div className="team-roster-expanded">
                      <RosterPreview 
                        players={teamWithRoster.startingLineup}
                        teamName={team.teamName}
                        maxPlayers={12}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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