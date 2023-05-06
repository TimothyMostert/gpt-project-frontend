import { defineStore } from "pinia";

export const useItineraryStore = defineStore({
  id: "Itinerary",
  state: () => ({
    itinerary: "",
    title: "",
    isOpen: false,
    isLoading: false,
  }),
  getters: {},
  actions: {
    setItinerary(itinerary) {
      this.itinerary = itinerary;
    },
  },
});
