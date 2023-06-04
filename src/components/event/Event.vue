<template>
  <article>
    <EventContols
      v-if="event.currentView != 'loading' && event.currentView != 'new'"
      :current-view="event.currentView"
      :event="props.event"
    />
    <div class="no-scrollbar relative rounded-lg rounded-tl-none shadow-2xl bg-white">
      <Loading v-if="event.currentView == 'loading'" :event="props.event" key="loading" />
      <New v-if="event.currentView == 'new'" :event="props.event" key="new" />
      <div
        class=""
        v-if="
          event.currentView == 'overview' ||
          event.currentView == 'images' ||
          event.currentView == 'edit'
        "
      >
        <carousel
          class="story-carousel story-carousel--colors h-fit"
          ref="carouselRef"
          :items-to-show="1"
          @slide-start="slideTransition"
          :transition="100"
        >
          <slide class="story-carousel__slide h-fit">
            <div class="no-scrollbar relative w-full text-left">
              <Overview :event="props.event" key="overview" />
            </div>
          </slide>
          <slide class="story-carousel__slide h-fit">
            <div class="no-scrollbar relative w-full text-left">
              <Images :event="props.event" key="images" />
            </div>
          </slide>
          <slide v-if="userStore.isLoggedIn" class="story-carousel__slide h-fit">
            <div class="no-scrollbar relative w-full text-left">
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
import { ref, nextTick, watchEffect } from "vue";
import EventContols from "./controls/EventControls.vue";
import Loading from "./views/Loading.vue";
import Overview from "./views/Overview.vue";
import Edit from "./views/Edit.vue";
import New from "./views/New.vue";
import Images from "./views/Images.vue";

import Api from "@/services/Api.service.js";
import { useTripStore } from "@/stores/trip.js";
import { useUserStore } from "@/stores/user.js";

import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";

const userStore = useUserStore();

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

const fetchImages = async () => {
  if (props.event.location.photo_references && props.event.location.photo_references.length > 0) {
    console.log("Already have photos");
    return;
  } else if (props.event.location.photo_references && props.event.location.photo_references.length == 0) {
    console.log("No photos");
    return;
  }
  const location = props.event.location.name;
  try {
    const response = await Api.fetchLocationPhotos({
      location: location,
    });

    if (!response.data.location.photo_references) {
      console.log("No photos");
      return;
    }

    const tripStore = useTripStore();
    const eventIndex = tripStore.trip.events.findIndex(
      (event) => event.id === props.event.id
    );

    if (eventIndex > -1) {
      tripStore.updateEvent(
        eventIndex,
        { location: response.data.location },
        "ignore"
      );
    }
  } catch (error) {
    console.error("Error fetching location photos:", error);
    return [];
  }
};

watchEffect(async () => {
  scroll(carouselOrder.indexOf(props.event.currentView));
  if (props.event.currentView == "images") {
    fetchImages();
  }
});

// expose the scroll function so it can be used in the template
defineExpose({
  scroll,
});
</script>

<style scoped>
.carousel__slide {
  height: fit-content !important;
}
</style>
