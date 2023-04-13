import { defineStore } from "pinia";

export const useErrorStore = defineStore({
  id: "errors",
  state: () => ({
    loginError: "",
    allocationError: "",
  }),
  getters: {},
  actions: {
    addError(type, error) {
      if (type === "login") {
        this.loginError = error;
      } else if (type === "allocation") {
        this.allocationError = error;
      }
    },
  },
});
