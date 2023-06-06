<template>
  <div class="w-full h-full min-h-[500px] flex flex-col">
    <div
      class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
    >
      <h2 class="font-bold text-gray-700">
        {{ event.title ? event.title : "Loading..." }}
      </h2>
      <p class="text-xs text-gray-600">
        {{ event.location ? event.location.name : "creating new event!" }}
      </p>
      <div class="py-4 px-2 flex items-center">
        <DescriptionPlaceholder />
      </div>
    </div>
    <div class="p-4 flex flex-col gap-4">
      <ActivitiesPlaceholder />
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
