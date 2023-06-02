<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import PromptContainer from "@/components/prompt/PromptContainer.vue";
import TripLoader from "@/components/trip/TripLoader.vue";
import ErrorDisplay from "@/components/ui/Error.vue";

import { useErrorStore } from "@/stores/error";
import { useTripStore } from "@/stores/trip";

const tripStore = useTripStore();
const errorStore = useErrorStore();
</script>

<template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="max-w-md">
          <TripLoader v-if="tripStore.isLoading && !errorStore.isError" />
          <PromptContainer v-if="!tripStore.isLoading && !errorStore.isError" />
          <ErrorDisplay v-if="errorStore.isError" />
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>
