export type PlayerInfo = {
  id: number;
  status?: string;
  fantasy_positions?: string;
  number?: number;
  position?: string;
  team?: string;
  last_name?: string;
  college?: string;
  injury_status?: string;
  player_id: number;
  first_name?: string;
  full_name: string;
  years_exp?: number;
}

export type PlayerInfoApi = {
  id: number;
  hashtag?: string;
  depth_chart_position?: number;
  status?: string;
  sport?: string;
  fantasy_positions?: string[];
  number?: number;
  search_last_name?: string;
  injury_start_date?: number;
  weight?: number;
  position?: string;
  practice_participation?: string;
  sportradar_id?: number;
  team?: string;
  last_name?: string;
  college?: string;
  fantasy_data_id?: number;
  injury_status?: string;
  player_id?: number;
  height?: string;
  search_full_name?: string;
  age?: number;
  stats_id?: string;
  birth_country?: string;
  espn_id?: string;
  search_rank?: number;
  first_name?: string;
  depth_chart_order?: number;
  years_exp?: number;
  rotowire_id?: number;
  rotoworld_id?: number;
  search_first_name?: string;
  yahoo_id?: number;
}

export const defaultPlayerInfo: PlayerInfo = {
  id: 0,
  status: '',
  fantasy_positions: '',
  number: 0,
  position: '',
  team: '',
  last_name: '',
  college: '',
  injury_status: '',
  player_id: 0,
  first_name: '',
  years_exp: 0,
  full_name: '',
}