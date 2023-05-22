import { defineStore } from 'pinia'

export const useVisitedRoutesStore = defineStore({
  id: 'visitedRoutes',
  state: () => ({
    visited: []
  }),
  actions: {
    add(routeName) {
      if (!this.visited.includes(routeName)) {
        this.visited.push(routeName);
      }
    },
    reset() {
      this.visited = [];
    }
  }
})