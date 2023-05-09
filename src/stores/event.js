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
    async editEvent(event_id, prompt, location) {
      const itineraryStore = useItineraryStore();
      const errorStore = useErrorStore();

      this.isLoading = true;

      try {
        const result = await Api.editEvent({
          itinerary_id: itineraryStore.itinerary.id,
          event_id: event_id,
          prompt: prompt,
          location: location,
          prompt_context: "event_edit_v01",
          session_id: "1234",
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {
          const eventIndex = itineraryStore.itinerary.events.findIndex(event => event.id === event_id);
          if (eventIndex > -1) {
            itineraryStore.itinerary.events[eventIndex] = result.data.event;
          }
          this.isLoading = false;
          this.isOpen = false;
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