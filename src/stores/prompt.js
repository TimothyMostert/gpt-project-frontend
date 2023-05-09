import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";

const processLocationDetails = (eventDetails) => {
  const itineraryStore = useItineraryStore();
  const eventIndex = itineraryStore.itinerary.events.findIndex(event => event.id === eventDetails.id);

  if (eventIndex > -1) {
    itineraryStore.itinerary.events[eventIndex] = eventDetails;
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
      async function fetchAndProcessEventDetails(event) {
        const { uuid, itinerary_id } = event;
        try {
          const response = await createEventDetails(uuid, itinerary_id);
          processLocationDetails(response.data.eventDetails);
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }
      async function createEventDetails(uuid, itineraryId) {
        try {
          // const result = {"eventDetails":{"id":1,"event_type_id":2,"itinerary_id":1,"location_id":1,"title":"Lapa Rios Ecolodge & Wildlife Reserve","description":"Immerse yourself in the pristine beauty of Costa Rica's Osa Peninsula at Lapa Rios Ecolodge & Wildlife Reserve. This luxurious eco-retreat offers a perfect blend of comfort and sustainability, surrounded by lush rainforest and diverse wildlife.","uuid":"1","start_time":null,"end_time":null,"order":0,"location":{"id":1,"name":"Puerto Jim\u00e9nez, Costa Rica","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null},"activities":[{"id":1,"title":"Guided Wildlife Tour","description":"Embark on a guided tour through the reserve, spotting exotic animals such as monkeys, toucans, and sloths in their natural habitat.","order":null},{"id":2,"title":"Birdwatching Expedition","description":"Join a knowledgeable guide for an early morning birdwatching expedition, discovering the incredible variety of bird species found in the area.","order":null},{"id":3,"title":"Sustainable Living Workshop","description":"Learn about the ecolodge's sustainable practices and participate in a hands-on workshop to understand the importance of eco-friendly living.","order":null}]},"success":true};
          const result = await Api.createEventDetails({
            uuid: uuid, 
            itinerary_id: itineraryId,
            prompt_context: "event_details_v03",
            session_id: "1234"});
          return result;
        } catch (error) {
          errorStore.addError('location_details_error', error);
        }
      }

      // Handles calling the create itinerary endpoint and updating the itinerary store with the response as it comes in
      try {
        //const result = {"title":"Sustainable Eco-Tour of Costa Rica","itinerary":{"user_id":1,"prompt_id":1,"title":"Untitled Itinerary","id":1,"events":[{"id":1,"event_type_id":2,"itinerary_id":1,"location_id":1,"title":"Lapa Rios Ecolodge & Wildlife Reserve","description":null,"uuid":"1","start_time":null,"end_time":null,"order":0,"location":{"id":1,"name":"Puerto Jim\u00e9nez, Costa Rica","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}},{"id":2,"event_type_id":2,"itinerary_id":1,"location_id":2,"title":"Corcovado National Park Rainforest Hike","description":null,"uuid":"2","start_time":null,"end_time":null,"order":1,"location":{"id":2,"name":"Corcovado National Park, Costa Rica","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}},{"id":3,"event_type_id":2,"itinerary_id":1,"location_id":3,"title":"Tortuguero National Park Sea Turtle Conservation","description":null,"uuid":"3","start_time":null,"end_time":null,"order":2,"location":{"id":3,"name":"Tortuguero National Park, Costa Rica","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}},{"id":4,"event_type_id":2,"itinerary_id":1,"location_id":4,"title":"Arenal Volcano Eco-Adventure","description":null,"uuid":"4","start_time":null,"end_time":null,"order":3,"location":{"id":4,"name":"La Fortuna, Costa Rica","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}},{"id":5,"event_type_id":2,"itinerary_id":1,"location_id":5,"title":"Rancho Margot Sustainable Living Experience","description":null,"uuid":"5","start_time":null,"end_time":null,"order":4,"location":{"id":5,"name":"El Castillo, Costa Rica","description":null,"latitude":null,"longitude":null,"address":null,"city":null,"state":null,"country":null,"type":null}}]},"success":true};
        const result = await Api.createEventsItinerary({
          prompt: this.promptText,
          interests: this.interests,
          prompt_context: "events_creation_v02",
          session_id: "1234",
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {

          itineraryStore.isLoading = false;
          itineraryStore.setItinerary(result.data.itinerary);
          itineraryStore.title = result.data.title;

          // fetch location details for each event in the itinerary and update the itinerary store with the response
          const promises = result.data.itinerary.events.map(event => fetchAndProcessEventDetails(event));
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