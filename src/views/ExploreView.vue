
<template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="bg-white rounded-lg p-6 md:p-8">
          <h1 class="sr-only">Page title</h1>
          <!-- Main 3 column grid -->
          <div class="">
            <!-- full column -->
            <div class="w-full">
              <section aria-labelledby="section-1-title">
                <h2 class="sr-only" id="section-1-title">Section title</h2>
                <h1 class="text-base font-semibold leading-6 text-gray-900 mb-6">
                  Explore trips
                </h1>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ExploreTripCard
                    v-for="trip in exploreStore.trips"
                    :key="'popular-trip-' + trip.id"
                    :trip="trip"
                    class="col-span-1 rounded-lg h-60"
                  ></ExploreTripCard>
                </div>
                <div class="py-4 flex justify-end gap-2 items-center w-full">
                  <!-- pagintion buttons -->
                  <a
                    @click="backPage"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-primaryBlue/20 hover:bg-primaryBlue hover:text-white"
                    >Previous</a
                  >
                  <a
                    @click="nextPage"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-primaryOrange/20 hover:bg-primaryOrange hover:text-white"
                    >Next</a
                  >
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import ExploreTripCard from "@/components/ui/ExploreTripCard.vue";
import { ref, onMounted } from "vue";

import { useExploreStore } from "@/stores/explore";

const exploreStore = useExploreStore();

onMounted(async () => {
  await exploreStore.searchTrips({
    page: 1,
    perPage: 6,
  });
});

const backPage = async () => {
  const result = await exploreStore.searchTrips({
    page: exploreStore.currentPage - 1,
    perPage: 6,
  });
};

const nextPage = async () => {
  const result = await exploreStore.searchTrips({
    page: exploreStore.currentPage + 1,
    perPage: 6,
  });
};

</script>
