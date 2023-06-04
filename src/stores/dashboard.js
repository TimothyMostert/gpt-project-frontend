import { defineStore } from "pinia";

import Api from "@/services/Api.service.js";
import { useErrorStore } from "./error.js";
import { useStateStore } from "./state.js";

export const useDashboardStore = defineStore({
  id: "Dashboard",
  state: () => ({
    popularTrips: [],
  }),
  getters: {},
  actions: {
    async searchPopularTrips(searchParams) {
      const errorStore = useErrorStore();
      const stateStore = useStateStore();

      const result = await Api.searchTrips(searchParams);
      if (result.data && result.data.success) {
        this.popularTrips = result.data.trips.data; // is paginated
        stateStore.isLoading = false;
      } else {
        errorStore.addError(
          "fetch_trip",
          "Something went wrong while fetching the trips."
        );
      }
    },
  },
});
