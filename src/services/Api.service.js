import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
  withCredentials: true,
});

Api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  return config;
},
error => {
  Promise.reject(error)
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

  // login and auth
  sanctum: () => Api.get('/sanctum/csrf-cookie'),
  google_login: () => Api.get("login/auth/google"),
  google_callback: (code) => Api.post("login/auth/google/callback", { code: code }),
  user_register: body => Api.post("user/register", body),
  user_login: (body) => Api.post("login/auth/password", body),
  user_logout: () => Api.get("api/user/logout"),
  user_auth: () => Api.get("api/user/auth"),

  // user
  user_trips: () => Api.get("api/user/trips"),
  
  // trips
  createEventsTrip: (body) => Api.post("api/trip/create", body),

  // events
  createEventDetails: (body) => Api.post("api/event/details", body),
  editEvent: (body) => Api.post("api/event/edit", body),
  fillEvent: (body) => Api.post("api/event/add", body),

  getRandomPrompt: () => Api.get(`api/prompt/create`),

  fetchLocationPhotos: (body) => Api.post(`api/google/places/photos`, body),
};
