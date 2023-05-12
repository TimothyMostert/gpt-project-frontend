import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";

import { useLoaderStore } from "./loader.js";
import { useErrorStore } from "./error.js";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    token: undefined,
    selectedModel: 'gpt-3.5-turbo',
  }),
  getters: {},
  actions: {
    async login(body) {
      const loaderStore = useLoaderStore();
      const errorStore = useErrorStore();
      loaderStore.setLoader(true);
      try {
        const result = await Api.user_login({
          email: body.email,
          password: body.password,
          device: "web",
        });
        if (result.data && result.data.success) {
          this.setToken(result.data.token);
          localStorage.setItem("user", result.data.token);
          errorStore.addError("login", "");
          loaderStore.setLoader(false);
          this.$router.push("/");
        } else {
          loaderStore.setLoader(false);
          errorStore.addError("login", result.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          errorStore.addError("login", error.response.data.message);
        } else {
          errorStore.addError("login", "An error occurred");
        }
        loaderStore.setLoader(false);
      }
    },
    async logout() {
      const result = await Api.user_logout();
      if (result.data.success) {
        this.setToken(undefined);
        localStorage.removeItem("user");
        this.$router.push("/login");
      }
    },
    setToken(token) {
      this.token = token;
    },
    async getAgencies() {
      const result = await Api.user_agencies();
      if (result.data && result.data.success) {
        this.agencies = result.data.agencies;
      }
    }
  },
});
