<template>
  <div class="w-full h-full">
     <div
     class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
    >
      <h2 class="font-bold text-gray-700">Edit</h2>
      <p class="text-xs text-gray-600">Dont like this event, lets update it!</p>
    </div>
    <div class="p-4 flex flex-col gap-4 h-[calc(100%-70px)]">
        <BaseTextArea 
        v-model="event.editPrompt"
        label="Describe your changes"
        custom-class="border-2 py-2 h-32"
        placeholder="eg: I want to relax at the beach"
        ></BaseTextArea>
        <BaseInput
        v-model="event.editLocation"
        label="New location (optional)"
        custom-class="border-2 py-2"
        placeholder="eg: Cape Town, South Africa"
        ></BaseInput>
        <BaseButton @click="editEvent" class="bg-primaryOrange text-white rounded-lg px-4 py-2 mt-auto">Update</BaseButton>
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
props.event.editLocation =  props.event.location.name;

const editEvent = () => {
  tripStore.editEvent(props.event.id);
}

</script>

<style lang="scss" scoped>

</style>