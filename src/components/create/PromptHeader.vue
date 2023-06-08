<template>
    <div class="py-4 px-2 flex flex-col justify-between">
        <h1 class="text-xl md:text-2xl text-primaryBlue font-bold tracking-wide">
            {{ props.heading }}
        </h1>
        <p class="text-xs md:text-base text-gray-500 mt-2">
            {{ props.subheading }}
        </p>
    </div>
</template>

<script setup>

const props = defineProps({
    heading: String,
    subheading: String,
});

</script>