<template>
  <article>
    <EventContols
      v-if="event.currentView != 'loading' && event.currentView != 'new'"
      :current-view="event.currentView"
      :event="props.event"
    />
    <div class="no-scrollbar relative rounded-lg shadow-2xl h-[500px] ">
      <Loading v-if="event.currentView == 'loading'" :event="props.event" key="loading" />
      <New v-if="event.currentView == 'new'" :event="props.event" key="new" />
      <div
        v-if="
          event.currentView == 'overview' ||
          event.currentView == 'images' ||
          event.currentView == 'edit'
        "
      >
        <carousel
          class="story-carousel story-carousel--colors "
          ref="carouselRef"
          :items-to-show="1"
          @slide-start="slideTransition"
          :transition="100"
        >
          <slide class="story-carousel__slide ">
            <div
              class="no-scrollbar relative h-[500px] w-full overflow-auto text-left"
            >
              <Overview :event="props.event" key="overview" />
            </div>
          </slide>
          <slide class="story-carousel__slide ">
            <div
              class="no-scrollbar relative h-[500px] w-full  text-left"
            >
              <Images :event="props.event" key="images" />
            </div>
          </slide>
          <slide class="story-carousel__slide ">
            <div
              class="no-scrollbar relative h-[500px] w-full  text-left"
            >
              <Edit :event="props.event" key="edit" />
            </div>
          </slide>
          <!-- <template #addons>
            <navigation />
            <pagination />
          </template> -->
        </carousel>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, nextTick, watch } from "vue";
import EventContols from "./controls/EventControls.vue";
import Loading from "./views/Loading.vue";
import Overview from "./views/Overview.vue";
import Edit from "./views/Edit.vue";
import New from "./views/New.vue";
import Images from "./views/Images.vue";

import Api from "@/services/Api.service.js";
import { useItineraryStore } from "@/stores/itinerary.js";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";

const props = defineProps({
  event: Object,
});

let carouselRef = ref(null);

const carouselOrder = ["overview", "images", "edit"];

const scroll = async (index) => {
  if (index != undefined) {
    await nextTick();
    carouselRef.value.slideTo(index);
  }
};

const slideTransition = (data) => {
  if (data.slidingToIndex == undefined) return;
  props.event.currentView = carouselOrder[data.slidingToIndex];
};

watch(
  props.event,
  async (newVal, oldVal) => {
    scroll(carouselOrder.indexOf(newVal.currentView));
    if (newVal.currentView == "images") {
      fetchImages();
    }
  },
  { deep: true }
);

const fetchImages = async () => {
  if (props.event.photos && props.event.photos.length > 0) {
    console.log("Already have photos");
    return;
  } else if (props.event.photos && props.event.photos.length == 0) {
    console.log("No photos");
    return;
  }
  const location = props.event.location.name;
  try {
    const response = await Api.fetchLocationPhotos({
      location: location,
    });
    const itineraryStore = useItineraryStore();
    const eventIndex = itineraryStore.itinerary.events.findIndex(
      (event) => event.id === props.event.id
    );

    if (eventIndex > -1) {
      itineraryStore.updateEvent(
        eventIndex,
        { photos: response.data.photoReferences },
        "ignore"
      );
    }
  } catch (error) {
    console.error("Error fetching location photos:", error);
    return [];
  }
};

// expose the scroll function so it can be used in the template
defineExpose({
  scroll,
});
</script>

<style scoped></style>
