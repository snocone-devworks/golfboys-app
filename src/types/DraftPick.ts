import { DraftPickMetadata } from "./DraftPickMetadata";

export type DraftPick = {
  draft_id?: string;
  draft_slot?: number;
  is_keeper?: string;
  metadata?: DraftPickMetadata; 
  pick_no?: number;
  picked_by?: string;
  player_id?: string;
  roster_id?: number;
  rond?: number;
}