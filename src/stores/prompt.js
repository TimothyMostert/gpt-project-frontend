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
        const result = await Api.prompt({
          prompt: this.promptText,
          tags: this.promptTags,
        });
        if (result.data) {
          itineraryStore.setItinerary(result.data.choices[0].text);
        } else {
          // TODO: Handle error
        }
        loaderStore.setLoader(false);
      }
  },
});
