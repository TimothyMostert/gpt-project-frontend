<template>
    <div class="rounded-md shadow-2xl bg-white p-4 md:p-8" >
        <h1 class="text-lg md:text-xl lg:text-2xl text-primaryBlue font-bold tracking-wide text-left md:line-clamp-2">
            {{ tripStore.trip.title.replace(/^"|"$/g, '') }}
        </h1>
        <slot></slot>
    </div>
</template>

<script setup>
import { useTripStore } from '@/stores/trip';

const tripStore = useTripStore();

</script>