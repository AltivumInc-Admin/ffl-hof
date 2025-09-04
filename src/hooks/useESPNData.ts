import { useState, useEffect, useCallback } from 'react';
import { espnApi } from '../services/espnFantasyApi';
import type { ESPNTeam, ESPNMatchup } from '../services/espnFantasyApi';
import type { Team } from '../data/leagueData';

interface ESPNDataState {
  teams: Team[];
  matchups: ESPNMatchup[];
  currentWeek: number;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const TEAM_NAME_MAPPING: Record<string, string> = {
  "Gemini's Claude": "Gemini's Claude",
  "Hurts So Good": "Hurts So Good", 
  "aaron's Astounding Team": "aaron's Astounding Team",
  "The Mixon Administration": "The Mixon Administration",
  "Derek's Daring Team": "Derek's Daring Team",
  "Landshark": "Landshark",
  "Who's winning the match? Grok": "Who's winning the match? Grok",
  "Triple Threat": "Triple Threat"
};

export const useESPNData = (enableLiveData = true) => {
  const [state, setState] = useState<ESPNDataState>({
    teams: [],
    matchups: [],
    currentWeek: 1,
    isLoading: false,
    error: null,
    lastUpdated: null,
  });

  const mapESPNTeamsToLocal = useCallback((espnTeams: ESPNTeam[]): Team[] => {
    return espnTeams.map((espnTeam, index) => {
      const localData = espnApi.mapESPNTeamToLocal(espnTeam);
      
      // Try to match ESPN team name to our local team names
      const matchedTeamName = Object.keys(TEAM_NAME_MAPPING).find(localName => 
        localData.teamName.toLowerCase().includes(localName.toLowerCase().replace(/['']/g, '')) ||
        localName.toLowerCase().includes(localData.teamName.toLowerCase())
      );

      return {
        rank: index + 1,
        abbreviation: espnTeam.abbrev || espnTeam.name.substring(0, 3).toUpperCase(),
        teamName: matchedTeamName || localData.teamName,
        managerName: localData.managerName,
        wins: localData.wins,
        losses: localData.losses,
        ties: localData.ties,
        pointsFor: localData.pointsFor,
        pointsAgainst: localData.pointsAgainst,
      };
    });
  }, []);

  const fetchESPNData = useCallback(async () => {
    if (!enableLiveData) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Fetch teams and current week in parallel
      const [teams, currentWeek] = await Promise.all([
        espnApi.getTeamStandings(),
        espnApi.getCurrentWeek().catch(() => 1), // Fallback to week 1 if fails
      ]);

      // Fetch current week matchups
      const matchups = await espnApi.getMatchups(currentWeek).catch(() => []);

      const localTeams = mapESPNTeamsToLocal(teams);

      setState(prev => ({
        ...prev,
        teams: localTeams,
        matchups,
        currentWeek,
        isLoading: false,
        lastUpdated: new Date(),
      }));

    } catch (error) {
      console.warn('Failed to fetch ESPN data:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch ESPN data',
      }));
    }
  }, [enableLiveData, mapESPNTeamsToLocal]);

  const refreshData = useCallback(() => {
    fetchESPNData();
  }, [fetchESPNData]);

  // Initial data fetch
  useEffect(() => {
    fetchESPNData();
  }, [fetchESPNData]);

  // Auto-refresh every 5 minutes during active games
  useEffect(() => {
    if (!enableLiveData) return;

    const interval = setInterval(() => {
      const now = new Date();
      const isGameDay = now.getDay() === 0 || now.getDay() === 1 || now.getDay() === 4; // Sun, Mon, Thu
      
      if (isGameDay) {
        fetchESPNData();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [enableLiveData, fetchESPNData]);

  return {
    ...state,
    refreshData,
    hasData: state.teams.length > 0,
    isStale: state.lastUpdated ? Date.now() - state.lastUpdated.getTime() > 10 * 60 * 1000 : true, // 10 min
  };
};