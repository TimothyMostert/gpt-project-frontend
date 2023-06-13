<template>
  <div class="hidden border-t border-white border-opacity-20 py-5 lg:block">
    <div class="grid grid-cols-3 items-center gap-8">
      <div class="col-span-2">
        <nav class="flex space-x-4">
          <div
            v-for="item in navigation"
            :key="item.name"
            @click="goRoute(item.action)"
            :class="[
              item.current ? 'text-white' : 'text-indigo-100',
              'rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10 cursor-pointer',
            ]"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigation = [
  { name: "Dashboard", action: "dashboard", current: true },
  { name: "Create Trip", action: "create", current: false },
  { name: "Explore Trips", action: "explore", current: false },
];

const goRoute = (route) => {
  router.push({ name: route });
};
</script>

<style lang="scss" scoped></style>
