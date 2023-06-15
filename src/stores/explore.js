import { defineStore } from "pinia";

import Api from "@/services/Api.service.js";
import { useErrorStore } from "./error.js";
import { useStateStore } from "./state.js";

export const useExploreStore = defineStore({
  id: "Explore",
  state: () => ({
    currentPage: 0,
    prev_page_url: null,
    next_page_url: "default",
    trips: [],
    currentDisplayIndex: 0, // The index of the currently displayed trip
    endOfBatch: false, // Indicates whether we've reached the end of the current batch
    filters: {
      search: "",
      sort: "created_at",
      tags: {
        activeList: [
          { value: "Adventure", label: "Adventure", checked: false },
          { value: "Hiking", label: "Hiking", checked: false },
          { value: "Sports", label: "Sports", checked: false },
          { value: "Theme Park", label: "Theme Park", checked: false },
          { value: "Wildlife", label: "Wildlife", checked: false },
          { value: "City", label: "City", checked: false },
          { value: "Sightseeing", label: "Sightseeing", checked: false },
          { value: "Shopping", label: "Shopping", checked: false },
          { value: "Nightlife", label: "Nightlife", checked: false },
        ],
        leisureList: [
          { value: "Beach", label: "Beach", checked: false },
          { value: "Culture", label: "Culture", checked: false },
          { value: "Food", label: "Food", checked: false },
          { value: "History", label: "History", checked: false },
          { value: "Nature", label: "Nature", checked: false },
          { value: "Relaxation", label: "Relaxation", checked: false },
          { value: "Romance", label: "Romance", checked: false },
          { value: "Spa", label: "Spa", checked: false },
        ],
        travelStyle: [
          { value: "Road trip", label: "Road trip", checked: false },
          { value: "Day trip", label: "Day trip", checked: false },
          {
            value: "Weekend getaway",
            label: "Weekend getaway",
            checked: false,
          },
          {
            value: "Nomad destination",
            label: "Nomad destination",
            checked: false,
          },
          {
            value: "Classic holiday",
            label: "Classic holiday",
            checked: false,
          },
        ],
        budget: [
          { value: "Low-budget", label: "Low-budget", checked: false },
          { value: "Mid-budget", label: "Mid-budget", checked: false },
          { value: "High-budget", label: "High-budget", checked: false },
          { value: "Luxury", label: "Luxury", checked: false },
        ],
      },
    },
  }),
  getters: {
    displayedTrips() {
      return this.trips.slice(
        this.currentDisplayIndex,
        this.currentDisplayIndex + 12
      );
    },
    numberOfTotalTagsSelected() {
      let total = 0;
      for (const key in this.filters.tags) {
        total += this.filters.tags[key].filter((tag) => tag.checked).length;
      }
      return total;
    },
  },
  actions: {
    applyFilter() {
      console.log('running filter from store')
      this.currentPage = 1;
      // Prepare search parameters
      const searchParams = this.prepareSearchParams();
      // Perform search
      this.searchTrips(searchParams, true);
    },  
    prepareSearchParams() {
      let tags = [];
      for (const key in this.filters.tags) {
        tags = tags.concat(
          this.filters.tags[key]
            .filter((tag) => tag.checked)
            .map((tag) => tag.value)
        );
      }

      return {
        page: this.currentPage,
        perPage: 112,
        search: this.filters.search,
        sort: this.filters.sort,
        tags: tags,
      };
    },
    async searchTrips(searchParams, isFilter = false) {
      const errorStore = useErrorStore();
      const stateStore = useStateStore();

      if (
        (isFilter) ||
        (searchParams.page > 0 && searchParams.page !== this.currentPage) ||
        (searchParams.page > this.currentPage && this.next_page_url !== null)
      ) {
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
      if (this.endOfBatch) {
        this.searchTrips({
          page: this.currentPage + 1,
          perPage: 112,
        });
      } else {
        this.currentDisplayIndex += 12;
        if (this.currentDisplayIndex + 12 > this.trips.length) {
          this.endOfBatch = true;
        }
      }
    },
    backPage() {
      if (this.currentDisplayIndex >= 12) {
        this.currentDisplayIndex -= 12;
      }
    },
    clearFilters() {
      for (const key in this.filters.tags) {
        this.filters.tags[key].forEach((tag) => (tag.checked = false));
      }
      this.filters.search = "";
      this.filters.sort = "newest";
    },
  },
});
