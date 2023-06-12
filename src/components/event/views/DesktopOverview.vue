<template>
  <div class="outer-grid-container gap-4">
    <DynamicImageGrid :images="images" :eventId="props.event.id" :style="gridStyleFirst"/>
    <div class="flex flex-col min-h-[550px] p-6" :style="gridStyleSecond">
        <div class="pr-6">
          <h2 class="font-bold text-lg text-gray-700">{{ props.event.title }}</h2>
          <p class="text-sm text-gray-600">{{ props.event.location.name }}</p>
          <DescriptionPlaceholderDesktop v-if="isLoading || missingDescription" class="mt-6 mb-4 flex"/>
          <div class="py-4 px-2 flex items-center" v-else>
            <p class="text-base text-gray-600 italic font-serif">
              "{{ props.event.description }}"
            </p>
          </div>
        </div>
      <div
        class="flex flex-col gap-4 text-left no-scrollbars overflow-y-auto flex-grow"
      >
        <ActivitiesPlaceholderDesktop v-if="isLoading || missingActivities" />
        <div
          v-else
          class="text-gray-700 flex flex-col gap-2"
          v-for="(activity, index) in props.event.activities"
          :key="'activity-' + props.event.id + '-' + index"
        >
          <div class="flex w-full justify-between items-center gap-4">
            <div class="font-bold text-base text-gray-600">{{ activity.title }}</div>
            <div class="rounded-lg w-fit text-sm text-primaryOrange font-bold px-2 py-1">
              {{ activity.activityType }}
            </div>
          </div>
          <p class="text-sm text-gray-600 text-left">
            {{ activity.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ActivitiesPlaceholderDesktop from "@/components/event/placeholders/ActivitiesPlaceholderDesktop.vue";
import DescriptionPlaceholderDesktop from "@/components/event/placeholders/DescriptionPlaceholderDesktop.vue";
import DynamicImageGrid from "@/components/ui/DynamicImageGrid.vue";

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
  return props.event.currentView === "loading";
});

const missingDescription = computed(() => {
  return !props.event.description;
});

const missingActivities = computed(() => {
  return !props.event.activities || props.event.activities.length === 0;
});

const images = computed(() => {
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
