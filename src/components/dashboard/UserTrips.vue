<template>
    <section aria-labelledby="section-2-title">
        <h2 class="sr-only" id="section-2-title">Saved trips</h2>
        <div class="overflow-hidden rounded-lg bg-white shadow p-6">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Your trips</h1>
            <!-- <p class="mt-2 text-sm text-gray-700">A list of all the trips in your account.</p> -->
          </div>
          <ul role="list" class="divide-y divide-gray-200 max-h-[800px] overflow-scroll no-scrollbar">
            <li
              v-for="trip in userStore.trips.data"
              :key="'user-trip-'+trip.title"
              class="py-4 sm:px-0"
            >
              <UserTripCard :trip="trip" />
            </li>
          </ul>
        </div>
      </section>
</template>

<script setup>
import UserTripCard from "@/components/ui/UserTripCard.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(async () => {
  userStore.user_trips();
});

</script>

<style lang="scss" scoped>

</style>