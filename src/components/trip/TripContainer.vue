<template>
  <div v-if="tripStore.trip" class="px-4 py-2 flex flex-col gap-8">
    <TripHeader>
      <TripTools class="hidden md:block" />
      <div class="md:hidden w-full py-1 flex gap-2 items-center">
        <TripToolsMobile class="md:hidden" />
        <a
          class="text-primaryBlue group flex items-center gap-2 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap"
        >
          <RatingDropdown
            class="md:hidden h-5 w-5 text-primaryBlue group-hover:text-gray-500"
            aria-hidden="true"
          />
        </a>
      </div>
    </TripHeader>
    <div class="flex flex-col">
      <transition-group name="list" tag="div">
        <div v-for="(event, index) in tripStore.trip.events" :key="'event-' + index.id">
          <Event :event="event" />
          <StandardConnection
            v-if="index !== tripStore.trip.events.length - 1"
            :order="index + 1"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import TripHeader from "@/components/trip/TripHeader.vue";
import Event from "@/components/event/Event.vue";
import StandardConnection from "@/components/event/connections/StandardConnection.vue";
import TripTools from "./TripTools.vue";

import { useTripStore } from "@/stores/trip";
import TripToolsMobile from "./TripToolsMobile.vue";
import RatingDropdown from "@/components/ui/RatingDropdown.vue";

const tripStore = useTripStore();
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: transform 0.5s;
}
.list-enter,
.list-leave-to {
  transform: translateY(-100%);
}
</style>
