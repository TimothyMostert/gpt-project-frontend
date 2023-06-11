import { createApp, markRaw } from "vue";
import { createPinia } from 'pinia'

import VueSocialSharing from 'vue-social-sharing';

import App from './App.vue'
import router from './router'
import VueGtag from "vue-gtag";

import './assets/main.css'

const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

app.use(VueGtag, {
  config: { id: "G-PY0DS4KDBG" }
}, router);

app.use(pinia);

app.use(router);

app.use(VueSocialSharing);

app.mount("#app");
