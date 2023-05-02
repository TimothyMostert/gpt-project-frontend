import { defineStore } from 'pinia'

export const useLoaderStore = defineStore({
  id: 'loader',
  state: () => ({
    loaderIsActive: false,
    itineraryLoaderIsActive: false,
    mainPromptIsActive: true,
  }),
  getters: {

  },
  actions: {
    setLoader(bool) {
      this.loaderIsActive = bool;
    }
  }
})
