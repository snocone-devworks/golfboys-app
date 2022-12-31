import { PlayoffMatchup } from "../types/PlayoffMatchup";
import { Roster } from "../types/Roster"
import { Standing, StandingOverall } from "../types/Standing";
import { User } from "../types/User";
import { YearStats } from "../types/YearStats";
import { averageArray, combinedPoints, get, maxArray, rankByNumber, streak, sumArray } from "./helpers";
import { userApi } from "./user";

export type LeagueApi = {
  leagueIds: Array<{ year: number, value: string }>;
  leagueIdByYear(year: number): string | undefined;
  playoffsLosersBracketByYear(year: number): Promise<PlayoffMatchup[]>;
  playoffsWinnersBracketByYear(year: number): Promise<PlayoffMatchup[]>;
  rostersByYear(year: number): Promise<Roster[]>;
  standingsByYear(year: number): Promise<Standing[]>;
  standingsOverall(): Promise<StandingOverall[]>;
}

export const leagueApi: LeagueApi = {
  leagueIds: [
    { year: 2019, value: '421353572760817664' },
    { year: 2020, value: '543470783403184128' },
    { year: 2021, value: '730896338383912960' },
    { year: 2022, value: '809267835644776448' }
  ],
  leagueIdByYear: function(year: number) {
    let leagueId = this.leagueIds.find(l => l.year === year);
    if (!leagueId) return undefined;
    return leagueId.value;
  },
  playoffsLosersBracketByYear: async function(year: number){
    try {
      let leagueId = this.leagueIdByYear(year);
      if (!leagueId) return Promise.reject('Could not find year');
      let bracket = await get<PlayoffMatchup[]>(`/league/${leagueId}/losers_bracket`);
      return Promise.resolve(bracket);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  playoffsWinnersBracketByYear: async function(year: number){
    try {
      let leagueId = this.leagueIdByYear(year);
      if (!leagueId) return Promise.reject('Could not find year');
      let bracket = await get<PlayoffMatchup[]>(`/league/${leagueId}/winners_bracket`);
      return Promise.resolve(bracket);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  rostersByYear: async function(year: number) {
    try {
      let leagueId = this.leagueIdByYear(year);
      if (!leagueId) return Promise.reject('Could not find year');
      let returnValue = await get<Roster[]>(`/league/${leagueId}/rosters`);
      return Promise.resolve(returnValue);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  standingsByYear: async function(year: number): Promise<Standing[]> {
    try {
      let rosters = await this.rostersByYear(year);
      let leagueId = this.leagueIdByYear(year);
      if (!leagueId) return Promise.reject('Could not find year');

      let returnValue: Standing[] = [];

      for (let i = 0; i < rosters.length; i++) {
        let user: User | undefined = undefined;
        
        if (rosters[i].owner_id) {
          user = await userApi.byId(rosters[i].owner_id);
        }

        let stats: YearStats = {
          wins: rosters[i].settings?.wins ?? 0,
          losses: rosters[i].settings?.losses ?? 0,
          points: combinedPoints(rosters[i].settings?.fpts, rosters[i].settings?.fpts_decimal),
          maxPoints: combinedPoints(rosters[i].settings?.ppts, rosters[i].settings?.ppts_decimal),
          pointsAgainst: combinedPoints(rosters[i].settings?.fpts_against, rosters[i].settings?.fpts_against_decimal),
          longestLosingStreak: streak(rosters[i].metadata?.record, 'losses'),
          longestWinningStreak: streak(rosters[i].metadata?.record, 'wins')
        }

        returnValue.push({
          userAvatar: user?.avatar,
          userId: rosters[i].owner_id,
          userName: user?.display_name,
          rosterId: rosters[i].roster_id,
          positionFinal: 0,
          positionRegular: 0,
          efficiency: 0,
          efficiencyRank: 0,
          stats: stats
        });
      }

      returnValue.sort((a, b) => {
        if (a.stats.wins < b.stats.wins) return 1;
        if (a.stats.wins > b.stats.wins) return -1;
        if (a.stats.points < b.stats.points) return 1;
        if (a.stats.points > b.stats.points) return -1;
        return 0;
      });

      returnValue = returnValue.map((value, index) => ({
        ...value, 
        positionRegular: index + 1, 
        positionFinal: index + 1,
        efficiency: efficiencyByYear(value.positionRegular, value.stats.points, value.stats.maxPoints),
      }));

      returnValue = returnValue.map(value => ({
        ...value,
        efficiencyRank: rankByNumber(value.efficiency, returnValue.map(v => v.efficiency))
      }))

      let winnersBracket = await this.playoffsWinnersBracketByYear(year);
      
      winnersBracket.filter(match => match.w && match.l && match.p);

      winnersBracket.forEach(match => {
        let loserIndex = returnValue.findIndex(r => r.rosterId === match.l);
        let winnerIndex = returnValue.findIndex(r => r.rosterId === match.w);

        if (loserIndex > -1) {
          returnValue[loserIndex].positionFinal = match.p! + 1;
        }

        if (winnerIndex > -1) {
          returnValue[winnerIndex].positionFinal = match.p!;
        }
      });

      let losersBracket = await this.playoffsLosersBracketByYear(year);
      
      losersBracket.filter(match => match.w && match.l && match.p);

      losersBracket.forEach(match => {
        let loserIndex = returnValue.findIndex(r => r.rosterId === match.w);
        let winnerIndex = returnValue.findIndex(r => r.rosterId === match.l);

        if (loserIndex > -1) {
          returnValue[loserIndex].positionFinal = match.p! === 1 ? 10 : 8
        }

        if (winnerIndex > -1) {
          returnValue[winnerIndex].positionFinal = match.p! === 1 ? 9 : 7;
        }
      });

      return Promise.resolve(returnValue);
    } catch (error) {
      console.debug(error);
      return Promise.reject(error);
    }
  },
  standingsOverall: async function() {
    try {
      let allStandings: Standing[] = [];

      for (let i = 0; i < this.leagueIds.length; i++) {
        let yearStandings = await this.standingsByYear(this.leagueIds[i].year);
        allStandings.push(...yearStandings);
      }
  
      let uniqueUserIds: string[] = [];
  
      allStandings.forEach(standing => {
        if (!uniqueUserIds.includes(standing.userId ?? '') && standing.userId) {
          uniqueUserIds.push(standing.userId);
        }
      });

      let returnValue: StandingOverall[] = [];


      uniqueUserIds.forEach(userId => {
        let userStandings = allStandings.filter(s => s.userId === userId);
        let avatar = userStandings.map(s => s.userAvatar).find(a => a !== undefined);
        let name = userStandings.map(s => s.userName).find(n => n !== undefined);

        if (userStandings.length > 0) {
          let stats: YearStats = {
            wins: sumArray(userStandings.map(s => s.stats.wins)),
            losses: sumArray(userStandings.map(s => s.stats.losses)),
            points: sumArray(userStandings.map(s => s.stats.points)),
            maxPoints: sumArray(userStandings.map(s => s.stats.maxPoints)),
            pointsAgainst: sumArray(userStandings.map(s => s.stats.pointsAgainst)),
            longestLosingStreak: maxArray(userStandings.map(s => s.stats.longestLosingStreak)),
            longestWinningStreak: maxArray(userStandings.map(s => s.stats.longestWinningStreak)),
          }
          returnValue.push({
            userAvatar: avatar,
            userId: userId,
            userName: name,
            rosterId: 0,
            stats: stats,
            efficiency: efficiencyOverall(userStandings.map(s => s.positionRegular), userStandings.map(s => s.stats.points), userStandings.map(s => s.stats.maxPoints)),
            efficiencyRank: 0,
            positionsFinal: userStandings.map(s => s.positionFinal),
            positionsFinalAverage: averageArray(userStandings.map(s => s.positionFinal)),
            positionsFinalRank: 0,
            positionsRegular: userStandings.map(s => s.positionRegular),
            positionsRegularAverage: averageArray(userStandings.map(s => s.positionRegular)),
            positionsRegularRank: 0,
            winPercent: winPercent(stats.wins, stats.losses)
          })
        }
      });

      returnValue = returnValue.map(value => ({
        ...value,
        efficiencyRank: rankByNumber(value.efficiency, returnValue.map(v => v.efficiency)),
        positionsRegularRank: rankByOverallWinPercent(value, returnValue),
        positionsFinalRank: rankByOverallPositionAverage(value, returnValue, 'final'),
        // positionsRegularRank: rankByOverallPositionAverage(value, returnValue, 'regular')

      }));

      return Promise.resolve(returnValue);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const efficiencyByYear = (position: number, points: number, maxPoints: number): number => {
  let multiplier = 10 - position;
  let maxMultiplier = points * (maxPoints / points);

  return points * maxMultiplier * multiplier;
}

const efficiencyOverall = (positions: number[], points: number[], maxPoints: number[]): number => {
  return efficiencyByYear(
    averageArray(positions),
    averageArray(points),
    averageArray(maxPoints)
  );
}

const rankByOverallPositionAverage = (value: StandingOverall, values: StandingOverall[], type: 'final' | 'regular'): number => {
  let sortedValues = [...values];

  sortedValues.sort((a, b) => {
    let valueA: number = type === 'regular' ? a.positionsRegularAverage : a.positionsFinalAverage;
    let valueB: number = type === 'regular' ? b.positionsRegularAverage : b.positionsFinalAverage;

    if (valueA < valueB) return -1;
    if (valueA > valueB) return 1;
    if (a.stats.wins > b.stats.wins) return -1;
    if (a.stats.wins < b.stats.wins) return 1;
    if (a.stats.points > b.stats.points) return -1;
    if (a.stats.points < b.stats.points) return 1;
    return 0;
  });

  let index: number = sortedValues.findIndex(v => v.userId === value.userId);
  return index === -1 ? values.length : index;
}

const rankByOverallWinPercent = (value: StandingOverall, values: StandingOverall[]): number => {
  let sortedValues = [...values];
  sortedValues.sort((a, b) => {
    let percentA: number = winPercent(a.stats.wins, a.stats.losses);
    let percentB: number = winPercent(b.stats.wins, b.stats.losses);

    if (percentA < percentB) return 1;
    if (percentA > percentB) return -1;

    let pointsA: number = a.stats.points;
    let pointsB: number = b.stats.points;
    if (pointsA < pointsB ) return 1;
    if (pointsA > pointsB) return -1;
    return 0
  });

  let index: number = sortedValues.findIndex(v => v.userId === value.userId);
  return index === -1 ? values.length : index;
}


const winPercent = (wins: number, losses: number): number => {
  if (wins === 0 || losses === 0) return 0;
  return wins / (wins + losses);
}