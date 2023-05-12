import { defineStore } from "pinia";

import Api from "@/services/Api.service.js";
import { useErrorStore } from "./error.js";
import { useUserStore } from "./user.js";

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
      // Add state settings to each event
      this.itinerary.events = this.itinerary.events.map((event) => ({
        ...event,
        currentView: "loading", // Add your custom setting here
      }));
    },
    updateEvent(eventIndex, eventDetails, currentView = "overview") {
      // Get the current event
      const currentEvent = this.itinerary.events[eventIndex];
      // Update the event with the new details, keeping the custom settings
      this.itinerary.events[eventIndex] = {
        ...currentEvent,
        ...eventDetails,
        currentView: currentView, // Preserve the custom setting
      };
    },
    async editEvent(event_id) {
      const errorStore = useErrorStore();
      const userStore = useUserStore();

      try {
        const eventIndex = this.itinerary.events.findIndex(
          (event) => event.id === event_id
        );
        const currentEvent = this.itinerary.events[eventIndex];
        this.itinerary.events[eventIndex].currentView = "loading";
        const result = await Api.editEvent({
          itinerary_id: this.itinerary.id,
          event_id: event_id,
          prompt: currentEvent.editPrompt,
          location: currentEvent.editLocation,
          prompt_context: "edit_1",
          session_id: "1234",
          model: userStore.selectedModel,
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {
          if (eventIndex > -1) {
            this.updateEvent(eventIndex, result.data.event);
          }
        } else {
          this.isLoading = false;
          errorStore.addError("edit_event", result.data);
        }
      } catch (error) {
        this.isLoading = false;
        errorStore.addError("server_error", error);
      }
    },
    async addEvent(order) {
      this.itinerary.events.splice(order, 0, {
        order: order,
        currentView: "new",
      });
      // update the order of all subsequent events
      for (let i = order + 1; i < this.itinerary.events.length; i++) {
        this.itinerary.events[i].order += 1;
      }
    },
    async fillEvent(eventIndex) {
      const userStore = useUserStore();
      // Get the current event
      const currentEvent = this.itinerary.events[eventIndex];

      currentEvent.currentView = "loading";
      
      const result = await Api.fillEvent({
        itinerary_id: this.itinerary.id,
        prompt: currentEvent.editPrompt,
        location: currentEvent.editLocation ?? 'you choose',
        prompt_context: "add_1",
        session_id: "1234",
        order: currentEvent.order,
        model: userStore.selectedModel,
      });
      // if successful, update the itinerary store with the response
      if (result.data && result.data.success) {
        if (eventIndex > -1) {
          this.updateEvent(eventIndex, result.data.event);
        }
      }
    }
  },
});
