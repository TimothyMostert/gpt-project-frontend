<template>
    <button
      class="px-4 py-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      @click="click()"
    >
      <slot />
    </button>
</template>

<script setup>

const emit = defineEmits(['click'])

const click = () => {
  emit('click')
}

</script>

<style lang="scss" scoped>

</style>