<template>
    <div class="dropdown">
        <img
            v-if="isImageLink"
            class="dropdown-head-img"
            :src="dropDownHead"
            :alt='dropDownHead.replaceAll("-", " ")'
            ref="dropDownHeadImage"
            @click.stop="toggleDropDown"
        />

        <p
            v-else
            class="dropdown-head-text"
            ref="dropDownHeadText"
            @click.stop="toggleDropDown"
        >
            {{ dropDownHead }}
        </p>

        <ul class="dropdown-items" ref="dropdown">
            <li
                v-for="elt in dropDownEntries"
                :key="elt.url"
            >
                <NuxtLink class="dropdown-item" :to="elt.url" @click.stop="toggleDropDown">{{
                    elt.title
                }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    dropDownHead: {
        type: String,
        required: true,
    },
    dropDownEntries: {
        type: Array,
        required: true,
    },
});

let text = props.dropDownHead;
let isImageLink = (text.includes(".png") || text.includes(".jpg") ||
        text.includes(".jpeg") || text.includes(".svg") ||
        text.includes("/"))
    ? true
    : false;

function toggleDropDown(event) {
    let target = event.target.parentElement;

    if (event.target.classList.contains("dropdown-item")) {
        target = event.target.parentElement.parentElement.parentElement;
    }
    target.classList.toggle("dropdown--active");
}
</script>

<style lang="scss">
@use "./index.scss";
</style>
