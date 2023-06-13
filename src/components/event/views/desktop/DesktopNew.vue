<template>
  <div class="w-full h-full min-h-[500px] flex flex-col gap-4 p-6">
    <div class="">
      <h2 class="font-bold text-gray-700">Create your new event!</h2>
      <p class="text-xs text-gray-600">Describe anything you might like to try</p>
    </div>
    <div class="flex flex-col gap-4 h-full">
      <div class="mb-4">
        <label for="comment" class="block text-sm font-medium leading-6 text-gray-900"
          >Describe your new event</label
        >
        <div class="mt-2">
          <textarea
            v-model="event.editPrompt"
            rows="4"
            name="comment"
            id="comment"
            placeholder="eg: I want to relax at the beach"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="flex justify-between">
        <label for="location" class="block text-sm font-medium leading-6 text-gray-900"
          >Location</label
        >
        <span class="text-sm leading-6 text-gray-500" id="email-optional">Optional</span>
      </div>
      <div>
        <input
          v-model="event.editLocation"
          type="location"
          name="location"
          id="location"
          placeholder="eg: Cape Town, South Africa"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          aria-describedby="email-optional"
        />
      </div>
      <div class="w-full flex gap-4 justify-end mt-auto">
        <BaseButton
          @click="deleteEvent"
          class="rounded font-bold text-red-500 w-fit flex gap-2 items-center border border-red-500 bg-red-200 hover:bg-red-400 transition-all"
          >Delete</BaseButton
        >
        <BaseButton
          @click="fillEvent"
          class="rounded font-bold text-white w-fit flex gap-2 items-center border-2 border-primaryBlack p-2 bg-gradient-to-bl from-primaryBlack to-secondaryBlack transition-all"
          >Create</BaseButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { useTripStore } from "@/stores/trip";

const props = defineProps({
  event: Object,
});

const tripStore = useTripStore();

// set the default editLocation to the event with the previous order
props.event.editLocation = ""

const deleteEvent = () => {
  tripStore.deleteEvent(props.event.order);
};

const fillEvent = () => {
  tripStore.fillEvent(props.event.order);
};
</script>
