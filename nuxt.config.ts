// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    // The private keys which are only available within server-side
    OPENAI_KEY: "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",
    // Keys within public, will be also exposed to the client-side
    public: {
      OPENAI_KEY: "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",
    },
  },
});
