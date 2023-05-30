<template>
  <div class="p-4 col-count-2 col-gap-4 rtl" v-if="photoUrls.length > 0">
    <div
      v-for="(photo, index) in photoUrls"
      :key="index.id"
      class="ltr"
    >
      <img :src="photo.url" alt="" class="w-full h-auto object-cover mb-1 rounded-md" />
    </div>
  </div>
  <div class="p-4" v-else>
    <h3 class="text-lg font-bold font-mono mb-4">No images found for this location!</h3>
    <p>We are working hard to add more content sources, stay tuned</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  event: Object,
});

const photoUrls = computed(() => {
  if (!props.event.photos) return [];
  return props.event.photos.map((photo, index) => {
    return {
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}`,
    };
  });
});
</script>

<style scoped>
.col-count-2 {
  column-count: 2;
}
.col-gap-4 {
  column-gap: 4px;
}
.rtl {
  direction: rtl;
}
.ltr {
  direction: ltr;
}
</style>
