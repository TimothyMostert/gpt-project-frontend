<template>
  <article>
    <EventContols :current-view="currentView" @update="updateView"/>
    <div class="no-scrollbar relative rounded-lg shadow-2xl h-[500px] overflow-y-scroll">
      <Overview v-if="currentView == 'overview'" :event="props.event" />
      <Edit v-if="currentView == 'edit'" :event="props.event" />
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";
import EventContols from "./controls/EventControls.vue";
import Overview from "./views/Overview.vue";
import Edit from "./views/Edit.vue";

const currentView = ref("overview");

const props = defineProps({
  event: Object,
});

if (props.event.event_type_id === 1) {
  currentView.value = "overview";
}

const updateView = (view) => {
    currentView.value = view;
};

</script>

