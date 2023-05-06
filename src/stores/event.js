import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";

export const useEventStore = defineStore({
  id: "Event",
  state: () => ({
    isOpen: false,
    isLoading: false,
    activeEvent: undefined,
  }),
  getters: {},
  actions: {
    async editEvent() {
      const itineraryStore = useItineraryStore();
      const errorStore = useErrorStore();

      this.isLoading = true;

      try {
        const result = await Api.editEvent({
          prompt: this.promptText,
          interests: this.interests,
          prompt_context: "event_edit_v01",
          session_id: "1234",
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {


        } else {
          this.isLoading = false;
          errorStore.addError('edit_event', result.data);
        }
      } catch (error) {
        this.isLoading = false;
        errorStore.addError('server_error', error);
      }
    },
  },
});