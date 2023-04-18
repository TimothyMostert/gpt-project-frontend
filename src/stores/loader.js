import { defineStore } from 'pinia'

export const useLoaderStore = defineStore({
  id: 'loader',
  state: () => ({
    loaderIsActive: false,
    itineraryLoaderIsActive: false,
  }),
  getters: {

  },
  actions: {
    setLoader(bool) {
      this.loaderIsActive = bool;
    }
  }
})
