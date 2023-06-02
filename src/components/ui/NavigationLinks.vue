<template>
        <div class="hidden border-t border-white border-opacity-20 py-5 lg:block">
          <div class="grid grid-cols-3 items-center gap-8">
            <div class="col-span-2">
              <nav class="flex space-x-4">
                <div v-for="item in navigation" :key="item.name" @click="goRoute(item.action)" :class="[item.current ? 'text-white' : 'text-indigo-100', 'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</div>
              </nav>
            </div>
          </div>
        </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigation = [
  { name: 'Dashboard', action: 'user-dashboard', current: true },
  { name: 'Create Trip', action: 'trip-create', current: false },
  { name: 'Browse Trips', action: 'trip-browse', current: false },
];

const goRoute = (route) => {
  router.push({ name: route });
};

</script>

<style lang="scss" scoped>

</style>