import { defineStore } from "pinia";

import Api from "@/services/Api.service.js";
import { useErrorStore } from "./error.js";
import { useUserStore } from "./user.js";

export const useTripStore = defineStore({
  id: "Trip",
  state: () => ({
    trip: "",
    title: "",
    isOpen: false,
    isLoading: false,
  }),
  getters: {},
  actions: {
    setTrip(trip) {
      this.trip = trip;
      // Add state settings to each event
      this.trip.events = this.trip.events.map((event) => ({
        ...event,
        currentView: "loading", // Add your custom setting here
      }));
    },
    updateEvent(eventIndex, eventDetails, currentView = "overview") {
      // Get the current event
      const currentEvent = this.trip.events[eventIndex];
      // Update the event with the new details, keeping the custom settings
      if (currentView === "ignore") {
        currentView = currentEvent.currentView;
      }
      this.trip.events[eventIndex] = {
        ...currentEvent,
        ...eventDetails,
        currentView: currentView, // Preserve the custom setting
      };
    },
    findEventById(eventId) {
      // Get the current event where id is euqal to the event id
      const event = this.trip.events.find(
        (event) => event.id === eventId
      );
      return event;
    },
    async editEvent(event_id) {
      const errorStore = useErrorStore();
      const userStore = useUserStore();

      try {
        const eventIndex = this.trip.events.findIndex(
          (event) => event.id === event_id
        );
        const currentEvent = this.trip.events[eventIndex];
        this.trip.events[eventIndex].currentView = "loading";
        const result = await Api.editEvent({
          trip_id: this.trip.id,
          event_id: event_id,
          prompt: currentEvent.editPrompt,
          location: currentEvent.editLocation,
          prompt_context: "edit_1",
          session_id: "1234",
          model: userStore.selectedModel,
        });
        // if successful, update the trip store with the response
        if (result.data && result.data.success) {
          // if the location has changed, update the photos
          if (result.data.event.location.name !== currentEvent.location.name) {
            const photos = await Api.fetchLocationPhotos({
              location: result.data.event.location.name
            });
            this.updateEvent(eventIndex, {photos: photos});
          }
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
      this.trip.events.splice(order, 0, {
        order: order,
        currentView: "new",
      });
      // update the order of all subsequent events
      for (let i = order + 1; i < this.trip.events.length; i++) {
        this.trip.events[i].order += 1;
      }
    },
    async fillEvent(eventIndex) {
      const userStore = useUserStore();
      // Get the current event
      const currentEvent = this.trip.events[eventIndex];

      currentEvent.currentView = "loading";
      
      const result = await Api.fillEvent({
        trip_id: this.trip.id,
        prompt: currentEvent.editPrompt,
        location: currentEvent.editLocation ?? 'you choose',
        prompt_context: "add_1",
        session_id: "1234",
        order: currentEvent.order,
        model: userStore.selectedModel,
      });
      // if successful, update the trip store with the response
      if (result.data && result.data.success) {
        if (eventIndex > -1) {
          this.updateEvent(eventIndex, result.data.event);
        }
      }
    }
  },
});
