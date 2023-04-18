<template>
  <div v-if="isError" class="rounded-lg shadow-2xl p-8 max-w-md w-full mx-auto bg-white">
    <div class="mb-4 flex flex-col gap-2 items-start">
      <h2 class="text-lg whitespace-nowrap font-semibold text-red-500">
        Error: {{ type }}
      </h2>
      <p class="text-gray-600">{{ error }}</p>
      <p @click="clearErrors" class="text-red-500">
        <i class="fa-solid fa-xmark"></i>
      </p>
      <p class="text-gray-400 text-sm">
        (Oops, we are still in pre-alpha! Please try again :)
      </p>
    </div>
  </div>
</template>

<script setup>
import { useErrorStore } from "@/stores/error";

const errorStore = useErrorStore();

const { isError, type, error } = errorStore;

const clearErrors = () => {
  errorStore.clearErrors();
};
</script>
