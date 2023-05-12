<template>
    <div
  class="p-4 isolate after:bg-location-1 after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20"
>
  <h2 class="font-bold text-gray-700">Create your new event!</h2>
  <p class="text-xs text-gray-600">Describe anything you might like to try</p>
</div>
<div class="p-4 flex flex-col gap-4">
    <BaseTextArea 
        v-model="event.editPrompt"
        label="Describe your event here"
        custom-class="border-2 py-2 h-32"
        placeholder="eg: I want to relax at the beach"
        ></BaseTextArea>
        <BaseInput
        v-model="event.editLocation"
        label="Location (optional)"
        custom-class="border-2 py-2"
        placeholder="eg: Cape Town, South Africa"
        ></BaseInput>
        <BaseButton @click="fillEvent" class="bg-primaryOrange text-white rounded-lg px-4 py-2 mt-auto">Create</BaseButton>
    </div>
</template>

<script setup>
import BaseTextArea from "@/components/base/BaseTextArea.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

import { useItineraryStore } from "@/stores/itinerary";

const props = defineProps({
event: Object,
});

const itineraryStore = useItineraryStore();

const fillEvent = () => {
itineraryStore.fillEvent(props.event.order);
}

</script>