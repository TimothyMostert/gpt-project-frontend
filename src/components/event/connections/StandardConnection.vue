<template>
  <div class="translate-x-5 my-8 w-full flex justify-left items-center">
    <div class="border-l-2 border-primaryOrange border-dashed h-12 opacity-70"></div>
    <div class="p-4 cursor-pointer">
      <div
        class="rounded font-bold text-primaryOrange w-fit flex gap-2 items-center border-2 border-primaryOrange p-2 bg-primaryOrange/10 hover:bg-primaryOrange/20 transition-all"
      >
        <i class="fa-solid fa-plus"></i>
        <span class="text-xs whitespace-nowrap" @click="itineraryStore.addEvent(order)"> Add Event </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useItineraryStore } from '@/stores/itinerary';

defineProps({
  order: Number,
});

const itineraryStore = useItineraryStore();

</script>
