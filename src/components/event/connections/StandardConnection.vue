<template>
  <div class="translate-x-5 my-8 w-full flex justify-left items-center">
    <div class="border-l-2 border-primaryOrange border-dashed h-12 opacity-70"></div>
    <div class="p-4 cursor-pointer" v-if="userStore.isLoggedIn">
      <div
        class="rounded font-bold text-primaryOrange w-fit flex gap-2 items-center border-2 border-primaryOrange p-2 bg-primaryOrange/10 hover:bg-primaryOrange/20 transition-all"
      >
        <i class="fa-solid fa-plus"></i>
        <span class="text-xs whitespace-nowrap" @click="tripStore.addEvent(order)"> Add Event </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTripStore } from '@/stores/trip';
import { useUserStore } from '@/stores/user';

defineProps({
  order: Number,
});

const userStore = useUserStore();
const tripStore = useTripStore();

</script>
