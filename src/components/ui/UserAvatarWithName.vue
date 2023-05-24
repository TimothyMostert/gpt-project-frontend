<template>
    <div class="flex items-center">
              <UserAvatar :user="props.user" class="h-9 w-9 rounded-full cursor-pointer" />
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  {{ props.user.name }}
                </p>
                <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
</template>

<script setup>

import UserAvatar from "@/components/ui/UserAvatar.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

</script>

<style lang="scss" scoped>

</style>