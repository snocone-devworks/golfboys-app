export type Matchup = {
  custom_points?: null | any;
  matchup_id?: number;
  players?: string[];
  player_points?: Record<string | number, number>;
  starters?: string[];
  starters_points?: Record<string | number, number>;
}