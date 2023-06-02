<template>
  <div class="rounded-lg shadow-2xl bg-white h-80 py-12 p-4 flex flex-col items-center justify-center">
    <GridLoader class="opacity-30" :loading="true" :color="loader.spinnerColor" :size="loader.spinnerSize" />
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
import { GridLoader } from "vue3-spinner";

const loader = {
  spinnerSize: "50px",
  // linear gradient on spinner color
  spinnerColor: "#0D518C",
};

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
