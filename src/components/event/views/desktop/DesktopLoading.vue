<template>
  <div class="flex flex-col min-h-[550px] p-6">
  <div class="flex flex-col">
    <div class="flex justify-between">
    <div v-if="!isLoading">
      <h2 class="font-bold text-lg text-gray-700">{{ props.event.title }}</h2>
      <p class="text-sm text-gray-600">{{ props.event.location.name }}</p>
    </div>
    <div v-else>
      <div class="animate-pulse">
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
        <div class="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
    <div>
      <!-- edit button -->
      <svg
        v-if="userStore.isLoggedIn && tripStore.isUserTrip && !isLoading"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </div>
    </div>
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
</template>

<script setup>
import { computed } from "vue";
import ActivitiesPlaceholderDesktop from "@/components/event/placeholders/ActivitiesPlaceholderDesktop.vue";
import DescriptionPlaceholderDesktop from "@/components/event/placeholders/DescriptionPlaceholderDesktop.vue";

import { useUserStore } from "@/stores/user";
import { useTripStore } from "@/stores/trip";

const userStore = useUserStore();
const tripStore = useTripStore();

const props = defineProps({
  event: Object,
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

</script>

<style lang="scss" scoped>

</style>
