import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";
import { useLoaderStore } from "./loader.js";

const processLocationDetails = (locationDetails) => {
  const itineraryStore = useItineraryStore();
  const eventIndex = itineraryStore.itinerary.events.findIndex(event => event.id === locationDetails.event_id);

  if (eventIndex > -1) {
    itineraryStore.itinerary.events[eventIndex].location_event = locationDetails;
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
      const loaderStore = useLoaderStore();
      loaderStore.itineraryLoaderIsActive = true;
      this.isOpen = false;

      async function fetchLocationDetails(uuid, itineraryId) {
        try {
          const locationDetails = await Api.createLocationDetails({
            uuid: uuid, 
            itinerary_id: itineraryId,
            prompt_context: "location_details_v02",
            session_id: "1234"});
          return locationDetails;
        } catch (error) {
          errorStore.addError('location_details_error', error);
        }
      }

      try {
        const title = await Api.createTitle({
          prompt: this.promptText,
        });

        if (title.data) {
          itineraryStore.title = title.data.title;
        }

        const result = await Api.createEventsItinerary({
          prompt: this.promptText,
          interests: this.interests,
          prompt_context: "events_creation_v01",
          session_id: "1234",
        });

        if (result.data && result.data.success) {
          loaderStore.itineraryLoaderIsActive = false;
          itineraryStore.setItinerary(result.data.itinerary);
          const promises = result.data.itinerary.events.map(event => {
            const { uuid, itinerary_id } = event;
            return fetchLocationDetails(uuid, itinerary_id);
          });

          Promise.allSettled(promises).then(results => {
            results.forEach(result => {
              if (result.status === "fulfilled") {
                processLocationDetails(result.value.data.locationDetails);
              } else {
                console.error("Error fetching location details:", result.reason);
              }
            });
          });
        } else {
          errorStore.addError('create_itinerary', result.data);
        }
      } catch (error) {
        loaderStore.itineraryLoaderIsActive = false;
        errorStore.addError('server_error', error);
      }
    },
  },
});