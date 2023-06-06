<template>
    <div class="bg-gray-300 rounded-lg" :class="size">
        <img class="object-cover rounded-t-lg" :class="size" :src="imageUrl" alt="">
        <!-- unsplash credit -->
        <div class="absolute bottom-0 right-0 p-2 text-[8px] text-white">
        <a :href="image.profile_url">{{ image.name }}</a> on <a href="https://unsplash.com/?utm_source=dreamtrip&utm_medium=referral">Unsplash</a>
        </div>
    </div>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps({
    image: {
        type: Object,
        required: true,
    },
    width: {
        type: Number,
        required: false,
        default: 300,
    },
    height: {
        type: Number,
        required: false,
        default: 150,
    },
    size: {
        type: String,
        default: 'h-40 w-full'
    },
    quality: {
        type: String,
        default: 'small'
    }
});

const imageUrl = computed(() => {
    if (props.image != undefined) {
        switch (props.quality) {
            case 'small':
                return props.image.small_url;
                break;
            case 'regular':
                return props.image.regular_url;
                break;
            case 'full':
                return props.image.full_url;
                break;
            default:
                return props.image.small_url;
                break;
        }
    } else {
        return 'https://picsum.photos/seed/' + props.trip.id + '/' + props.width + '/' + props.height;
    }
});

</script>

<style lang="scss" scoped>

</style>