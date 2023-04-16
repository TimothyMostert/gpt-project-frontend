import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./errors.js";
import  { useLoaderStore } from "./loader.js";

export const usePromptsStore = defineStore({
  id: "Prompt",
  state: () => ({
    promptText: "",
    promptTags: [],
  }),
  getters: {},
  actions: {
    async generateItinerary() {
        const itineraryStore = useItineraryStore();
        const errorStore = useErrorStore();
        const loaderStore = useLoaderStore();
        loaderStore.setLoader(true);
        const result = await Api.createItinerary({
          prompt: this.promptText,
          tags: this.promptTags,
          prompt_context: "itinerary_creation_v01",
          session_id: "1234",
        });
        if (result.data, result.data.success) {
          itineraryStore.setItinerary(result.data.itinerary);
        } else {
          // TODO: Handle error
        }
        loaderStore.setLoader(false);
      }
  },
});
