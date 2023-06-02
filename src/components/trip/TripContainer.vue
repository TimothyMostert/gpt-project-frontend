<template>
  
  <div v-if="tripStore.trip" class="px-4 py-2">
    <TripHeader :title="tripStore.title" class="mb-8" />
    <div class="flex flex-col">
      <transition-group name="list" tag="div">
      <div
        v-for="(event, index) in tripStore.trip.events"
        :key="'event-' + index.id"
      >
        <Event :event="event" />
        <StandardConnection v-if="index !== tripStore.trip.events.length - 1"  :order="index + 1"/>
      </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import TripHeader from "@/components/trip/TripHeader.vue";
import Event from "@/components/event/Event.vue";
import StandardConnection from "@/components/event/connections/StandardConnection.vue";

import { useTripStore } from "@/stores/trip";

const tripStore = useTripStore();
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: transform 0.5s;
}
.list-enter, .list-leave-to {
  transform: translateY(-100%);
}
</style>
