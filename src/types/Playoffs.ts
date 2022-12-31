import { Roster } from "./Roster";
import { User } from "./User";

export type Playoffs = {
  winner?: Roster;
  loser?: Roster;
  round: number;
  matchId: number;
  team1Roster: Roster;
  team2Roster: Roster;
  fromMatchId1: number;
  fromMatchId2: number;
  position: number;
}

export type PlayoffPosition = {
  userId?: string;
  userName?: string;
  rosterId?: number;
  positionFinal: number;
  positionRegular: number;
}

export type PlayoffResults = {
  winnersBracket: Playoffs[];
  losersBracket: Playoffs[];
  finalPositions: PlayoffPosition[];
}