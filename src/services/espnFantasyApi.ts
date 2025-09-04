// ESPN Fantasy Football API Service

const ESPN_API_BASE = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl';
const LEAGUE_ID = '325346816';
const SEASON = '2025';

export interface ESPNPlayer {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  defaultPositionId: number;
  eligibleSlots: number[];
  proTeamId: number;
  injured: boolean;
  injuryStatus: string;
}

export interface ESPNRosterEntry {
  playerId: number;
  lineupSlotId: number;
  acquisitionType: string;
  playerPoolEntry: {
    player: ESPNPlayer;
  };
}

export interface ESPNRoster {
  entries: ESPNRosterEntry[];
}

export interface ESPNTeam {
  id: number;
  abbrev: string;
  name: string;
  location: string;
  nickname: string;
  owners: string[]; // Array of owner IDs, not objects
  record: {
    overall: {
      wins: number;
      losses: number;
      ties: number;
      pointsFor: number;
      pointsAgainst: number;
    };
  };
  roster?: ESPNRoster;
}

export interface ESPNMatchup {
  id: number;
  matchupPeriodId: number;
  home: {
    teamId: number;
    totalPoints: number;
  };
  away: {
    teamId: number;
    totalPoints: number;
  };
  winner?: 'HOME' | 'AWAY' | 'UNDECIDED';
}

export interface ESPNMember {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
}

export interface ESPNLeague {
  id: number;
  scoringPeriodId: number;
  status: {
    currentMatchupPeriod: number;
    isActive: boolean;
  };
  teams: ESPNTeam[];
  schedule?: ESPNMatchup[];
  members?: ESPNMember[];
}


// ESPN Position ID mappings
export const ESPN_POSITION_MAP: Record<number, string> = {
  0: 'QB',
  1: 'TQB', 
  2: 'RB',
  3: 'RB/WR',
  4: 'WR',
  5: 'WR/TE',
  6: 'TE',
  7: 'OP',
  8: 'DT',
  9: 'DE',
  10: 'LB',
  11: 'DL',
  12: 'CB',
  13: 'S',
  14: 'DB',
  15: 'DP',
  16: 'D/ST',
  17: 'K',
  18: 'P',
  19: 'HC',
  20: 'BE',
  21: 'IR',
  22: 'FA',
  23: 'FLEX'
};

// Lineup slot mappings (different from position IDs)
export const ESPN_LINEUP_SLOT_MAP: Record<number, string> = {
  0: 'QB',
  2: 'RB', 
  4: 'WR',
  6: 'TE',
  16: 'D/ST',
  17: 'K',
  20: 'BE', // Bench
  21: 'IR', // Injured Reserve
  23: 'FLEX'
};

export interface ProcessedPlayer {
  id: number;
  name: string;
  position: string;
  lineupSlot: string;
  isStarter: boolean;
  isInjured: boolean;
  injuryStatus: string;
  proTeamId: number;
}

class ESPNFantasyAPIService {
  private buildUrl(view?: string[]): string {
    const baseUrl = `${ESPN_API_BASE}/seasons/${SEASON}/segments/0/leagues/${LEAGUE_ID}`;
    if (view && view.length > 0) {
      const viewParams = view.map(v => `view=${v}`).join('&');
      return `${baseUrl}?${viewParams}`;
    }
    return baseUrl;
  }

  async fetchWithCORS<T>(url: string): Promise<T> {
    try {
      // First try direct fetch (works in some environments)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // If CORS fails, we'll need to use a proxy or handle client-side
      console.warn('Direct API call failed, CORS may be blocking:', error);
      throw new Error('Unable to fetch ESPN data. CORS policy may be blocking the request.');
    }
  }

  async getLeagueInfo(): Promise<ESPNLeague> {
    const url = this.buildUrl(['mTeam']);
    return this.fetchWithCORS<ESPNLeague>(url);
  }

  async getTeamsWithRosters(): Promise<ESPNTeam[]> {
    const url = this.buildUrl(['mTeam', 'mRoster']);
    const league = await this.fetchWithCORS<ESPNLeague>(url);
    return league.teams;
  }

  async getMatchups(week?: number): Promise<ESPNMatchup[]> {
    const views = ['mMatchup', 'mTeam'];
    const url = week 
      ? `${this.buildUrl(views)}&scoringPeriodId=${week}`
      : this.buildUrl(views);
    
    const league = await this.fetchWithCORS<ESPNLeague>(url);
    return league.schedule || [];
  }

  async getCurrentWeek(): Promise<number> {
    const league = await this.getLeagueInfo();
    return league.status.currentMatchupPeriod;
  }

  async getTeamStandings(): Promise<ESPNTeam[]> {
    // Get both teams and league members for proper owner mapping
    const url = this.buildUrl(['mTeam', 'mRoster']);
    const league = await this.fetchWithCORS<ESPNLeague>(url);
    
    // Store members for owner mapping
    this.leagueMembers = league.members || [];
    
    // Sort by wins, then by points for
    return league.teams.sort((a, b) => {
      const aRecord = a.record.overall;
      const bRecord = b.record.overall;
      
      if (aRecord.wins !== bRecord.wins) {
        return bRecord.wins - aRecord.wins;
      }
      
      return bRecord.pointsFor - aRecord.pointsFor;
    });
  }

  // Store league members for owner mapping
  private leagueMembers: ESPNMember[] = [];

  // Process roster entries into a more usable format
  processRoster(roster: ESPNRoster): ProcessedPlayer[] {
    if (!roster?.entries) return [];

    return roster.entries.map(entry => {
      const player = entry.playerPoolEntry.player;
      const lineupSlot = ESPN_LINEUP_SLOT_MAP[entry.lineupSlotId] || 'BE';
      const position = ESPN_POSITION_MAP[player.defaultPositionId] || 'Unknown';
      
      return {
        id: player.id,
        name: player.fullName,
        position,
        lineupSlot,
        isStarter: entry.lineupSlotId !== 20 && entry.lineupSlotId !== 21, // Not bench or IR
        isInjured: player.injured,
        injuryStatus: player.injuryStatus,
        proTeamId: player.proTeamId,
      };
    });
  }

  // Get starting lineup for a team
  getStartingLineup(roster: ESPNRoster): ProcessedPlayer[] {
    return this.processRoster(roster).filter(player => player.isStarter);
  }

  // Get bench players for a team
  getBenchPlayers(roster: ESPNRoster): ProcessedPlayer[] {
    return this.processRoster(roster).filter(player => !player.isStarter);
  }

  // Helper method to map ESPN team to our Team interface
  mapESPNTeamToLocal(espnTeam: ESPNTeam): {
    teamName: string;
    managerName: string;
    wins: number;
    losses: number;
    ties: number;
    pointsFor: number;
    pointsAgainst: number;
  } {
    const record = espnTeam.record.overall;
    
    // ESPN team name is in the 'name' field, not location + nickname
    let teamName = espnTeam.name;
    if (!teamName && espnTeam.location && espnTeam.nickname) {
      teamName = `${espnTeam.location} ${espnTeam.nickname}`;
    } else if (!teamName) {
      teamName = `Team ${espnTeam.id}`;
    }
    
    // Map owner ID to actual member name
    let ownerName = 'Team Manager';
    if (espnTeam.owners && espnTeam.owners.length > 0) {
      const ownerId = espnTeam.owners[0];
      const member = this.leagueMembers.find(m => m.id === ownerId);
      if (member) {
        ownerName = member.displayName || `${member.firstName} ${member.lastName}`;
      }
    }

    return {
      teamName,
      managerName: ownerName,
      wins: record.wins,
      losses: record.losses,
      ties: record.ties,
      pointsFor: Math.round(record.pointsFor * 100) / 100,
      pointsAgainst: Math.round(record.pointsAgainst * 100) / 100,
    };
  }
}

export const espnApi = new ESPNFantasyAPIService();