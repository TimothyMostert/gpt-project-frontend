<template>
  <div
    class="controls flex justify-around bg-gray-100 border-primaryBlue rounded-t-lg text-xs w-fit"
  >
    <div class="w-full" v-for="control in controls" :key="'event-control-'+control.name">
      <button
        v-if="control.isAvailable"
        :class="[
          'h-full w-full px-6 py-1 text-xs text-gray-600 rounded-t-2xl',
          {
            'font-semibold isolate after:bg-primaryBlue/50 text-primaryBlue after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20':
              control.name === currentView,
          },
        ]"
        @click="changeView(control.name)"
      >
        {{ control.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTripStore } from "@/stores/trip";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const tripStore = useTripStore();

const props = defineProps({
  currentView: {
    type: String,
    required: true,
  },
  event: Object,
});

// controls with computed props
const controls = computed(() => {
  return [
    { name: "overview", label: "Overview", isAvailable: true },
    { name: "images", label: "Images", isAvailable: true },
    { name: "edit", label: "Edit", isAvailable: userStore.isLoggedIn },
  ];
});

const changeView = (view) => {
  const event = tripStore.findEventById(props.event.id);

  // update the current view of the event
  if (event) {
    event.currentView = view;
  }
};
</script>
