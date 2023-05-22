<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import ItineraryContainer from "@/components/itinerary/ItineraryContainer.vue";
import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import ErrorDisplay from "@/components/ui/Error.vue";

import { useErrorStore } from "@/stores/error";
import { useItineraryStore } from "@/stores/itinerary";

const errorStore = useErrorStore();
const itineraryStore = useItineraryStore();

</script>

<template>
  <MainLayout>
    <main class="bg-white mb-auto">
      <div class="p-4 pt-0 max-w-md flex flex-col gap-4 h-full mx-auto mt-36">
        <Breadcrumbs />
        <ErrorDisplay v-if="errorStore.isError" class="mt-8" />
        <ItineraryContainer v-if="itineraryStore.isOpen && !errorStore.isError" />
      </div>
    </main>
  </MainLayout>
</template>
