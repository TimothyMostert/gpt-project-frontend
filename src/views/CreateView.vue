<script setup>
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import PromptContainer from "@/components/create/PromptContainer.vue";
import ErrorDisplay from "@/components/ui/Error.vue";
import Loader from "@/components/ui/Loader.vue";
import ModalLoader from "@/components/ui/ModalLoader.vue";

import { useErrorStore } from "@/stores/error";
import { useStateStore } from "@/stores/state";
import { useCreateStore } from "@/stores/create";

const stateStore = useStateStore();
const errorStore = useErrorStore();
const createStore = useCreateStore();

stateStore.prompt.step = 'prompt';
createStore.promptText = '';

</script>

<template>
  <DashboardLayout>
    <main class="-mt-20 md:-mt-24 pb-8">
      <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="max-w-md">
          <PromptContainer v-if="!errorStore.isError && !stateStore.isLoading" />
          <Loader class="md:hidden" v-if="stateStore.isLoading && !errorStore.isError" />
          <ModalLoader class="hidden md:block" v-if="stateStore.isLoading && !errorStore.isError" />
          <ErrorDisplay v-if="errorStore.isError" />
        </div>
      </div>
    </main>
  </DashboardLayout>
</template>
