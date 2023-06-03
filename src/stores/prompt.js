import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useTripStore } from "./trip.js";
import { useErrorStore } from "./error.js";
import { useUserStore } from "./user.js";
import router from "../router/index.js";

import examplePrompts from "@/assets/json/examplePrompts.json";

const processEventDetails = (eventDetails) => {
  const tripStore = useTripStore();
  const eventIndex = tripStore.trip.events.findIndex(
    (event) => event.id === eventDetails.id
  );

  if (eventIndex > -1) {
    tripStore.updateEvent(eventIndex, eventDetails);
  }
};

// Handles calling the event details endpoint for each event in the trip and updating the trip store with the response as it comes in
async function createAndProcessEventDetails(event) {
  const { uuid, trip_id, location } = event;
  try {
    let detailsResponse, photosResponse;

    const detailsPromise = createEventDetails(uuid, trip_id).then(
      (response) => ({ type: "details", response })
    );

    //  can add other promises here eg:

    // const photosPromise = fetchLocationPhotos(location.name).then(
    //   (response) => ({ type: "photos", response })
    // );

    let promises = [detailsPromise]; // photosPromise

    while (promises.length) {
      console.log("promises", promises);
      // Use Promise.race to get the promise that resolves first
      const result = await Promise.race(promises);

      if (result.type === "details") {
        detailsResponse = result.response;
        processEventDetails(detailsResponse.data.eventDetails);
        // Remove the promise from the array
        promises = promises.filter((promise) => promise !== detailsPromise);
      }
    }
  } catch (error) {
    console.error("Error fetching location details and photos:", error);
  }
}

async function createEventDetails(uuid, tripId) {
  const errorStore = useErrorStore();
  const userStore = useUserStore();
  try {
    const result = await Api.createEventDetails({
      uuid: uuid,
      trip_id: tripId,
      prompt_context: "details_1",
      session_id: "1234",
      model: userStore.selectedModel,
    });
    return result;
  } catch (error) {
    errorStore.addError("location_details_error", error);
  }
}

// async function fetchLocationPhotos(location) {
//   try {
//     const response = await Api.fetchLocationPhotos({
//       location: location,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching location photos:", error);
//     return [];
//   }
// }

export const usePromptsStore = defineStore({
  id: "Prompt",
  state: () => ({
    promptText: "",
    interests: [],
    usedExample: false,
    placeholder: examplePrompts[Math.floor(Math.random() * examplePrompts.length)].prompt,
    placeholderTags: examplePrompts[Math.floor(Math.random() * examplePrompts.length)].tags,
    state: "prompt",
  }),
  getters: {},
  actions: {
    async createTrip() {
      const tripStore = useTripStore();
      const errorStore = useErrorStore();
      const userStore = useUserStore();

      tripStore.isOpen = true;
      tripStore.isLoading = true;

      if (userStore.selectedModel === "gpt-4") {
        if (userStore.tokens = 0) {
          return errorStore.addError("no_tokens", "You have no tokens left. Please upgrade your plan to get more tokens.");
        } else {
          const currentTokens = userStore.tokens;
          userStore.tokens = currentTokens - 1;
        }
      }

      // Handles calling the create trip endpoint and updating the trip store with the response as it comes in
      try {
        const prompt = this.promptText && this.promptText != '' ? this.promptText : "Surprise me";
        const interests = this.interests && this.interests.length > 0 ? this.interests : ['Surprise me'];
        const result = await Api.createEventsTrip({
          prompt: prompt,
          interests: interests,
          prompt_context: "events_1",
          session_id: "1234",
          model: userStore.selectedModel,
        });
        // if successful, update the trip store with the response
        if (result.data && result.data.success) {
          tripStore.setTrip(result.data.trip);
          tripStore.title = result.data.title;
          router.push({ name: "trip-view", params: { id: result.data.trip.id } });
          tripStore.isLoading = false;

          // fetch location details for each event in the trip and update the trip store with the response
          const promises = result.data.trip.events.map((event) =>
            createAndProcessEventDetails(event)
          );
          await Promise.allSettled(promises);
        } else {
          tripStore.isLoading = false;
          errorStore.addError("create_trip", result.data.message);
        }
      } catch (error) {
        tripStore.isLoading = false;
        errorStore.addError("server_error", error);
      }
    },
  },
});
