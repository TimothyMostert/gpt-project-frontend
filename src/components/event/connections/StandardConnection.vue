<template>
  <div class="translate-x-5 my-8 w-full flex justify-left items-center">
    <div class="border-l-4 border-white md:border-primaryBlue md:border-3 border-dashed h-20 md:h-24 opacity-70"></div>
    <div class="p-4 cursor-pointer" v-if="userStore.isLoggedIn">
      <div
        class="rounded md:hidden font-bold text-white w-fit flex gap-2 items-center border-2 border-primaryOrange p-2 bg-gradient-to-bl from-primaryOrange to-secondaryOrange hover:bg-primaryOrange/20 transition-all"
      >
        <i class="fa-solid fa-plus"></i>
        <span class="text-xs whitespace-nowrap" @click="tripStore.addEvent(order)"> Add new stop </span>
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
