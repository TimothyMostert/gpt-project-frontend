<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
      <li class="flex min-w-fit">
        <div class="flex items-center">
          <a @click="goRoute('/')" class="text-gray-400 hover:text-gray-500">
            <!-- a house svg -->
            <svg
              class="flex-shrink-0 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.707 3.293a1 1 0 00-1.414 0l-7 7a1 1 0 101.414 1.414L4 10.414V16a2 2 0 002 2h8a2 2 0 002-2v-5.586l1.293 1.293a1 1 0 001.414-1.414l-7-7zM12 15H8v-4h4v4z"
              />
            </svg>
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="step in steps" :key="step.name" class="flex">
        <div class="flex items-center">
          <svg
            class="h-full w-6 flex-shrink-0 text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a
            @click="goRoute(step.route)"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
            :class="[step.current ? 'text-primaryBlue' : 'text-gray-500', !step.visited && 'cursor-not-allowed opacity-50']"
            :aria-current="step.current ? 'step' : undefined"
            :disabled="!step.visited"
            >{{ step.name }}</a
          >
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import router from "@/router";
import { computed } from "vue";
import { useVisitedRoutesStore } from '@/stores/routes.js'

const visitedRoutesStore = useVisitedRoutesStore()

const goRoute = (route) => {
  if (visitedRoutesStore.visited.includes(route) || route == "/") {
    router.push(route);
  } else {
    console.log("not visited");
  }
  
};

const steps = computed(() => {
  const route = router.currentRoute.value.name;
  console.log(route);
  const steps = [
    {
      name: "Create",
      route: "/trip/create",
      current: route === "trip-create",
      visited: visitedRoutesStore.visited.includes("trip-create"),
    },
    {
      name: "View",
      route: "/trip/view",
      current: route === "trip-view",
      visited: visitedRoutesStore.visited.includes("trip-view"),
    },
  ];
  return steps;
});
</script>
