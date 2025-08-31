export interface Team {
  rank: number;
  abbreviation: string;
  teamName: string;
  managerName: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
}

export const teams: Team[] = [
  {
    rank: 1,
    abbreviation: 'GC',
    teamName: "Gemini's Claude",
    managerName: 'Christian Perez',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 2,
    abbreviation: 'JST',
    teamName: "Jake's Scary Team",
    managerName: 'Jake Baumann',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 3,
    abbreviation: 'AAT',
    teamName: "Aaron's Astounding Team",
    managerName: 'Aaron Crudup',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 4,
    abbreviation: '👨🏻',
    teamName: 'The Mixon Administration',
    managerName: 'Andres Nanez',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 5,
    abbreviation: 'DDT',
    teamName: "Derek's Daring Team",
    managerName: 'Derek Escalante',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 6,
    abbreviation: 'LSK',
    teamName: 'Landshark',
    managerName: 'Charles Shrum',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 7,
    abbreviation: 'SCc',
    teamName: "Who's winning the match? Grok",
    managerName: 'Conor Clary',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
  {
    rank: 8,
    abbreviation: 'Tt',
    teamName: 'Triple Threat',
    managerName: 'Paloma Irizarry',
    wins: 0,
    losses: 0,
    ties: 0,
    pointsFor: 0,
    pointsAgainst: 0,
  },
];

export const leagueInfo = {
  name: 'The League That Matters Most',
  established: 2025,
  espnLeagueId: '325346816',
  currentSeason: 2025,
  totalTeams: 8,
};