<template>
    <div
      class="flex flex-col gap-2 px-4 py-4 rounded-lg shadow-2xl isolate after:bg-travel-1 after:inset-0 after:absolute after:rounded-lg after:-z-10 after:opacity-40"
    >
      <h3 class="font-bold text-gray-700">Travel by {{ event.mode }}</h3>
      <div class="grid grid-cols-3 text-sm text-gray-600 text-center">
        <p>{{ event.origin ? event.origin : 'Location' }}</p>
        <p>to</p>
        <p>{{ event.destination ? event.destination : 'Location' }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    event: Object,
  });
  
  
  </script>
  