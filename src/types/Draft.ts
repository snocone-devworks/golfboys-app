import { DraftSettings } from "./DraftSettings";

export type Draft = {
  created?: number;
  creators?: string[];
  draft_id?: string;
  draft_order?: Record<string | number, number>;
  league_id?: string;
  season?: string;
  season_type?: string;
  settings?: DraftSettings;
  slot_to_roster_id?: Record<string | number, number>;
  sport?: string;
  start_time?: number;
  status?: string;
  type?: string;
}