<template>
    <div>
                <img
                  v-if="props.user.avatar"
                  class="inline-block h-9 w-9 rounded-full"
                  referrerpolicy="no-referrer"
                  :src="props.user.avatar"
                  alt="Social profile photo"
                />
                <img
                  v-else
                  class="inline-block h-9 w-9 rounded-full"
                  src="@/assets/images/default-avatar.png"
                  alt=""
                />
              </div>
</template>

<script setup>

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

</script>

<style lang="scss" scoped>

</style>