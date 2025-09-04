import { useState, useEffect } from 'react';
import { scheduleData } from '../data/leagueData';
import { useESPNData } from '../hooks/useESPNData';
import { RosterPreview } from './RosterPreview';
import { ESPNDebug } from './ESPNDebug';
import '../styles/Schedule.css';

export const Schedule = () => {
  const { currentWeek: liveCurrentWeek, teams: teamsWithRosters } = useESPNData();
  const [selectedWeek, setSelectedWeek] = useState(liveCurrentWeek || 1);
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  // Update selected week when live current week changes
  useEffect(() => {
    if (liveCurrentWeek && liveCurrentWeek !== selectedWeek) {
      setSelectedWeek(liveCurrentWeek);
    }
  }, [liveCurrentWeek, selectedWeek]);

  const currentWeekData = scheduleData.find(week => week.week === selectedWeek);

  // Helper function to find team roster by name with exact matching
  const getTeamRoster = (teamName: string) => {
    // First try exact match
    let match = teamsWithRosters.find(team => team.teamName === teamName);
    
    if (!match) {
      // Try case-insensitive exact match
      match = teamsWithRosters.find(team => 
        team.teamName.toLowerCase() === teamName.toLowerCase()
      );
    }
    
    if (!match) {
      // Try partial matching (contains)
      match = teamsWithRosters.find(team => 
        team.teamName.toLowerCase().includes(teamName.toLowerCase()) ||
        teamName.toLowerCase().includes(team.teamName.toLowerCase())
      );
    }
    
    // Debug: log mismatches
    if (!match) {
      console.log(`No roster found for team: "${teamName}". Available teams:`, 
        teamsWithRosters.map(t => t.teamName));
    }
    
    return match;
  };

  const toggleGameExpanded = (gameId: string) => {
    setExpandedGame(expandedGame === gameId ? null : gameId);
  };

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


        {/* Games Display */}
        <div className="games-container list">
          <div className="games-header">
            <h3 className="games-title">Week {selectedWeek} Matchups</h3>
            <span className="games-count">{currentWeekData?.games.length || 0} Games</span>
          </div>

          <div className="games-grid list">
            {currentWeekData?.games.map((game, index) => {
              const homeTeamRoster = getTeamRoster(game.homeTeam);
              const awayTeamRoster = getTeamRoster(game.awayTeam);
              const isExpanded = expandedGame === game.id;
              
              // Debug roster data when expanded
              if (isExpanded) {
                console.log(`Game ${game.id} expanded:`, {
                  homeTeam: game.homeTeam,
                  awayTeam: game.awayTeam,
                  homeRoster: homeTeamRoster?.startingLineup?.length || 0,
                  awayRoster: awayTeamRoster?.startingLineup?.length || 0,
                });
              }
              
              return (
                <div 
                  key={game.id} 
                  className={`game-card ${isExpanded ? 'expanded' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="game-teams">
                    <div className="team away-team">
                      <div className="team-info">
                        <span className="team-name">{game.awayTeam}</span>
                        <span className="team-location">@ Away</span>
                        {awayTeamRoster?.roster && (
                          <span className="roster-count">
                            {awayTeamRoster.roster.filter(p => p.isStarter).length} starters
                          </span>
                        )}
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
                        {homeTeamRoster?.roster && (
                          <span className="roster-count">
                            {homeTeamRoster.roster.filter(p => p.isStarter).length} starters
                          </span>
                        )}
                      </div>
                      <div className="team-score">
                        {game.isCompleted ? game.homeScore.toFixed(1) : '--'}
                      </div>
                    </div>
                  </div>

                  <div className="game-actions">
                    <div className="game-status">
                      {game.isCompleted ? (
                        <span className="status-completed">Final</span>
                      ) : (
                        <span className="status-upcoming">Upcoming</span>
                      )}
                    </div>
                    
                    {(homeTeamRoster?.startingLineup || awayTeamRoster?.startingLineup) && (
                      <button 
                        className="roster-toggle"
                        onClick={() => toggleGameExpanded(game.id)}
                      >
                        {isExpanded ? 'Hide Rosters' : 'View Rosters'}
                      </button>
                    )}
                  </div>

                  {isExpanded && (
                    <div className="game-rosters">
                      <div className="roster-matchup">
                        {(() => {
                          const validAwayPlayers = awayTeamRoster?.startingLineup?.filter(p => p.name && p.name.trim() !== '') || [];
                          const validHomePlayers = homeTeamRoster?.startingLineup?.filter(p => p.name && p.name.trim() !== '') || [];
                          
                          return (
                            <>
                              {validAwayPlayers.length > 0 && (
                                <div className="roster-section">
                                  <RosterPreview 
                                    players={validAwayPlayers}
                                    teamName={`${game.awayTeam} (Away)`}
                                    maxPlayers={9}
                                    currentWeek={selectedWeek}
                                  />
                                </div>
                              )}
                              
                              {validHomePlayers.length > 0 && (
                                <div className="roster-section">
                                  <RosterPreview 
                                    players={validHomePlayers}
                                    teamName={`${game.homeTeam} (Home)`}
                                    maxPlayers={9}
                                    currentWeek={selectedWeek}
                                  />
                                </div>
                              )}
                              
                              {validAwayPlayers.length === 0 && validHomePlayers.length === 0 && (
                                <div className="roster-unavailable">
                                  <p>Roster data unavailable for this matchup</p>
                                </div>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
      <ESPNDebug />
    </section>
  );
};