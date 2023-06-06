<template>
    <div class="rounded-lg shadow-2xl bg-white p-4 md:p-8">
        <h1 class="text-lg md:text-xl lg:text-2xl text-primaryBlue font-bold tracking-wide text-left mb-2 md:mb-4">
            {{ tripStore.trip.title.replace(/^"|"$/g, '') }}
        </h1>
        <div class="flex gap-4 items-center">
        <TripTools />
        <RatingDropdown />
        </div>
    </div>
</template>

<script setup>
import { useTripStore } from '@/stores/trip';
import TripTools from './TripTools.vue';
import RatingDropdown from '../ui/RatingDropdown.vue';

const tripStore = useTripStore();

</script>