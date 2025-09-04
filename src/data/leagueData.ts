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

export interface Game {
  id: string;
  week: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isCompleted: boolean;
}

export interface WeekSchedule {
  week: number;
  games: Game[];
}

export const scheduleData: WeekSchedule[] = [
  {
    week: 1,
    games: [
      { id: '1-1', week: 1, homeTeam: 'Landshark', awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '1-2', week: 1, homeTeam: "Hurts So Good", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '1-3', week: 1, homeTeam: "aaron's Astounding Team", awayTeam: "The Mixon Administration", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '1-4', week: 1, homeTeam: "Derek's Daring Team", awayTeam: "Triple Threat", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 2,
    games: [
      { id: '2-1', week: 2, homeTeam: "Triple Threat", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '2-2', week: 2, homeTeam: "The Mixon Administration", awayTeam: "Hurts So Good", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '2-3', week: 2, homeTeam: "Derek's Daring Team", awayTeam: "aaron's Astounding Team", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '2-4', week: 2, homeTeam: "Landshark", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 3,
    games: [
      { id: '3-1', week: 3, homeTeam: "Derek's Daring Team", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '3-2', week: 3, homeTeam: "Landshark", awayTeam: "The Mixon Administration", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '3-3', week: 3, homeTeam: "Hurts So Good", awayTeam: "aaron's Astounding Team", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '3-4', week: 3, homeTeam: "Triple Threat", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 4,
    games: [
      { id: '4-1', week: 4, homeTeam: "aaron's Astounding Team", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '4-2', week: 4, homeTeam: "Landshark", awayTeam: "Hurts So Good", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '4-3', week: 4, homeTeam: "Derek's Daring Team", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '4-4', week: 4, homeTeam: "Triple Threat", awayTeam: "The Mixon Administration", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 5,
    games: [
      { id: '5-1', week: 5, homeTeam: "Who's winning the match? Grok", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '5-2', week: 5, homeTeam: "aaron's Astounding Team", awayTeam: "Landshark", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '5-3', week: 5, homeTeam: "Triple Threat", awayTeam: "Hurts So Good", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '5-4', week: 5, homeTeam: "The Mixon Administration", awayTeam: "Derek's Daring Team", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 6,
    games: [
      { id: '6-1', week: 6, homeTeam: "The Mixon Administration", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '6-2', week: 6, homeTeam: "Landshark", awayTeam: "Triple Threat", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '6-3', week: 6, homeTeam: "Hurts So Good", awayTeam: "Derek's Daring Team", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '6-4', week: 6, homeTeam: "aaron's Astounding Team", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 7,
    games: [
      { id: '7-1', week: 7, homeTeam: "Hurts So Good", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '7-2', week: 7, homeTeam: "Landshark", awayTeam: "Derek's Daring Team", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '7-3', week: 7, homeTeam: "aaron's Astounding Team", awayTeam: "Triple Threat", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '7-4', week: 7, homeTeam: "The Mixon Administration", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 8,
    games: [
      { id: '8-1', week: 8, homeTeam: "Landshark", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '8-2', week: 8, homeTeam: "Who's winning the match? Grok", awayTeam: "Hurts So Good", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '8-3', week: 8, homeTeam: "aaron's Astounding Team", awayTeam: "The Mixon Administration", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '8-4', week: 8, homeTeam: "Derek's Daring Team", awayTeam: "Triple Threat", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 9,
    games: [
      { id: '9-1', week: 9, homeTeam: "Triple Threat", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '9-2', week: 9, homeTeam: "Landshark", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '9-3', week: 9, homeTeam: "Hurts So Good", awayTeam: "The Mixon Administration", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '9-4', week: 9, homeTeam: "Derek's Daring Team", awayTeam: "aaron's Astounding Team", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 10,
    games: [
      { id: '10-1', week: 10, homeTeam: "Derek's Daring Team", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '10-2', week: 10, homeTeam: "The Mixon Administration", awayTeam: "Landshark", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '10-3', week: 10, homeTeam: "Hurts So Good", awayTeam: "aaron's Astounding Team", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '10-4', week: 10, homeTeam: "Triple Threat", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 11,
    games: [
      { id: '11-1', week: 11, homeTeam: "aaron's Astounding Team", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '11-2', week: 11, homeTeam: "Landshark", awayTeam: "Hurts So Good", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '11-3', week: 11, homeTeam: "Derek's Daring Team", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '11-4', week: 11, homeTeam: "The Mixon Administration", awayTeam: "Triple Threat", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 12,
    games: [
      { id: '12-1', week: 12, homeTeam: "Who's winning the match? Grok", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '12-2', week: 12, homeTeam: "aaron's Astounding Team", awayTeam: "Landshark", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '12-3', week: 12, homeTeam: "Hurts So Good", awayTeam: "Triple Threat", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '12-4', week: 12, homeTeam: "The Mixon Administration", awayTeam: "Derek's Daring Team", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  },
  {
    week: 13,
    games: [
      { id: '13-1', week: 13, homeTeam: "The Mixon Administration", awayTeam: "Gemini's Claude", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '13-2', week: 13, homeTeam: "Triple Threat", awayTeam: "Landshark", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '13-3', week: 13, homeTeam: "Derek's Daring Team", awayTeam: "Hurts So Good", homeScore: 0, awayScore: 0, isCompleted: false },
      { id: '13-4', week: 13, homeTeam: "aaron's Astounding Team", awayTeam: "Who's winning the match? Grok", homeScore: 0, awayScore: 0, isCompleted: false },
    ]
  }
];

export const leagueInfo = {
  name: 'The League That Matters Most',
  established: 2025,
  espnLeagueId: '325346816',
  currentSeason: 2025,
  totalTeams: 8,
};