<template>
  <article>
    <!-- mobile -->
    <EventContols
      v-if="event.currentView != 'loading' && event.currentView != 'new'"
      :current-view="event.currentView"
      :event="props.event"
      ref="stickyElement"
      class="md:hidden"
    />
    <div
      class="no-scrollbar relative rounded-lg rounded-tl-none shadow-xl bg-white md:hidden"
    >
      <Loading v-if="isLoading" :event="props.event" key="loading" />
      <Overview
        v-if="event.currentView == 'overview' && !isLoading"
        :event="props.event"
        key="overview"
      />
      <Images
        v-if="event.currentView == 'images' && !isLoading"
        :event="props.event"
        key="images"
      />
      <Edit
        v-if="event.currentView == 'edit' && !isLoading"
        :event="props.event"
        key="edit"
      />
      <New
        v-if="event.currentView == 'new' && !isLoading"
        :event="props.event"
        key="new"
      />
    </div>
    <!-- end mobile -->

    <!-- desktop -->
    <div class="hidden md:block rounded-lg shadow-xl bg-white">
      <DesktopLayout :event="props.event" key="desktop-layout" />
    </div>
    <!-- end desktop -->
  </article>
</template>

<script setup>
import { ref, computed } from "vue";
import EventContols from "./controls/EventControls.vue";
import Loading from "./views/mobile/Loading.vue";
import Overview from "./views/mobile/Overview.vue";
import Edit from "./views/mobile/Edit.vue";
import New from "./views/mobile/New.vue";
import Images from "./views/mobile/Images.vue";
import DesktopLayout from "./layouts/DesktopLayout.vue";

const props = defineProps({
  event: Object,
});

const isLoading = computed(() => {
  if (props.event.currentView == "loading") {
    return true;
  }
  if (props.event.currentView == "new" || props.event.currentView == "edit") {
    return false;
  }
  return (
    !props.event.description ||
    !props.event.activities ||
    !props.event.location ||
    props.event.activities.length === 0
  );
});

const stickyElement = ref(null);
// const stickyClass = ref("absolute right-0 z-10 md:hidden");

// const handleScroll = () => {
//   console.log(stickyElement)
//   let rect = stickyElement.value.getRootRect();
//   if (rect.top <= 0) {
//     stickyClass.value = "sticky top-0 right-0 z-10 md:hidden";
//   } else {
//     stickyClass.value = "absolute right-0 z-10 md:hidden";
//   }
// };

// onMounted(() => {
//   window.addEventListener("scroll", handleScroll);
// });

// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", handleScroll);
// });

// IF USING GOOGLE PLACES API
// const fetchImages = async () => {
//   // if not premium user, return
//   if (!userStore.isLoggedIn) {
//     return;
//   } else if (!userStore.user.premium) {
//     return;
//   }
//   if (props.event.location.photo_references && props.event.location.photo_references.length > 0) {
//     console.log("Already have photos");
//     return;
//   } else if (props.event.location.photo_references && props.event.location.photo_references.length == 0) {
//     console.log("No photos");
//     return;
//   }
//   const location = props.event.location.name;
//   try {
//     const response = await Api.fetchLocationPhotos({
//       location: location,
//     });

//     if (!response.data.location.photo_references) {
//       console.log("No photos");
//       return;
//     }

//     const tripStore = useTripStore();
//     const eventIndex = tripStore.trip.events.findIndex(
//       (event) => event.id === props.event.id
//     );

//     if (eventIndex > -1) {
//       tripStore.updateEvent(
//         eventIndex,
//         { location: response.data.location },
//         "ignore"
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching location photos:", error);
//     return [];
//   }
// };
</script>

<style scoped></style>
