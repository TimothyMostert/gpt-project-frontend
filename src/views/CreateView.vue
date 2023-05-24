<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import PromptContainer from "@/components/prompt/PromptContainer.vue";
import ItineraryLoader from "@/components/itinerary/ItineraryLoader.vue";
import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import ErrorDisplay from "@/components/ui/Error.vue";

import { useErrorStore } from "@/stores/error";
import { useItineraryStore } from "@/stores/itinerary";

const itineraryStore = useItineraryStore();
const errorStore = useErrorStore();

</script>

<template>
  <MainLayout>
    <main class="bg-white mb-auto">
      <div class="p-4 pt-0 max-w-md flex flex-col gap-4 h-full mx-auto mt-36">
        <Breadcrumbs />
        <ItineraryLoader v-if="itineraryStore.isLoading && !errorStore.isError" class="mt-8" />
        <PromptContainer v-if="!itineraryStore.isLoading && !errorStore.isError" />
        <ErrorDisplay v-if="errorStore.isError" class="mt-8" />
      </div>
    </main>
  </MainLayout>
</template>
