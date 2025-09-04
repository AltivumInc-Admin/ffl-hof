// NFL Team Service - Maps ESPN Pro Team IDs to team information and game locations

export interface NFLTeam {
  id: number;
  name: string;
  abbreviation: string;
  city: string;
  stadium: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

// ESPN Pro Team ID mapping to NFL teams
export const NFL_TEAMS: Record<number, NFLTeam> = {
  1: { id: 1, name: 'Falcons', abbreviation: 'ATL', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', coordinates: { lat: 33.7554, lon: -84.4006 } },
  2: { id: 2, name: 'Bills', abbreviation: 'BUF', city: 'Buffalo', stadium: 'Highmark Stadium', coordinates: { lat: 42.7738, lon: -78.7867 } },
  3: { id: 3, name: 'Bears', abbreviation: 'CHI', city: 'Chicago', stadium: 'Soldier Field', coordinates: { lat: 41.8623, lon: -87.6167 } },
  4: { id: 4, name: 'Bengals', abbreviation: 'CIN', city: 'Cincinnati', stadium: 'Paycor Stadium', coordinates: { lat: 39.0955, lon: -84.5160 } },
  5: { id: 5, name: 'Browns', abbreviation: 'CLE', city: 'Cleveland', stadium: 'Cleveland Browns Stadium', coordinates: { lat: 41.5061, lon: -81.6995 } },
  6: { id: 6, name: 'Cowboys', abbreviation: 'DAL', city: 'Arlington', stadium: 'AT&T Stadium', coordinates: { lat: 32.7473, lon: -97.0945 } },
  7: { id: 7, name: 'Broncos', abbreviation: 'DEN', city: 'Denver', stadium: 'Empower Field at Mile High', coordinates: { lat: 39.7439, lon: -105.0201 } },
  8: { id: 8, name: 'Lions', abbreviation: 'DET', city: 'Detroit', stadium: 'Ford Field', coordinates: { lat: 42.3400, lon: -83.0456 } },
  9: { id: 9, name: 'Packers', abbreviation: 'GB', city: 'Green Bay', stadium: 'Lambeau Field', coordinates: { lat: 44.5013, lon: -88.0622 } },
  10: { id: 10, name: 'Titans', abbreviation: 'TEN', city: 'Nashville', stadium: 'Nissan Stadium', coordinates: { lat: 36.1665, lon: -86.7713 } },
  11: { id: 11, name: 'Colts', abbreviation: 'IND', city: 'Indianapolis', stadium: 'Lucas Oil Stadium', coordinates: { lat: 39.7601, lon: -86.1639 } },
  12: { id: 12, name: 'Chiefs', abbreviation: 'KC', city: 'Kansas City', stadium: 'GEHA Field at Arrowhead Stadium', coordinates: { lat: 39.0489, lon: -94.4839 } },
  13: { id: 13, name: 'Raiders', abbreviation: 'LV', city: 'Las Vegas', stadium: 'Allegiant Stadium', coordinates: { lat: 36.0909, lon: -115.1836 } },
  14: { id: 14, name: 'Rams', abbreviation: 'LAR', city: 'Los Angeles', stadium: 'SoFi Stadium', coordinates: { lat: 33.9535, lon: -118.3392 } },
  15: { id: 15, name: 'Dolphins', abbreviation: 'MIA', city: 'Miami Gardens', stadium: 'Hard Rock Stadium', coordinates: { lat: 25.9580, lon: -80.2389 } },
  16: { id: 16, name: 'Vikings', abbreviation: 'MIN', city: 'Minneapolis', stadium: 'U.S. Bank Stadium', coordinates: { lat: 44.9738, lon: -93.2583 } },
  17: { id: 17, name: 'Patriots', abbreviation: 'NE', city: 'Foxborough', stadium: 'Gillette Stadium', coordinates: { lat: 42.0909, lon: -71.2643 } },
  18: { id: 18, name: 'Saints', abbreviation: 'NO', city: 'New Orleans', stadium: 'Caesars Superdome', coordinates: { lat: 29.9511, lon: -90.0812 } },
  19: { id: 19, name: 'Giants', abbreviation: 'NYG', city: 'East Rutherford', stadium: 'MetLife Stadium', coordinates: { lat: 40.8135, lon: -74.0745 } },
  20: { id: 20, name: 'Jets', abbreviation: 'NYJ', city: 'East Rutherford', stadium: 'MetLife Stadium', coordinates: { lat: 40.8135, lon: -74.0745 } },
  21: { id: 21, name: 'Eagles', abbreviation: 'PHI', city: 'Philadelphia', stadium: 'Lincoln Financial Field', coordinates: { lat: 39.9008, lon: -75.1675 } },
  22: { id: 22, name: 'Cardinals', abbreviation: 'ARI', city: 'Glendale', stadium: 'State Farm Stadium', coordinates: { lat: 33.5276, lon: -112.2626 } },
  23: { id: 23, name: 'Steelers', abbreviation: 'PIT', city: 'Pittsburgh', stadium: 'Acrisure Stadium', coordinates: { lat: 40.4468, lon: -80.0158 } },
  24: { id: 24, name: 'Chargers', abbreviation: 'LAC', city: 'Los Angeles', stadium: 'SoFi Stadium', coordinates: { lat: 33.9535, lon: -118.3392 } },
  25: { id: 25, name: '49ers', abbreviation: 'SF', city: 'Santa Clara', stadium: "Levi's Stadium", coordinates: { lat: 37.4030, lon: -121.9698 } },
  26: { id: 26, name: 'Seahawks', abbreviation: 'SEA', city: 'Seattle', stadium: 'Lumen Field', coordinates: { lat: 47.5952, lon: -122.3316 } },
  27: { id: 27, name: 'Buccaneers', abbreviation: 'TB', city: 'Tampa', stadium: 'Raymond James Stadium', coordinates: { lat: 27.9759, lon: -82.5033 } },
  28: { id: 28, name: 'Redskins', abbreviation: 'WAS', city: 'Landover', stadium: 'FedExField', coordinates: { lat: 38.9076, lon: -76.8645 } },
  29: { id: 29, name: 'Panthers', abbreviation: 'CAR', city: 'Charlotte', stadium: 'Bank of America Stadium', coordinates: { lat: 35.2258, lon: -80.8528 } },
  30: { id: 30, name: 'Jaguars', abbreviation: 'JAX', city: 'Jacksonville', stadium: 'TIAA Bank Field', coordinates: { lat: 29.9373, lon: -81.6378 } },
  33: { id: 33, name: 'Ravens', abbreviation: 'BAL', city: 'Baltimore', stadium: 'M&T Bank Stadium', coordinates: { lat: 39.2780, lon: -76.6227 } },
  34: { id: 34, name: 'Texans', abbreviation: 'HOU', city: 'Houston', stadium: 'NRG Stadium', coordinates: { lat: 29.6847, lon: -95.4107 } }
};

// Get NFL team by ESPN Pro Team ID
export function getNFLTeam(proTeamId: number): NFLTeam | null {
  return NFL_TEAMS[proTeamId] || null;
}

// Get team full display name
export function getNFLTeamDisplayName(proTeamId: number): string {
  const team = getNFLTeam(proTeamId);
  return team ? `${team.city} ${team.name}` : 'Unknown Team';
}

// Check if team is playing at home this week (simplified for now)
export function isTeamPlayingHome(proTeamId: number, week: number): boolean {
  // This is a simplified implementation
  // In a real app, you'd fetch current week's schedule
  // For now, return alternating home/away based on week + team id
  return (week + proTeamId) % 2 === 0;
}

// Get weather location for a team's game
export function getGameLocation(proTeamId: number, week: number): { city: string; stadium: string; coordinates: { lat: number; lon: number }; isHome: boolean } | null {
  const team = getNFLTeam(proTeamId);
  if (!team) return null;
  
  const isHome = isTeamPlayingHome(proTeamId, week);
  
  // For away games, we'd need the opponent's location
  // For now, simplified to just return team's home stadium
  return {
    city: team.city,
    stadium: team.stadium,
    coordinates: team.coordinates,
    isHome
  };
}