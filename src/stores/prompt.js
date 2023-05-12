import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";
import { useUserStore } from "./user.js";

const processEventDetails = (eventDetails) => {
  const itineraryStore = useItineraryStore();
  const eventIndex = itineraryStore.itinerary.events.findIndex(event => event.id === eventDetails.id);

  if (eventIndex > -1) {
    // itineraryStore.itinerary.events[eventIndex] = eventDetails;
    itineraryStore.updateEvent(eventIndex, eventDetails);
  }
};

export const usePromptsStore = defineStore({
  id: "Prompt",
  state: () => ({
    promptText: "",
    interests: [],
    isOpen: true,
  }),
  getters: {},
  actions: {
    async createItinerary() {
      const itineraryStore = useItineraryStore();
      const errorStore = useErrorStore();
      const userStore = useUserStore();

      itineraryStore.isOpen = true;
      itineraryStore.isLoading = true;
      this.isOpen = false;

      // Handles calling the event details endpoint for each event in the itinerary and updating the itinerary store with the response as it comes in
      async function createAndProcessEventDetails(event) {
        const { uuid, itinerary_id } = event;
        try {
          const response = await createEventDetails(uuid, itinerary_id);
          processEventDetails(response.data.eventDetails);
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }
      async function createEventDetails(uuid, itineraryId) {
        try {
          const result = await Api.createEventDetails({
            uuid: uuid, 
            itinerary_id: itineraryId,
            prompt_context: "details_1",
            session_id: "1234",
            model: userStore.selectedModel,
          });
          return result;
        } catch (error) {
          errorStore.addError('location_details_error', error);
        }
      }

      // Handles calling the create itinerary endpoint and updating the itinerary store with the response as it comes in
      try {
        const result = await Api.createEventsItinerary({
          prompt: this.promptText,
          interests: this.interests,
          prompt_context: "events_1",
          session_id: "1234",
          model: userStore.selectedModel,
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {

          itineraryStore.isLoading = false;
          itineraryStore.setItinerary(result.data.itinerary);
          itineraryStore.title = result.data.title;

          // fetch location details for each event in the itinerary and update the itinerary store with the response
          const promises = result.data.itinerary.events.map(event => createAndProcessEventDetails(event));
          await Promise.allSettled(promises);

        } else {
          errorStore.addError('create_itinerary', result.data);
        }
      } catch (error) {
        itineraryStore.isLoading = false;
        errorStore.addError('server_error', error);
      }
    },
  },
});