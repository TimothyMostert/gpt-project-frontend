<template>
  <article>
    <EventContols v-if="event.currentView != 'loading' && event.currentView != 'new'" :current-view="event.currentView" :event="props.event"/>
    <div class="no-scrollbar relative rounded-lg shadow-2xl h-[500px] overflow-y-scroll">
      <Loading v-if="event.currentView == 'loading'" :event="props.event" />
      <Overview v-if="event.currentView == 'overview'" :event="props.event" />
      <Edit v-if="event.currentView == 'edit'" :event="props.event" />
      <New v-if="event.currentView == 'new'" :event="props.event" />
    </div>
  </article>
</template>

<script setup>
import EventContols from "./controls/EventControls.vue";
import Loading from "./views/Loading.vue";
import Overview from "./views/Overview.vue";
import Edit from "./views/Edit.vue";
import New from "./views/New.vue";

const props = defineProps({
  event: Object,
});

</script>

