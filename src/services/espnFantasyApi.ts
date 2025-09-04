// ESPN Fantasy Football API Service

const ESPN_API_BASE = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl';
const LEAGUE_ID = '325346816';
const SEASON = '2025';

export interface ESPNTeam {
  id: number;
  abbrev: string;
  name: string;
  location: string;
  nickname: string;
  owners: Array<{
    displayName: string;
    firstName: string;
    lastName: string;
  }>;
  record: {
    overall: {
      wins: number;
      losses: number;
      ties: number;
      pointsFor: number;
      pointsAgainst: number;
    };
  };
  roster?: {
    entries: Array<{
      playerId: number;
      lineupSlotId: number;
      playerPoolEntry: {
        player: {
          fullName: string;
          defaultPositionId: number;
        };
      };
    }>;
  };
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

export interface ESPNLeague {
  id: number;
  scoringPeriodId: number;
  status: {
    currentMatchupPeriod: number;
    isActive: boolean;
  };
  teams: ESPNTeam[];
  schedule?: ESPNMatchup[];
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
    const teams = await this.getTeamsWithRosters();
    
    // Sort by wins, then by points for
    return teams.sort((a, b) => {
      const aRecord = a.record.overall;
      const bRecord = b.record.overall;
      
      if (aRecord.wins !== bRecord.wins) {
        return bRecord.wins - aRecord.wins;
      }
      
      return bRecord.pointsFor - aRecord.pointsFor;
    });
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
    const ownerName = espnTeam.owners[0]?.displayName || 
                     `${espnTeam.owners[0]?.firstName} ${espnTeam.owners[0]?.lastName}` ||
                     'Unknown Owner';

    return {
      teamName: `${espnTeam.location} ${espnTeam.nickname}`,
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