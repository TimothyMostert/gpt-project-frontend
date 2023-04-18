import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import { useItineraryStore } from "./itinerary.js";
import { useErrorStore } from "./error.js";
import  { useLoaderStore } from "./loader.js";

export const usePromptsStore = defineStore({
  id: "Prompt",
  state: () => ({
    promptText: "",
    promptTags: [],
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
      try {
        const result = await Api.createItinerary({
          prompt: this.promptText,
          tags: this.promptTags,
          prompt_context: "itinerary_creation_v02",
          session_id: "1234",
        });
        if (result.data, result.data.success) {
          itineraryStore.setItinerary(result.data.itinerary);
        } else {
          errorStore.addError('create_itinerary', result.data);
        }
        loaderStore.itineraryLoaderIsActive = false
      } catch (error) {
        loaderStore.itineraryLoaderIsActive = false;
        errorStore.addError('server_error', error);
      }
      }
  },
});
