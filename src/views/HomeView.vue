<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import router from "@/router";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const goRoute = (route) => {
  router.push(route);
};
</script>

<template>
  <MainLayout>
    <main class="bg-white mb-auto">
      <div class="p-4 pt-0 max-w-md flex flex-col gap-4 h-full mx-auto">
        <select v-model="userStore.selectedModel" name="model" id="select-model">
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4">gpt-4</option>
        </select>
        <BaseButton
          @click="goRoute('/prompt')"
          class="bg-primaryOrange text-white rounded-lg px-4 py-2 mt-auto"
        >
          Create New Itinerary
        </BaseButton>
      </div>
    </main>
  </MainLayout>
</template>
