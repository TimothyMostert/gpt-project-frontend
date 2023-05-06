import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";

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

      itineraryStore.isOpen = true;
      itineraryStore.isLoading = true;
      this.isOpen = false;

      // Handles calling the event details endpoint for each event in the itinerary and updating the itinerary store with the response as it comes in
      async function fetchAndProcessLocationDetails(event) {
        const { uuid, itinerary_id } = event;
        try {
          const locationDetails = await fetchLocationDetails(uuid, itinerary_id);
          processLocationDetails(locationDetails.data.locationDetails);
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }
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

      // Handles calling the create itinerary endpoint and updating the itinerary store with the response as it comes in
      try {
        const result = await Api.createEventsItinerary({
          prompt: this.promptText,
          interests: this.interests,
          prompt_context: "events_creation_v02",
          session_id: "1234",
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {

          // testData = {"title":"Fall foliage photography tour of New England","itinerary":{"user_id":1,"prompt_id":149,"title":"Untitled Itinerary","id":18,"events":[{"id":130,"event_type_id":2,"itinerary_id":18,"uuid":"e4","start_time":null,"end_time":null,"order":0,"location_event":{"id":130,"description":null,"title":"Acadia National Park","event_id":130,"location_id":63,"location":{"id":63,"name":"Bar Harbor, Maine","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}}},{"id":131,"event_type_id":2,"itinerary_id":18,"uuid":"e5","start_time":null,"end_time":null,"order":1,"location_event":{"id":131,"description":null,"title":"Franconia Notch State Park","event_id":131,"location_id":64,"location":{"id":64,"name":"Franconia, New Hampshire","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}}},{"id":132,"event_type_id":2,"itinerary_id":18,"uuid":"e6","start_time":null,"end_time":null,"order":2,"location_event":{"id":132,"description":null,"title":"Stowe Village Historic District","event_id":132,"location_id":65,"location":{"id":65,"name":"Stowe, Vermont","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}}},{"id":133,"event_type_id":2,"itinerary_id":18,"uuid":"e7","start_time":null,"end_time":null,"order":3,"location_event":{"id":133,"description":null,"title":"The Berkshires","event_id":133,"location_id":66,"location":{"id":66,"name":"Western Massachusetts, Massachusetts","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}}}]},"success":true}

          itineraryStore.isLoading = false;
          itineraryStore.setItinerary(result.data.itinerary);
          itineraryStore.title = result.data.title;

          // fetch location details for each event in the itinerary and update the itinerary store with the response
          const promises = result.data.itinerary.events.map(event => fetchAndProcessLocationDetails(event));
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