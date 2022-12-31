import { UserMetadata } from "./UserMetadata";

export type User = {
  avatar?: string;
  display_name?: string;
  is_bot?: boolean;
  is_owner?: boolean;
  league_id?: string;
  metadata?: UserMetadata;
  user_id?: string;
  username?: string | null | undefined;
}