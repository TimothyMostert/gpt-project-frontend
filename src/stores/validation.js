import { defineStore } from "pinia";
import { useCreateStore } from "./create";
import { useStateStore } from "./state";

export const useValidationStore = defineStore({
  id: "validation",
  state: () => ({
    promptTextError: false,
    promptTextErrorText: "",
    promptTagError: false,
    promptTagErrorText: "",
  }),
  getters: {},
  actions: {
    validatePrompt() {
      const createStore = useCreateStore();
      const stateStore = useStateStore();
      let valid = true;
      if (createStore.promptText.length < 1) {
        this.promptTextError = true;
        this.promptTextErrorText = "Please enter a prompt";
        valid = false;
        stateStore.prompt.step = "prompt";
      }
      if (createStore.promptText.length < 6) {
        this.promptTextError = true;
        this.promptTextErrorText = "Please enter a prompt of at least 6 characters";
        valid = false;
        stateStore.prompt.step = "prompt";
      }
      if (createStore.interests.length < 1) {
        this.promptTagError = true;
        this.promptTagErrorText = "Please select at least one tag";
        valid = false;
      }
      return valid;
    },
    clearPromptTextError() {
      this.promptTextError = false;
      this.promptTextErrorText = "";
    },
    clearPromptTagError() {
      this.promptTagError = false;
      this.promptTagErrorText = "";
    }
  },
});
