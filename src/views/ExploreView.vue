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
      <div class="bg-white rounded-lg p-6 md:p-8">
        <h1 class="sr-only">Page title</h1>
        <!-- Main 3 column grid -->
        <div class="">

          <!-- full column -->
          <div class="w-full">
            <section aria-labelledby="section-1-title">
              <h2 class="sr-only" id="section-1-title">Section title</h2>
                <h1 class="text-base font-semibold leading-6 text-gray-900 mb-6">Explore trips</h1>
                  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="col-span-1 rounded-lg bg-gray-200 h-60"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-60"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-60"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-60"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-60"></div>
                    <div class="col-span-1 rounded-lg bg-gray-200 h-60"></div>
              </div>
            </section>
          </div>

        </div>
      </div>
      </div>
    </main>
  </DashboardLayout>
</template>
