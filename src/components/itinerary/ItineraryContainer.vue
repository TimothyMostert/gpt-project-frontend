<template>
  <div v-if="itineraryStore.itinerary" class="px-4 py-2">
    <ItineraryHeader :title="itineraryStore.itinerary.title" />
    <div class="flex flex-col">
      <div
        v-for="(event, index) in itineraryStore.itinerary.events"
        :key="'event-' + index.id"
      >
        <TravelEvent v-if="event.type === 'travel'" :event="event" />
        <LocationEvent v-else :event="event" />
        <EventConnection v-if="index !== itineraryStore.itinerary.events.length - 1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ItineraryHeader from "@/components/itinerary/ItineraryHeader.vue";
import TravelEvent from "@/components/itinerary/event/TravelEvent.vue";
import LocationEvent from "@/components/itinerary/event/LocationEvent.vue";
import EventConnection from "@/components/itinerary/event/EventConnection.vue";

import { useItineraryStore } from "@/stores/itinerary";

const itineraryStore = useItineraryStore();
</script>

<style lang="scss" scoped></style>
