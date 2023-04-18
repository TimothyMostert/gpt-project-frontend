<template>
    <div class="p-4">
        <h1 class="text-xl text-primaryBlue font-bold tracking-wide text-center">
            {{ title }}
        </h1>
    </div>
</template>

<script setup>

defineProps({
    title: String
});

</script>