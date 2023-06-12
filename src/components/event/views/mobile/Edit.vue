<template>
  <div class="w-full h-full min-h-[500px] flex flex-col">
    <div
      class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
    >
      <h2 class="font-bold text-gray-700">Edit</h2>
      <p class="text-xs text-gray-600">Dont like this event, lets update it!</p>
    </div>
    <div class="p-4 flex flex-col h-[470px]">
      <div class="mb-4">
        <label for="comment" class="block text-sm font-medium leading-6 text-gray-900"
          >Describe your changes</label
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
      <div class="mt-2">
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
      <div class="w-full flex justify-end mt-auto">
        <BaseButton
          @click="editEvent"
          class="rounded font-bold text-white w-fit flex gap-2 items-center border-2 border-primaryBlack p-2 bg-gradient-to-bl from-primaryBlack to-secondaryBlack hover:bg-primaryOrange/20 transition-all mt-auto"
          >Update</BaseButton
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

const tripStore = useTripStore();

const props = defineProps({
  event: Object,
});

// set the default editLocation to the current location
props.event.editLocation = props.event.location.name;

const editEvent = () => {
  tripStore.editEvent(props.event.id);
};
</script>

<style lang="scss" scoped></style>
