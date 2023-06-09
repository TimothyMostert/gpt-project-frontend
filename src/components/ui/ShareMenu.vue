<template>
  <TransitionRoot as="template" :show="stateStore.ui.showShareMenu">
    <Dialog as="div" class="relative z-10" @close="stateStore.ui.showShareMenu = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 backdrop-blur bg-primaryBlue bg-opacity-20 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div @click="stateStore.ui.showShareMenu = false" class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div class="text-xs font-semibold leading-6 text-gray-400">Share</div>
              <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <ShareNetwork
                    :class="[
                      item.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                    ]"
                    v-for="item in networks"
                    :key="item.name"
                    :network="item.network"
                    :url="currentUrl"
                    :title="'Check out this trip I made on dreamtrip.io! -' + tripStore.trip.title"
                  >
                    Share on {{ item.name }}
                  </ShareNetwork>
                  <div @click="copyToClipboard" class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                    Copy to clipboard
                  </div>
              </ul>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { computed } from "vue";
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { useTripStore } from "@/stores/trip";
import { useStateStore } from "@/stores/state";

const stateStore = useStateStore();
const tripStore = useTripStore();

const currentUrl = computed(() => {
  return window.location.href;
});

const networks = [
  { name: "Facebook", network: "facebook" },
  { name: "Whatsapp", network: "whatsapp" },
];

const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl.value).then(() => {
      console.log("Copying to clipboard was successful!");
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
    stateStore.ui.showShareMenu = false
}
</script>
