<template>
    <div class="rounded-lg shadow-2xl bg-white p-4">
        <h1 class="text-lg md:text-xl text-primaryBlue font-bold tracking-wide text-center">
            {{ title }}
        </h1>
    </div>
</template>

<script setup>

defineProps({
    title: String
});

</script>