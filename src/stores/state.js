import { defineStore } from "pinia";

export const useStateStore = defineStore({
  id: "state",
  state: () => ({
    ui : {
      userProfileSettingsIsOpen: false,
    },
    prompt: {
      step: "prompt",
      isOpen: true,
    },
    trip: {
      isOpen: false,
    },
    isLoading: false,
  }),
  getters: {},
  actions: {},
});
