import { Draft } from "../types/Draft";
import { DraftPick } from "../types/DraftPick";
import { LeagueInfo } from "../types/LeagueInfo";
import { Matchup } from "../types/Matchup";
import { PlayerInfo, PlayerInfoApi } from "../types/PlayerInfo";
import { PlayerStats } from "../types/PlayerStats";
import { PlayoffMatchup } from "../types/PlayoffMatchup";
import { Roster } from "../types/Roster";
import { Transaction } from "../types/Transaction";
import { User } from "../types/User";
import { draftApi, DraftApi } from "./draft";
import { leagueApi, LeagueApi } from "./league";
import { playerApi, PlayerApi } from "./player";
import { userApi, UserApi } from "./user";

const baseUrl: string = 'https://api.sleeper.app/v1';

export const leagueIDs: Array<{ year: number, value: string }> = [
  { year: 2019, value: '421353572760817664' },
  { year: 2020, value: '543470783403184128' },
  { year: 2021, value: '730896338383912960' },
  { year: 2022, value: '809267835644776448' }
];

const leagueIdByYear = (year: number): string => {
  return leagueIDs.find(l => l.year === year)?.value ?? '';
}

const get = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) {
      console.log();
      return Promise.reject(`${response.status}: ${response.statusText}`);
    }

    let body = await response.json();
    return Promise.resolve(body);
  } catch (error) {
    return Promise.reject(error);
  }
}

// type Api = {
//   leagueDraftById(draftId: string): Promise<Draft>;
//   leagueDraftPicks(draftId: string): Promise<DraftPick[]>;
//   leagueDrafts(year: number): Promise<Draft[]>;
//   leagueInfo(year: number): Promise<LeagueInfo>;
//   leagueManagers(year: number): Promise<User[]>;
//   leagueMatchups(year: number, week: number): Promise<Matchup[]>;
//   leaguePlayoffBracket(year: number, type: 'winner' | 'loser'): Promise<PlayoffMatchup[]>;
//   leagueRosters(year: number): Promise<Roster[]>;
//   leagueTransactions(year: number, week: number): Promise<Transaction[]>;
//   players(): Promise<PlayerInfo[]>;
//   stats(year: number, week: number): Promise<PlayerStats[]>;
//   userById(userId: string): Promise<User>;
//   userByName(userName: string): Promise<User>;
//   userDrafts(userId: string, year: number): Promise<any>;
//   userLeagues(userId: string, year: number): Promise<LeagueInfo[]>;
// }

export type Api = {
  draft: DraftApi;
  league: LeagueApi;
  player: PlayerApi;
  user: UserApi;
}

export const api: Api = {
  draft: draftApi,
  league: leagueApi,
  player: playerApi,
  user: userApi,
}



// export const api: Api = {
//   leagueDraftById: async function(draftId: string): Promise<Draft> {
//     return get<Draft>(`/draft/${draftId}`);
//   },
//   leagueDraftPicks: async function(draftId: string): Promise<DraftPick[]> {
//     return get<DraftPick[]>(`/draft/${draftId}/picks`);
//   },
//   leagueDrafts: async function(year: number): Promise<Draft[]> {
//     return get<Draft[]>(`/league/${leagueIdByYear(year)}/drafts`);
//   },
//   leagueInfo: async function(year: number): Promise<LeagueInfo> {
//     return get<LeagueInfo>(`/league/${leagueIdByYear(year)}`);
//   },
//   leagueManagers: async function(year: number): Promise<User[]> {
//     return get<User[]>(`/league/${leagueIdByYear(year)}/users`);
//   },  
//   leagueMatchups: async function(year: number, week: number): Promise<Matchup[]> {
//     return get<Matchup[]>(`/league/${leagueIdByYear(year)}/matchups/${week}`);
//   },
//   leaguePlayoffBracket: async function(year: number, type: 'winner' | 'loser'): Promise<PlayoffMatchup[]> {
//     if (type === 'loser') {
//       return get<PlayoffMatchup[]>(`/league/${leagueIdByYear(year)}/loses_bracket`);
//     }

//     return get<PlayoffMatchup[]>(`/league/${leagueIdByYear(year)}/winners_bracket`);
//   },
//   leagueRosters: async function(year: number): Promise<Roster[]> {
//     return get<Roster[]>(`/league/${leagueIdByYear(year)}/rosters`);
//   },
//   leagueTransactions: async function(year: number, week: number): Promise<Transaction[]> {
//     return get<Transaction[]>(`/league/${leagueIdByYear(year)}/transactions/${week}`)
//   },
//   players: async function(): Promise<PlayerInfo[]> {
//     try {
//       let results = await get<Record<string | number, PlayerInfoApi>>(`/players/nfl`);
//       let returnValue: PlayerInfo[] = [];

//       Object.entries(results).forEach(([key, value]) => {
//         let pos = Array.isArray(value.fantasy_positions) ? value.fantasy_positions.join(',') : '';
//         let fullName: string = '';
//         if (value.first_name && value.last_name) {
//           fullName = `${value.first_name} ${value.last_name}`
//         } else if (value.first_name) {
//           fullName = value.first_name;
//         } else if (value.last_name) {
//           fullName = value.last_name;
//         }

//         if (Number.parseInt(key) !== Number.NaN) {
//           returnValue.push({
//             id: 0,
//             status: value.status,
//             fantasy_positions: pos,
//             number: value.number,
//             position: value.position,
//             team: value.team,
//             last_name: value.last_name,
//             college: value.college,
//             injury_status: value.injury_status,
//             player_id: Number(key),
//             first_name: value.first_name,
//             years_exp: value.years_exp,
//             full_name: fullName
//           });
//         }
//       });

//       return Promise.resolve(returnValue);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   stats: async function(year: number, week: number): Promise<PlayerStats[]> {
//     try {
//       let results = await get<Record<string | number, PlayerStats>>(`/stats/nfl/regular/${year}/${week}`);
//       let returnValue: PlayerStats[] = [];

//       Object.entries(results).forEach(([key, value]) => {
//         let thisValue: PlayerStats = {...value, sleeper_player_id: Number(key), playerId: 0}
//         returnValue.push(thisValue);
//       });

//       return Promise.resolve(returnValue);
//     } catch (error) {
//       return Promise.reject(error);
//     }
//   },
//   userById: async function(value: string): Promise<User> {
//     return get<User>(`/user/${value}`);
//   },
//   userByName: async function(value: string): Promise<User> {
//     return get<User>(`/user/${value}`);
//   },  
//   userDrafts: async function(userId: string, year: number): Promise<Draft[]> {
//     return get<Draft[]>(`/user/${userId}/drafts/nfl/${year}`);
//   },
//   userLeagues: async function(userId: string, year: number): Promise<LeagueInfo[]> {
//     return get<LeagueInfo[]>(`/user/${userId}/leagues/nfl/${year}`);
//   },
// }