<template>
  <div class="flex flex-col gap-8 md:gap-12 p-6 md:p-0">
    <div class="flex justify-between items-center">
      <h1 class="text-base font-semibold leading-6 text-gray-900">Recent trips</h1>
      <div
        @click="goRoute('explore')"
        class="text-gray-800 text-xs px-4 py-2 cursor-pointer rounded flex items-center justify-center border border-gray-800 hover:bg-primaryOrange/20 transition-all"
      >
        Explore more trips
      </div>
    </div>
    <div :class="'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6'">
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
import BaseButton from "@/components/base/BaseButton.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const dashboardStore = useDashboardStore();
const router = useRouter();

const props = defineProps({
  cols: {
    type: Number,
    default: 1,
  },
});

const goRoute = (route) => {
  router.push({ name: route });
};

onMounted(async () => {
  dashboardStore.searchPopularTrips({
    page: 1,
    perPage: 12,
  });
});
</script>

<style lang="scss" scoped></style>
