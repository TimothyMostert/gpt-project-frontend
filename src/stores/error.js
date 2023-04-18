import { defineStore } from "pinia";

export const useErrorStore = defineStore({
  id: "error",
  state: () => ({
    isError: false,
    type: "",
    error: "",
  }),
  getters: {},
  actions: {
    addError(type, error) {
      this.isError = true;
      this.type = type;
      this.error = error;
    },
    clearErrors() {
      this.isError = false;
      this.type = "";
      this.error = "";
    },
  },
});
