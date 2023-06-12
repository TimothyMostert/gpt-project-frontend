<template>
  <div class="rounded-lg outer-grid-container gap-4">
    <DynamicImageGrid
        v-if="images && images.length > 0"
      :images="images"
      :eventId="props.event.id"
      :style="gridStyleFirst"
    />
    <div v-else :style="gridStyleFirst">
        <UnsplashImage
        :image="tripStore.trip.main_photo"
          size="w-full h-full absolute rounded-lg"
          quality="full"
          style="object-fit: cover"
        ></UnsplashImage>
    </div>
    <div :style="gridStyleSecond">
        <DesktopOverview v-if="event.currentView == 'overview' && !isLoading" :event="props.event"  />
        <DesktopLoading v-if="isLoading" :event="props.event" />
        <DesktopEdit v-if="event.currentView == 'edit' && !isLoading" :event="props.event" />
        <DesktopNew v-if="event.currentView == 'new' && !isLoading" :event="props.event" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import DynamicImageGrid from "@/components/ui/DynamicImageGrid.vue";
import DesktopOverview from "@/components/event/views/desktop/DesktopOverview.vue";
import DesktopLoading from "@/components/event/views/desktop/DesktopLoading.vue";
import DesktopNew from "@/components/event/views/desktop/DesktopNew.vue";
import DesktopEdit from "@/components/event/views/desktop/DesktopEdit.vue";
import UnsplashImage from "../../ui/UnsplashImage.vue";

import { useTripStore } from "@/stores/trip";

const tripStore = useTripStore();

const props = defineProps({
  event: Object,
});

const gridStyleFirst = computed(() => {
  return props.event.order % 2 === 0 ? "grid-area: a;" : "grid-area: b;";
});

const gridStyleSecond = computed(() => {
  return props.event.order % 2 === 0 ? "grid-area: b;" : "grid-area: a;";
});

const isLoading = computed(() => {
  if (props.event.currentView == "loading") {
    return true;
  }
  if (props.event.currentView == "new" || props.event.currentView == "edit") {
    return false;
  }
  return (
    !props.event.description ||
    !props.event.activities ||
    !props.event.location ||
    props.event.activities.length === 0
  );
});

const images = computed(() => {
    if (!props.event.location) return [];
  if (!props.event.location.photo_references) return [];
  return props.event.location.photo_references;
  // return props.event.location.photo_references.map((photo, index) => {
  //   return {
  //     url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${
  //       import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
  //     }`,
  //   };
  // }); for google places images
});
</script>

<style>
.outer-grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "a b";
  grid-gap: 4px;
}
</style>
