import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";
import { useUserStore } from "./user.js";
import router from "../router/index.js";

const processEventDetails = (eventDetails) => {
  const itineraryStore = useItineraryStore();
  const eventIndex = itineraryStore.itinerary.events.findIndex(
    (event) => event.id === eventDetails.id
  );

  if (eventIndex > -1) {
    itineraryStore.updateEvent(eventIndex, eventDetails);
  }
};

const updateEventWithPhotos = (uuid, photos) => {
  const itineraryStore = useItineraryStore();
  const eventIndex = itineraryStore.itinerary.events.findIndex(
    (event) => event.uuid === uuid
  );

  if (eventIndex > -1) {
    itineraryStore.updateEvent(
      eventIndex,
      { photos: photos.photoReferences },
      "ignore"
    );
  }
};

// Handles calling the event details endpoint for each event in the itinerary and updating the itinerary store with the response as it comes in
async function createAndProcessEventDetails(event) {
  const { uuid, itinerary_id, location } = event;
  try {
    let detailsResponse, photosResponse;

    const detailsPromise = createEventDetails(uuid, itinerary_id).then(
      (response) => ({ type: "details", response })
    );
    const photosPromise = fetchLocationPhotos(location.name).then(
      (response) => ({ type: "photos", response })
    );

    let promises = [detailsPromise, photosPromise];

    while (promises.length) {
      console.log("promises", promises);
      // Use Promise.race to get the promise that resolves first
      const result = await Promise.race(promises);

      if (result.type === "details") {
        detailsResponse = result.response;
        processEventDetails(detailsResponse.data.eventDetails);
        // Remove the promise from the array
        promises = promises.filter((promise) => promise !== detailsPromise);
      } else if (result.type === "photos") {
        photosResponse = result.response;
        updateEventWithPhotos(uuid, photosResponse);
        // Remove the promise from the array
        promises = promises.filter((promise) => promise !== photosPromise);
      }
    }
  } catch (error) {
    console.error("Error fetching location details and photos:", error);
  }
}

async function createEventDetails(uuid, itineraryId) {
  const errorStore = useErrorStore();
  const userStore = useUserStore();
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
    errorStore.addError("location_details_error", error);
  }
}

async function fetchLocationPhotos(location) {
  try {
    const response = await Api.fetchLocationPhotos({
      location: location,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching location photos:", error);
    return [];
  }
}

export const usePromptsStore = defineStore({
  id: "Prompt",
  state: () => ({
    promptText: "",
    interests: [],
    isOpen: true,
    placeholder:
      "Design a yoga and wellness retreat itinerary in Bali, highlighting spiritual experiences and rejuvenating activities.",
    placeholderTags: ["Relaxation", "Sightseeing", "Culture"],
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

      // Handles calling the create itinerary endpoint and updating the itinerary store with the response as it comes in
      try {
        const prompt = this.promptText && this.promptText != '' ? this.promptText : "Surprise me";
        const interests = this.interests && this.interests.length > 0 ? this.interests : ['Surprise me'];
        const result = await Api.createEventsItinerary({
          prompt: prompt,
          interests: interests,
          prompt_context: "events_1",
          session_id: "1234",
          model: userStore.selectedModel,
        });
        // if successful, update the itinerary store with the response
        if (result.data && result.data.success) {
          itineraryStore.isLoading = false;
          itineraryStore.setItinerary(result.data.itinerary);
          itineraryStore.title = result.data.title;
          router.push({ name: "trip-view", params: { id: result.data.itinerary.id } });

          // fetch location details for each event in the itinerary and update the itinerary store with the response
          const promises = result.data.itinerary.events.map((event) =>
            createAndProcessEventDetails(event)
          );
          await Promise.allSettled(promises);
        } else {
          tineraryStore.isLoading = false;
          errorStore.addError("create_itinerary", result.data);
        }
      } catch (error) {
        itineraryStore.isLoading = false;
        errorStore.addError("server_error", error);
      }
    },
  },
});
