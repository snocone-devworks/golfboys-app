import { YearStats } from "./YearStats";

export type Standing = {
  userAvatar?: string;
  userId?: string;
  userName?: string;
  rosterId?: number;
  stats: YearStats;
  efficiency: number;
  efficiencyRank: number;
  positionFinal: number;
  positionRegular: number;
}

export type StandingOverall = {
  userAvatar?: string;
  userId?: string;
  userName?: string;
  rosterId?: number;
  stats: YearStats;
  efficiency: number;
  efficiencyRank: number;
  positionsFinal: number[];
  positionsFinalAverage: number;
  positionsFinalRank: number;
  positionsRegular: number[];
  positionsRegularAverage: number;
  positionsRegularRank: number;
  winPercent: number;
}