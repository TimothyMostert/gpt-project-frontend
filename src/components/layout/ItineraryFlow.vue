<template>
    <div v-if="itineraryStore.itinerary" class="px-4 py-2 border rounded-md">
      {{ itineraryStore.itinerary }}
    </div>
</template>

<script setup>
import { useItineraryStore } from "@/stores/itinerary";

const itineraryStore = useItineraryStore();

</script>

<style lang="scss" scoped>

</style>