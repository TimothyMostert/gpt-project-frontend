import { defineStore } from 'pinia'

export const useLoaderStore = defineStore({
  id: 'loader',
  state: () => ({
    isOpen: false,
  }),
  getters: {

  },
  actions: {
    setLoader(bool) {
      this.isOpen = bool;
    }
  }
})
