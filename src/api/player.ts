export type PlayerApi = {
  loadAll(): Promise<void>;
}

export const playerApi: PlayerApi = {
  loadAll: async function(){
    try {
      throw new Error('Not implemeted yet');
    } catch (error) {
      return Promise.reject(error);
    }
  }
};