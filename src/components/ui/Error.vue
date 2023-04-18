<template>
  <div
    v-if="isError"
    class="rounded-lg shadow-2xl p-6 max-w-md w-full mx-auto bg-white flex items-center justify-center"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-red-500">{{ type }}</h2>
      <button @click="clearErrors" class="focus:outline-none">
        <span class="text-red-500">
          <i class="fas fa-times"></i>
        </span>
      </button>
    </div>
    <p class="text-gray-600">{{ error }}</p>
    <div class="mt-4">
      <button
        @click="clearErrors"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
      >
        Dismiss
      </button>
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
