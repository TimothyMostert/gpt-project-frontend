<template>
  <Dialog
    as="div"
    class="lg:hidden"
    @close="closeMenu()"
    :open="props.open"
  >
    <div class="fixed inset-0 z-50" />
    <DialogPanel
      class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
    >
      <div class="flex items-center justify-between">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Dreamtrip</span>
          <img
            class="h-8 w-auto"
            src="@/assets/images/dreamtrip_logo_clear_tight.webp"
            alt="dream trip logo, a plane flies through the sunrise, orange and blue"
          />
        </a>
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          @click="closeMenu()"
        >
          <span class="sr-only">Close menu</span>
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <NavigationLinks class="space-y-2 py-6" />
          <div class="py-6">
            <a
              v-if="!userStore.isLoggedIn"
              @click="goRoute('login')"
              class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >Log in</a
            >
            <a
              v-else
              @click="userStore.logout()"
              class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >Log out</a
            >
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
</template>

<script setup>
import { Dialog, DialogPanel } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import NavigationLinks from "./NavigationLinks.vue";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(['update:open']);

const closeMenu = () => {
    emit('update:open', false);
};

const goRoute = (route) => {
  router.push({ name: route });
};
</script>
