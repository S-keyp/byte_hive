<template>
    <header v-if="isSmallScreen">
        <BackgroundCanvas title="" />
        <div class="header-content">
            <h1>{{ props.title }}</h1>
            <h2 class="header-content-subtitle">Entreprise de développement informatique</h2>
        </div>
    </header>
    <header v-else>
        <BackgroundCanvas :title="props.title" />
        <div class="header-content">
            <h1 class="not-shown">{{ props.title }}</h1>
            <h2 class="not-shown header-content-subtitle">
                Entreprise de développement informatique
            </h2>
        </div>
    </header>
</template>

<script setup>
const props = defineProps({
    title: String,
    subtitle: String,
});

let isSmallScreen = ref(false);

onMounted(() => {
    isSmallScreen.value = window.innerWidth < 1280;
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
