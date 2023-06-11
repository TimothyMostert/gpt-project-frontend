<template>
  <div>
    <a
      @click="stateStore.ui.showShareMenu = true"
      :class="[
        'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
      ]"
    >
      <UserPlusIcon
        class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      Share
    </a>
    <ShareMenu v-if="stateStore.ui.showShareMenu" />
  </div>
</template>

<script setup>
import { UserPlusIcon } from "@heroicons/vue/20/solid";
import ShareMenu from "@/components/ui/ShareMenu.vue";
import { useStateStore } from "@/stores/state";

const stateStore = useStateStore();
</script>

<style lang="scss" scoped></style>
