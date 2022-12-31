export type Transaction = {
  adds?: Record<number | string, number>;
  consenter_ids?: number[];
  created?: number;
  creator?: string;
  draft_picks?: any[];
  drops?: Record<number | string, number>;
  leg?: number;
  metadata?: { notes?: string | null; } | null;
  roster_ids?: number[];
  settings?: { seq?: number, is_counter?: number };
  status?: string;
  status_updated?: number;
  transaction_id?: string;
  type?: string;
  waiver_budget?: number[];
}