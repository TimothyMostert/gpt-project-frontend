import { defineStore } from "pinia";

import Api from "@/services/Api.service.js";
import { useErrorStore } from "./error.js";
import { useStateStore } from "./state.js";

export const useExploreStore = defineStore({
  id: "Explore",
  state: () => ({
    currentPage: 0,
    prev_page_url: null,
    next_page_url: 'default',
    trips: undefined,
  }),
  getters: {},
  actions: {
    async searchTrips(searchParams) {
      const errorStore = useErrorStore();
      const stateStore = useStateStore();

      console.log(searchParams);

      if (searchParams.page > 0 && searchParams.page !== this.currentPage || (searchParams.page > this.currentPage && this.next_page_url !== null)) {
        this.currentPage = searchParams.page;
        const result = await Api.searchTrips(searchParams);
        if (result.data && result.data.success) {
          this.trips = result.data.trips.data; // is paginated
            this.prev_page_url = result.data.trips.prev_page_url;
            this.next_page_url = result.data.trips.next_page_url;
          stateStore.isLoading = false;
        } else {
          errorStore.addError(
            "fetch_trip",
            "Something went wrong while fetching the trips."
          );
        }
      }
    },
  },
});
