<template>
  <div class=" p-6">
    <h1 class="text-base font-semibold leading-6 text-gray-900 mb-6">Popular trips</h1>
    <div  :class="'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6'">
      <ExploreTripCard
        v-for="trip in dashboardStore.popularTrips"
        :key="'popular-trip-' + trip.id"
        :trip="trip"
        class="col-span-1 rounded-lg"
      ></ExploreTripCard>
    </div>
  </div>
</template>

<script setup>
import ExploreTripCard from "@/components/ui/ExploreTripCard.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { onMounted } from "vue";

const dashboardStore = useDashboardStore();

const props = defineProps({
  cols: {
    type: Number,
    default: 1,
  },
});

onMounted(async () => {
  dashboardStore.searchPopularTrips({
    page: 1,
    perPage: 12,
  });
});
</script>

<style lang="scss" scoped></style>
