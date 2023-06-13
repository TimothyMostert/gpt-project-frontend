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
                <h2 class="sr-only" id="section-1-title">Explore Trips</h2>
                <div class="flex justify-between items-center mb-6 md:mb-8">
                  <h1 class="text-base font-semibold leading-6 text-gray-900">
                    Explore trips
                  </h1>
                  <div
                    @click="goRoute('create')"
                    class="text-gray-800 text-xs px-4 py-2 cursor-pointer rounded flex items-center justify-center border border-gray-800 hover:border-primaryBlue hover:text-primaryBlue transition-all"
                  >
                    Create new trip
                  </div>
                </div>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ExploreTripCard
                    v-for="trip in exploreStore.displayedTrips"
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
import { useRouter } from "vue-router";
import { onMounted } from "vue";

import { useExploreStore } from "@/stores/explore";

const router = useRouter();
const exploreStore = useExploreStore();

// On component mount, search for the trips with the defined parameters
onMounted(async () => {
  await exploreStore.searchTrips({
    page: 1,
    perPage: 112,
  });
});

// Go to the route passed as parameter
const goRoute = (route) => {
  router.push({ name: route });
};

// Use the actions from the store directly in your component
const backPage = exploreStore.backPage;
const nextPage = exploreStore.nextPage;
</script>
