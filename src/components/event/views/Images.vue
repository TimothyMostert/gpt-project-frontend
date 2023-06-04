<template>
  <div class="overflow-y-hidden flex flex-col">
    <div
      class="p-4 overflow-y-auto no-scrollbar flex-grow max-h-[500px] my-2 rounded-lg"
      v-if="photoUrls.length > 0"
    >
      <div
        v-for="(photo, index) in photoUrls"
        :key="'image-' + event.id + '-' + index"
        class="rounded-lg"
      >
        <img :src="photo.url" alt="" class="w-full h-auto object-cover mb-1 rounded-lg" />
      </div>
    </div>
    <div class="p-4" v-else>
      <h3 class="text-lg font-bold font-mono mb-4">No images found for this location!</h3>
      <p>We are working hard to add more content sources, stay tuned</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  event: Object,
});

const photoUrls = computed(() => {
  if (!props.event.location.photo_references) return [];
  return props.event.location.photo_references.map((photo, index) => {
    return {
      url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${
        import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
      }`,
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
