<template>
    <div class="flex justify-between items-center">
    <div class="flex items-center justify-between">
      <div class="font-medium text-gray-900">Tokens</div>
      <dd class="font-medium text-primaryBlue ml-4 px-2 py-1 border rounded">{{ userStore.tokens }}</dd>
    </div>
    <div class="text-green-900 px-2 py-1 rounded-md hover:bg-green-300 hover:border">
        Purchase tokens
    </div>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
