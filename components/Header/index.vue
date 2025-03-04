<template>
    <h1 v-if="isSmallScreen">{{ props.title }}</h1>
    <BackgroundCanvas v-else :title="props.title" />
</template>

<script setup>
const props = defineProps({
    title: String,
});

let isSmallScreen = ref(false);

onMounted(() => {
    isSmallScreen = window.innerWidth < 1280;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
