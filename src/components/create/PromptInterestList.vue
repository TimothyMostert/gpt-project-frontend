<template>
  <div class="">
    <div v-for="category in Object.keys(tags)" :key="category" class="border-b py-4">
      <h1 class="flex justify-between items-center">
        <div v-if="showDetails !== category" @click="showDetails = category" class="w-full flex justify-between items-center">
          <span class="md:text-lg" :class="showDetails === category ? 'text-[#ac6411]' : 'text-gray-700'">
          {{ formatTitle(category) }}
        </span>
        <img
          src="@/assets/images/icons/Circle.png"
          alt="circle icon"
        />
        </div>
        <div v-else @click="showDetails = ''" class="w-full flex justify-between items-center">
          <span class="md:text-lg" :class="showDetails === category ? 'text-[#ac6411]' : 'text-gray-700'">
          {{ formatTitle(category) }}
        </span>
        <img
          src="@/assets/images/icons/Close.png"
          alt="circle icon"
        />
        </div>
      </h1>
      <div v-show="showDetails === category" class="p-2 md:p-4 md:mr-6 grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-6">
        <PromptInterest
          v-for="interest in tags[category]"
          :key="interest.name"
          :interest="interest.name"
          :selectedColor="interest.selectedColor"
          :selectedTextColor="interest.selectedTextColor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import PromptInterest from "@/components/create/PromptInterest.vue";
import { useCreateStore } from "@/stores/create";
import travelTags from "@/assets/json/travelTags.json";

const createStore = useCreateStore();

const tags = travelTags;

const showDetails = ref(null);

// if (createStore.usedExample) {
//   showDetails.value = "ActivityType";
// }

// "PreferredClimate": [
//     { "name": "Tropical", "selectedColor": "bg-cyan-400", "selectedTextColor": "text-cyan-900" },
//     { "name": "Temperate", "selectedColor": "bg-amber-400", "selectedTextColor": "text-amber-900" },
//     { "name": "Cold", "selectedColor": "bg-blue-400", "selectedTextColor": "text-blue-900" },
//     { "name": "Dry", "selectedColor": "bg-orange-400", "selectedTextColor": "text-orange-900" }
//   ]

const formatTitle = (title) => {
  // break camel case and capitalize first letter lowercase rest
  return title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

</script>