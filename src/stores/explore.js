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
    trips: [],
    currentDisplayIndex: 0, // The index of the currently displayed trip
    endOfBatch: false, // Indicates whether we've reached the end of the current batch
  }),
  getters: {
    displayedTrips() {
      return this.trips.slice(this.currentDisplayIndex, this.currentDisplayIndex + 6);
    },
  },
  actions: {
    async searchTrips(searchParams) {
      const errorStore = useErrorStore();
      const stateStore = useStateStore();

      if (searchParams.page > 0 && searchParams.page !== this.currentPage || (searchParams.page > this.currentPage && this.next_page_url !== null)) {
        this.currentPage = searchParams.page;
        const result = await Api.searchTrips(searchParams);
        if (result.data && result.data.success) {
          this.trips = result.data.trips.data; // is paginated
          this.prev_page_url = result.data.trips.prev_page_url;
          this.next_page_url = result.data.trips.next_page_url;
          this.currentDisplayIndex = 0;
          this.endOfBatch = false;
          stateStore.isLoading = false;
        } else {
          errorStore.addError(
            "fetch_trip",
            "Something went wrong while fetching the trips."
          );
        }
      }
    },
    nextPage() {
      if(this.endOfBatch) {
        this.searchTrips({
          page: this.currentPage + 1,
          perPage: 112,
        });
      } else {
        this.currentDisplayIndex += 6;
        if(this.currentDisplayIndex + 6 > this.trips.length) {
          this.endOfBatch = true;
        }
      }
    },
    backPage() {
      if(this.currentDisplayIndex >= 6) {
        this.currentDisplayIndex -= 6;
      }
    },
  },
});