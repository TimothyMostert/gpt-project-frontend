<template>
  <div class="rounded-lg shadow-2xl">
    <EditEvent :event="event" />
    <div
      class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
    >
      <h2 class="py-2 font-bold text-gray-700">{{ event.title }}</h2>
      <p class="p-2 text-sm text-gray-600">{{ event.description }}</p>
    </div>
    <div class="p-4 flex flex-col gap-4">
        <div
          class="px-2 text-gray-700 flex flex-col gap-2"
          v-for="(activity, index) in event.activities"
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
  </div>
</template>

<script setup>
import EditEvent from "@/components/itinerary/event/EditEvent.vue";

defineProps({
  event: Object,
});
</script>
