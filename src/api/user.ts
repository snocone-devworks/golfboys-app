import { Api } from ".";
import { Roster } from "../types/Roster";
import { Standing, StandingOverall } from "../types/Standing";
import { User } from "../types/User"
import { get } from "./helpers";
import { leagueApi } from "./league";

export type UserApi = {
  byId(userId: string | undefined): Promise<User>;
  byName(userName: string | undefined): Promise<User>;
  rosterByYear(userId: string, year: number): Promise<Roster>;
  standingByYear(userId: string, year: number): Promise<Standing>;
  standingOverall(userId: string): Promise<StandingOverall>;
}

export const userApi: UserApi = {
  byId: async function(userId: string | undefined): Promise<User> {
    try {
      if (!userId) return Promise.reject('No value provided');
      let returnValue = await get<User>(`/user/${userId}`);
      return Promise.resolve(returnValue);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  byName: async function(userName: string | undefined): Promise<User> {
    try {
      if (!userName) return Promise.reject('No value provided');
      let returnValue = await get<User>(`/user/${userName}`);
      return Promise.resolve(returnValue);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  rosterByYear: async function (userId: string, year: number): Promise<Roster>{
    try {
      let allRosters = await leagueApi.rostersByYear(year);
      let userRoster = allRosters.find(r => r.owner_id === userId);
      if (!userRoster) return Promise.reject('Could not find roster for user');
      return Promise.resolve(userRoster);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  standingByYear: async function (userId: string, year: number): Promise<Standing>{
    try {
      let allStats = await leagueApi.standingsByYear(year);
      let userStats = allStats.find(s => s.userId === userId);
      if (!userStats) return Promise.reject('Could not find stats for user');
      return Promise.resolve(userStats);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  standingOverall: async function(userId: string): Promise<StandingOverall>{
    try {
      let allStats = await leagueApi.standingsOverall();
      let userStats = allStats.find(s => s.userId === userId);
      if (!userStats) return Promise.reject('Could not find stats for user');
      return Promise.resolve(userStats);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

