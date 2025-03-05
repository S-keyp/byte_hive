<template>
    <div v-if="isSmallScreen">
        <BackgroundCanvas title="" />
        <h1>{{ props.title }}</h1>
    </div>
    <div v-else>
        <BackgroundCanvas :title="props.title" />
        <h1 class="not-shown">{{ props.title }}</h1>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
});

let isSmallScreen = ref(false);

onMounted(() => {
    isSmallScreen.value = window.innerWidth < 1280;
    console.log(isSmallScreen);
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
