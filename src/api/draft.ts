import { Draft } from "../types/Draft"
import { DraftPick } from "../types/DraftPick";
import { get } from "./helpers";

export type DraftApi = {
  byId(draftId: string): Promise<Draft>;
  picks(draftId: string): Promise<DraftPick[]>;
}

export const draftApi: DraftApi = {
  byId: async function(draftId: string){
    try {
      let returnValue: Draft = await get<Draft>(`/draft/${draftId}`);
      return Promise.resolve(returnValue);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  picks: async function(draftId: string){
    try {
      let returnValue: DraftPick[] = await get<DraftPick[]>(`/draft/${draftId}/picks`);
      return Promise.resolve(returnValue);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}