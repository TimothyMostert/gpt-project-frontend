import { defineStore } from "pinia";
import Api from "@/services/Api.service.js";
import router from "@/router/index.js";

// import { useErrorStore } from "./error.js";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    const token = localStorage.getItem('token');
    return {
      user: {},
      tokens: 2,
      token: token,
      isLoggedIn: token ? true : false,
      selectedModel: "gpt-3.5-turbo",
      trips: [],
    }
  },
  getters: {},
  actions: {
    async checkAuth() {
      try {
        const result = await Api.user_auth(); // this API should validate the token and return the current user info if it's valid

        if (result.status == 200) {
          this.isLoggedIn = true;
          this.user = result.data.user;
        } else {
          this.logout();
        }
      } catch(error) {
        this.logout();
      }
    },
    async login(loginData) {
      localStorage.setItem("token", loginData.token);
      this.user = loginData.user;
      this.user.premium = false;
      if (loginData.avatar) {
        this.user.avatar = loginData.avatar;
      }
      this.isLoggedIn = true;
      router.push({ name: 'dashboard'   });
    },
    async logout() {
      try {
        Api.user_logout();
        localStorage.removeItem("token");
        this.user = {};
        this.isLoggedIn = false;
        router.push("/");
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/");
      }
      
    },
    async user_register(registerData) {
      const result = await Api.user_register(registerData);
      if (result.status == 201) {
        this.user_login(registerData);
        return true;
      } else {
        return { error: result.response.data.message };
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
        return true;
      } else {
        this.logout();
        return { error: result.response.data.message };
      }
    },
    async google_login() {
      const result = await Api.google_login();
      if (result.status == 200) {
        window.location.href = result.data;
        return true;
      } else {
        return { error: result.response.data.message };
      }
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
    async user_trips() {
      const result = await Api.user_trips();
      this.trips = result.data.trips;
    },
  },
});
