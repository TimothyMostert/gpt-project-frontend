<script setup>
import MainLayout from "@/components/layouts/MainLayout.vue";
import PromptContainer from "@/components/prompt/PromptContainer.vue";
import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import ErrorDisplay from "@/components/ui/Error.vue";

import { useErrorStore } from "@/stores/error";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const errorStore = useErrorStore();

</script>

<template>
  <MainLayout>
    <main class="bg-white mb-auto">
      <div class="p-4 pt-0 max-w-md flex flex-col gap-4 h-full mx-auto">
        <Breadcrumbs />
        <PromptContainer />
        <ErrorDisplay v-if="errorStore.isError" class="mt-8" />
      </div>
    </main>
  </MainLayout>
</template>
