<template>
  <div class="rounded-lg shadow-2xl bg-white py-12 p-4 flex flex-col items-center justify-center">
    <img src="@/assets/images/logo_gif.gif" alt="animated dream trip logo sleek" class="">
    <div class=" text-base font-semibold text-gray-700 text-center">
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
      return "Optimizing the trip schedule...";
    case 4:
      return "Cross-checking availability and restrictions...";
    case 5:
      return "Finalizing your tailored trip...";
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
