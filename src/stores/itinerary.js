import { defineStore } from "pinia";

export const useItineraryStore = defineStore({
  id: "Itinerary",
  state: () => ({
    itinerary: "",
    title: "",
  }),
  getters: {},
  actions: {
    setItinerary(itinerary) {
        console.log(itinerary);
      this.itinerary = itinerary;
    },
  },
});
