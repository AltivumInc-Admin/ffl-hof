import type { ProcessedPlayer } from '../services/espnFantasyApi';
import '../styles/RosterPreview.css';

interface RosterPreviewProps {
  players: ProcessedPlayer[];
  teamName: string;
  showTitle?: boolean;
  maxPlayers?: number;
}

export const RosterPreview = ({ players, teamName, showTitle = true, maxPlayers = 6 }: RosterPreviewProps) => {
  const displayPlayers = players.slice(0, maxPlayers);
  const remainingCount = players.length - maxPlayers;

  if (players.length === 0) {
    return (
      <div className="roster-preview">
        <div className="roster-empty">No roster data available</div>
      </div>
    );
  }

  const getPlayerClass = (player: ProcessedPlayer) => {
    let className = 'roster-player';
    if (player.isInjured) {
      className += ' injured';
    }
    if (player.position === 'QB') {
      className += ' qb';
    } else if (['RB', 'WR', 'TE'].includes(player.position)) {
      className += ' skill-position';
    }
    return className;
  };

  return (
    <div className="roster-preview">
      {showTitle && (
        <div className="roster-title">{teamName} Starting Lineup</div>
      )}
      
      <div className="roster-players">
        {displayPlayers.map((player) => (
          <div key={player.id} className={getPlayerClass(player)}>
            <div className="player-position">{player.lineupSlot}</div>
            <div className="player-info">
              <div className="player-name">{player.name}</div>
              {player.isInjured && (
                <div className="injury-indicator">{player.injuryStatus}</div>
              )}
            </div>
          </div>
        ))}
        
        {remainingCount > 0 && (
          <div className="roster-more">
            +{remainingCount} more
          </div>
        )}
      </div>
    </div>
  );
};