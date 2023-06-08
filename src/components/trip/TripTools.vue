<template>
  <div>
    <div class="relative inline-block text-left w-full mt-4">

        <div
          class="flex gap-2 z-10 w-full divide-x divide-gray-300 rounded-md"
        >
          <!-- <div class=" w-fit">
              <a
                
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 lg:pl-0 py-2 text-sm md:text-xs lg:text-sm',
                ]"
              >
                <PencilSquareIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Edit
              </a>
          </div> -->
          <div class="w-fit">
              <a
                
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 lg:pl-1 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
                ]"
              >
                <ArrowRightCircleIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Open in maps
              </a>
          </div>
          <div class="">
              <a
                @click="stateStore.ui.showShareMenu = true"
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
                ]"
              >
                <UserPlusIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Share
              </a>
          </div>
              <div class="">
              <a
                
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
                ]"
              >
                <HeartIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Add to favorites
              </a>
          </div>
          <div class="">
              <a
                
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
                ]"
              >
                <TrashIcon
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Delete
              </a>
          </div>
          <div class="">
              <a
                
                :class="[
                  'text-gray-700 group flex items-center px-4 md:px-2 lg:px-4 py-2 text-sm md:text-xs lg:text-sm whitespace-nowrap',
                ]"
              >
                <RatingDropdown class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"/>
              </a>
          </div>
        </div>
    </div>
    <ShareMenu v-if="stateStore.ui.showShareMenu" />
  </div>
</template>

<script setup>
import {
  ArrowRightCircleIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/vue/20/solid";
import { useTripStore } from "@/stores/trip";
import { useStateStore } from "@/stores/state";
import ShareMenu from "@/components/ui/ShareMenu.vue";
import RatingDropdown from '@/components/ui/RatingDropdown.vue';


const tripStore = useTripStore();
const stateStore = useStateStore();
</script>
