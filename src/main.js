import { createApp, markRaw } from "vue";
import { createPinia } from 'pinia'

import { createGtm } from '@gtm-support/vue-gtm';
import VueSocialSharing from 'vue-social-sharing';

import App from './App.vue'
import router from './router'


import './assets/main.css'

const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});


app.use(pinia);

app.use(router);

app.use(VueSocialSharing);

app.use(
  createGtm({
    id: "GTM-MX9KP6H",
    vueRouter: router
  })
)

app.mount("#app");
