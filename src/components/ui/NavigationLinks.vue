<template>
    <div>
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm font-semibold leading-6 text-gray-900"
            >{{ item.name }}</a
          >
        </div>
</template>

<script setup>

const navigation = [
  // { name: 'Product', href: '#' },
];

</script>

<style lang="scss" scoped>

</style>