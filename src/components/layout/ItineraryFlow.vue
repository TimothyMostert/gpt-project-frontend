<template>
  <div v-if="itineraryStore.itinerary" class="px-4 py-2">
    <h2 class="text-lg text-primaryBlue font-bold p-2">
      {{ itineraryStore.itinerary.title }}
    </h2>
    <div class="flex flex-col">
      <div
        v-for="(event, index) in itineraryStore.itinerary.events"
        :key="'event-' + index.id"
      >
        <div
          v-if="event.type === 'travel'"
          class="flex flex-col gap-2 px-4 py-4 rounded-lg shadow-2xl isolate after:bg-travel-1 after:inset-0 after:absolute after:rounded-lg after:-z-10 after:opacity-40"
        >
          <h3 class="font-bold text-gray-700">Travel by {{ event.mode }}</h3>
          <div class="flex justify-between text-sm text-gray-600">
            <p>{{ event.origin }}</p>
            to
            <p>{{ event.destination }}</p>
          </div>
        </div>
        <div
          v-else
          class="flex flex-col gap-4 p-4 rounded-lg shadow-2xl isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-lg after:-z-10 after:opacity-20"
        >
          <h2 class="font-bold text-gray-700">{{ event.title }}</h2>
          <p class="px-2 text-sm text-gray-600">{{ event.description }}</p>
          <ul>
            <li
              class="px-2 text-gray-700"
              v-for="(activity, index) in event.activities"
              :key="index.id"
            >
              <div class="flex w-full justify-between items-center gap-4">
                <div class="font-bold text-gray-700">{{ activity.title }}</div>
                <div
                  class="rounded-lg w-fit text-sm text-primaryOrange font-bold px-2 py-1"
                >
                  {{ activity.activityType }}
                </div>
              </div>
              <p class="text-sm text-gray-600">
                {{ activity.description }}
              </p>
            </li>
          </ul>
        </div>
        <!-- if not the last in loop create dottedd connection line -->
        <div
          v-if="index !== itineraryStore.itinerary.events.length - 1"
          class="my-4 w-full flex justify-center items-center"
        >
          <div class="border-l-2 border-primaryOrange border-dashed h-8 opacity-70"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItineraryStore } from "@/stores/itinerary";

const itineraryStore = useItineraryStore();
</script>

<style lang="scss" scoped></style>
