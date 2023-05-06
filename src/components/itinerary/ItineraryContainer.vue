<template>
  <ItineraryLoader v-if="itineraryStore.isLoading" class="mt-8" />
  <div v-if="itineraryStore.itinerary" class="px-4 py-2">
    <ItineraryHeader :title="itineraryStore.title" class="mb-8" />
    <div class="flex flex-col">
      <div
        v-for="(event, index) in itineraryStore.itinerary.events"
        :key="'event-' + index.id"
      >
        <Event :event="event" />
        <StandardConnection v-if="index !== itineraryStore.itinerary.events.length - 1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ItineraryHeader from "@/components/itinerary/ItineraryHeader.vue";
import Event from "@/components/event/Event.vue";
import StandardConnection from "@/components/event/connections/StandardConnection.vue";
import ItineraryLoader from "@/components/itinerary/ItineraryLoader.vue";

import { useItineraryStore } from "@/stores/itinerary";

const itineraryStore = useItineraryStore();
</script>

<style lang="scss" scoped></style>
