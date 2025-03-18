<template>
    <header v-if="isSmallScreen">
        <BackgroundCanvas title="" />
        <div class="header-content">
            <h1>Byte Hive</h1>
            <h2 class="header-content-subtitle">{{ props.subTitle }}</h2>
        </div>
    </header>
    <header v-else>
        <BackgroundCanvas title="Byte Hive" />
        <div class="header-content">
            <h1 class="not-shown">Byte Hive</h1>
            <h2 class="header-content-subtitle">
                {{ props.subTitle }}
            </h2>
        </div>
    </header>
</template>

<script setup>
const props = defineProps({
    subTitle: String,
});

let isSmallScreen = ref(false);

onMounted(() => {
    isSmallScreen.value = window.innerWidth < 1280;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
