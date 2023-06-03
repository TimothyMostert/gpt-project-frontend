<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import NewContentButton from "@/components/ui/NewContentButton.vue";
import TripCard from "@/components/ui/TripCard.vue";
import { ref, onMounted } from "vue";
import { useTripStore } from "@/stores/trip";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(async () => {
  userStore.user_trips();
});

</script>

  <template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Page title</h1>
        <!-- Main 3 column grid -->
        <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">

          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 class="sr-only" id="section-1-title">Section title</h2>
              <div class="overflow-hidden rounded-lg bg-white shadow">
                <div class="p-6 flex flex-wrap md:flex-nowrap w-full gap-6">
                  <NewContentButton class="w-full" text="Create a new trip" route="trip-create" image="rocket" />
                  <NewContentButton class="w-full" text="Explore trips" route="explore" image="search" />
                </div>
                <div class="hidden md:block p-6">
                  <h1 class="text-base font-semibold leading-6 text-gray-900 mb-6">Popular trips</h1>
                  <div class="grid grid-cols-2 gap-6">
                    <div class="col-span-1 rounded-lg bg-gray-200 h-80"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-80"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-80"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-80"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right column -->
          <div class="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 class="sr-only" id="section-2-title">Saved trips</h2>
              <div class="overflow-hidden rounded-lg bg-white shadow p-6">
                <div class="sm:flex-auto">
                  <h1 class="text-base font-semibold leading-6 text-gray-900">Your trips</h1>
                  <!-- <p class="mt-2 text-sm text-gray-700">A list of all the trips in your account.</p> -->
                </div>
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="trip in userStore.trips" :key="trip.title" class="px-4 py-4 sm:px-0">
                    <TripCard :trip="trip" />
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>
