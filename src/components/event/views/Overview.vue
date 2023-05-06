<template>
        <div
      class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
    >
      <h2 class="font-bold text-gray-700">{{ event.location_event.title }}</h2>
      <p class="text-xs text-gray-600">{{ event.location_event.location.name }}</p>
      <div class="py-4 px-2 flex items-center">
        <DescriptionPlaceholder v-if="!event.location_event.description" />
        <p class="text-sm text-gray-600 italic font-serif" v-else>
          "{{ event.location_event.description }}"
        </p>
      </div>
    </div>
    <div class="p-4 flex flex-col gap-4">
        <ActivitiesPlaceholder v-if="!event.location_event.activities" />
        <div
          v-else
          class="text-gray-700 flex flex-col gap-2"
          v-for="(activity, index) in event.location_event.activities"
          :key="index.id"
        >
          <div class="flex w-full justify-between items-center gap-4 ">
            <div class="font-bold text-sm text-gray-600">{{ activity.title }}</div>
            <div class="rounded-lg w-fit text-xs text-primaryOrange font-bold px-2 py-1">
              {{ activity.activityType }}
            </div>
          </div>
          <p class="text-xs text-gray-600">
            {{ activity.description }}
          </p>
        </div>
    </div>
</template>

<script setup>
import ActivitiesPlaceholder from "@/components/event/placeholders/ActivitiesPlaceholder.vue";
import DescriptionPlaceholder from "@/components/event/placeholders/DescriptionPlaceholder.vue";

defineProps({
  event: Object,
});
</script>