import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import router from "@/router/index.js";

// import { useLoaderStore } from "./loader.js";
// import { useErrorStore } from "./error.js";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
    tokens: 2,
    token: undefined,
    isLoggedIn: false,
    selectedModel: "gpt-3.5-turbo",
  }),
  getters: {},
  actions: {
    async login(loginData) {
      console.log("loginData", loginData);
      localStorage.setItem("token", loginData.token);
      this.user = loginData.user;
      if (loginData.avatar) {
        this.user.avatar = loginData.avatar;
      }
      this.isLoggedIn = true;
      router.push("/trip/create");
    },
    async logout() {
      const result = await Api.user_logout();
      if (result.data.success) {
        localStorage.removeItem("token");
        this.user = {};
        this.isLoggedIn = false;
        router.push("/");
      }
    },
    async user_register(registerData) {
      const result = await Api.user_register(registerData);
      if (result.data.success) {
        router.push("/login");
      }
    },
    async user_login(loginData) {
      await Api.sanctum();
      const result = await Api.user_login(loginData);
      if (result.status == 200) {
        this.login({
          token: result.headers["token"],
          user: result.data.user,
        });
      } else {
        this.logout();
      }
    },
    async google_login() {
      const response = await Api.google_login();
      window.location.href = response.data;
    },
    async google_callback(urlParams) {
      await Api.sanctum();
      const response = await Api.google_callback(urlParams);
      if (response.status == 200) {
        this.login({
          token: response.headers["token"],
          user: response.data.user,
          avatar: response.data.avatar,
        });
      } else {
        this.logout();
      }
    },
  },
});
