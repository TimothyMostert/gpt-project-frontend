<template>
    <div class="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-100">
      <div class="flex items-center space-x-4 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8 text-indigo-500">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-lg font-medium">Logging in...</span>
      </div>
      <p class="mt-6 text-center">We're currently logging you in via Google's OAuth. Hang tight!</p>
    </div>
  </template>  

<script setup>
import Api from "@/services/Api.service.js";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const props = defineProps({
  urlParams: {
    type: Object,
    required: true,
  },
});

const loginWithCallback = async () => {
  if (props.urlParams.code) {
    await userStore.google_callback(props.urlParams.code);
  }
};

loginWithCallback();
</script>

<style lang="scss" scoped></style>
