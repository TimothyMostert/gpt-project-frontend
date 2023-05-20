<template>
  <div
    class="controls flex justify-around bg-gray-100 border-primaryBlue rounded-t-2xl w-4/5 text-xs"
  >
    <button
      v-for="control in controls"
      :key="control.name"
      :class="[
        'h-full w-full px-2 py-1 text-xs text-gray-600 rounded-t-2xl',
        { 'font-semibold isolate after:bg-primaryBlue/50 text-primaryBlue after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20': control.name === currentView },
      ]"
      @click="changeView(control.name)"
    >
      {{ control.label }}
    </button>
  </div>
</template>

<script setup>

const props = defineProps({
  currentView: {
    type: String,
    required: true,
  },
  event: Object,
});

const controls = [
  { name: "overview", label: "Overview" },
   { name: "images", label: "Images" },
//   { name: "booking", label: "Booking" },
//   { name: "socialMedia", label: "Social Media" },
  { name: "edit", label: "Edit" },
];

const changeView = (view) => {
  // update event prop current view
  props.event.currentView = view;
};
</script>
