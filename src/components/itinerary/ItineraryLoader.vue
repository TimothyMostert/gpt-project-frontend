<template>
    <div
      class="rounded-lg h-80 shadow-2xl bg-white py-12 p-4 bg-opacity-80 flex flex-col items-center justify-center"
    >
      <div
        class="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
      ></div>
      <div class="mt-8 text-lg font-semibold text-center">
        {{ currentStep }}
      </div>
      <div class="text-xs text-gray-400 mt-2">
        (please be patient this may take a few minutes)
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watchEffect } from "vue";
  
  const step = ref(1);
  const currentStep = computed(() => {
    switch (step.value) {
      case 1:
        return "Gathering personalized preferences...";
      case 2:
        return "Researching and selecting activities...";
      case 3:
        return "Optimizing the itinerary schedule...";
      case 4:
        return "Cross-checking availability and restrictions...";
      case 5:
        return "Finalizing your tailored itinerary...";
    }
  });
  
  const updateLoadingStep = async () => {
    for (let i = 1; i <= 4; i++) {
      step.value = i;
      await new Promise((resolve) => setTimeout(resolve, 6000));
    }
  };
  
  watchEffect(() => {
    updateLoadingStep();
  });
  </script>