<template>
    <div class="rounded-lg shadow-2xl bg-white p-4">
        <h1 class="text-lg md:text-xl text-primaryBlue font-bold tracking-wide text-center">
            {{ tripStore.trip.title }}
        </h1>
        <!-- <TripTools /> -->
    </div>
</template>

<script setup>
import { useTripStore } from '@/stores/trip';
import TripTools from './TripTools.vue';

const tripStore = useTripStore();

</script>