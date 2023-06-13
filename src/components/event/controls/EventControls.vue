<template>
  <div
    ref="rootElement"
    class="controls flex justify-around bg-white shadow-xl border rounded-lg rounded-b-none text-xs w-fit"
  >
    <div
      class="w-full"
      v-for="control in controls"
      :key="'event-control-' + control.name"
    >
      <div
        v-if="control.isAvailable"
        :class="[
          'h-full w-full px-4 py-2 text-xs text-gray-600',
          {
            'font-semibold isolate after:bg-primaryBlue/50 text-primaryBlue after:inset-0 after:absolute after:rounded-t-lg after:-z-10 after:opacity-20':
              control.name === currentView,
          },
        ]"
        @click="changeView(control.name)"
      >
        <svg
          v-if="control.name == 'overview'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>

        <svg
          v-if="control.name == 'images'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          :class="{ 'text-primaryBlue': control.name === currentView, 'pulse': justLoaded }"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        <svg
          v-if="control.name == 'edit'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useTripStore } from "@/stores/trip";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const tripStore = useTripStore();

const rootElement = ref(null);

// just loaded
const justLoaded = ref(true);
setTimeout(() => {
  justLoaded.value = false;
}, 10000);

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
    { name: "edit", label: "Edit", isAvailable: userStore.isLoggedIn && tripStore.isUserTrip },
  ];
});

const changeView = (view) => {
  if (view === props.currentView) return;
  if (view === 'images') {
    justLoaded.value = false;
  }
  const event = tripStore.findEventById(props.event.id);
  // update the current view of the event
  if (event) {
    event.currentView = view;
  }
};
</script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(1);
    color: rgb(75, 85, 99);
    filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
  }
  70% {
    transform: scale(1.05);
    color: #0D518C;
    filter: drop-shadow(0px 0px 10px rgba(13, 81, 140, 0.5));
  }
  100% {
    transform: scale(1);
    color: rgb(75, 85, 99);
    filter: drop-shadow(0px 0px 0px rgba(0, 0, 0, 0));
  }
}

.pulse {
  animation: pulse 2s infinite;
}
</style>
