import { defineStore } from "pinia";

export const useStateStore = defineStore({
  id: "state",
  state: () => ({
    userProfileSettingsIsOpen: false,
  }),
  getters: {},
  actions: {},
});
