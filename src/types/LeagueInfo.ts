import { LeagueSettings } from "./LeagueSettings";
import { ScoringSettings } from "./ScoringSettings";

export type LeagueInfo = {
  avatar?: string | null;
  bracket_id?: string | null;
  company_id?: string | null;
  draft_id?: string;
  group_id?: string;
  league_id?: string;
  name?: string;
  previous_league_id?: string | null;
  roster_positions?: string[];
  scoring_settings?: ScoringSettings;
  season?: string;
  season_type?: string;
  settings?: LeagueSettings;
  shard?: number;
  sport?: string;
  status?: string;
  total_rosters?: number;
}