import { RosterMetadata } from "./RosterMetadata";
import { RosterSettings } from "./RosterSettings";

export type Roster = {
  league_id?: string;
  metadata?: RosterMetadata,
  owner_id?: string;
  players?: string[];
  reserve?: string[];
  roster_id?: number;
  settings?: RosterSettings;
  starters?: string[];
  taxi?: string;
}