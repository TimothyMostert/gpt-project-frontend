import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

Api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("user");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "";
    }
    return error;
  }
);

export default {
  // user
  user_login: (body) => Api.post("api/user/login", body),
  user_logout: () => Api.get("api/user/logout"),
  
  // openai
  prompt: (body) => Api.post("api/prompt", body),
};
