<template>
<div class="dropdown">
    <p v-if="dropDownHead.isText" ref="dropDownHeadText">{{ dropDownHead.head }}</p>
    <img v-else :src="dropDownHead.head" :alt="dropDownHead.head.replaceAll('-', ' ')" ref="dropDownHeadImage" />

    <ul class="dropdown-items" ref="dropdown">
        <li class="dropdown-item" v-for="elt in dropDownEntries" :key="elt.url">
            <NuxtLink :to="elt.url">{{ elt.title }}</NuxtLink>
        </li>
    </ul>
</div>
</template>

<script setup>
let props = defineProps({
    dropDownHead: {
        head: String,
        isText: Boolean,
        required: true
    },
    dropDownEntries: {
        type: Array,
        required: true
    }
});

let dropDownHeadText = ref(null)
let dropDownHeadImage = ref(null)

onMounted(() => {
    console.log('dropDownHeadImage.value', dropDownHeadImage.value);
    /** @type { Ref<HTMLElement> } */
    let headElement = dropDownHeadText.value ? dropDownHeadText.value : dropDownHeadImage.value;

    console.log('headElement', headElement);
})

</script>

<style lang="scss">
@use "./index.scss";
</style>