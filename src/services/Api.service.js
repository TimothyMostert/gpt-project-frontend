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

  // login
  sanctum: () => Api.get('/sanctum/csrf-cookie'),

  google_login: () => Api.get("login/auth/google"),
  google_callback: (body) => Api.post("login/auth/google/callback", { params: body }),

  user_register: body => Api.post("user/register", body),
  user_login: (body) => Api.post("login/auth/password", body),
  user_logout: () => Api.get("api/user/logout"),
  
  // itinerary 
  createEventsItinerary: (body) => Api.post("api/events/create", body),
  createEventDetails: (body) => Api.post("api/event/details", body),
  editEvent: (body) => Api.post("api/event/edit", body),
  fillEvent: (body) => Api.post("api/event/add", body),

  getRandomPrompt: () => Api.get(`api/prompt/create`),

  fetchLocationPhotos: (body) => Api.post(`api/google/places/photos`, body),
};
