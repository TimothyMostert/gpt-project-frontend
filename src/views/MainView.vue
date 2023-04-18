<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import PromptContainer from "@/components/prompt/PromptContainer.vue";
import ItineraryContainer from "@/components/itinerary/ItineraryContainer.vue";
import ItineraryLoader from "@/components/itinerary/ItineraryLoader.vue";
import ErrorDisplay from "@/components/ui/Error.vue";

import { useLoaderStore } from "@/stores/loader";
import { useErrorStore } from "@/stores/error";

const loaderStore = useLoaderStore();
const errorStore = useErrorStore();

</script>

<template>
  <MainLayout>
    <main class="bg-white mb-auto">
      <div class="p-4 pt-0 max-w-md flex flex-col gap-4 h-full mx-auto">
        <PromptContainer />
        <ErrorDisplay v-if="errorStore.isError" class="mt-8"/>
        <ItineraryLoader v-if="loaderStore.itineraryLoaderIsActive" class="mt-8" />
        <ItineraryContainer v-if="!loaderStore.itineraryLoaderIsActive && !errorStore.isError" />
      </div>
    </main>
  </MainLayout>
</template>
