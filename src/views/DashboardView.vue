<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import DashboardColumns from "@/components/dashboard/DashboardColumns.vue";
</script>

  <template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Dashboard</h1>
        <DashboardColumns />
      </div>
    </main>
  </DashboardLayout>
</template>
