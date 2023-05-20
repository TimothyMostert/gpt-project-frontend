<template>
  <div
    class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
  >
    <h2 class="font-bold text-gray-700">Get inspired</h2>
    <p class="text-xs text-gray-600">{{ event.location.name }}</p>
  </div>
  <div class="p-4 flex flex-col gap-4" v-if="photoUrls.length > 0">
    <div
      class="text-gray-700 flex flex-col gap-2"
      v-for="(photo, index) in photoUrls"
      :key="index.id"
    >
      <img :src="photo" alt="" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  event: Object,
});

const photoUrls = computed(() => {
  if (!props.event.photos) return [];
  return props.event.photos.map((photo) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`;
  });
});
</script>
