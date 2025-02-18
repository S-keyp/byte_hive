<template>
    <canvas ref="canvasRef" id="canvas" @click="show"></canvas>
</template>

<script setup>
import Particle from "~/utils/classes/primary/Particle";
import TitleAnimation from "~/utils/classes/TitleAnimation";
import StandaloneParticleAnimetion from "~/utils/classes/StandaloneParticleAnimation";
import AnimationManager from "~/utils/classes/AnimationManager";
import RectangleAnimation from "~/utils/classes/RectangleAnimation";
import Rectangle from "~/utils/classes/primary/Rectangle";

const props = defineProps({
    title: String,
});

/** @type {Ref<HTMLCanvasElement>} */
const canvasRef = ref(null);

onMounted(() => {
    /** @type { CanvasRenderingContext2D } */
    const ctx = canvasRef.value.getContext("2d");
    /** @type { Particle[] } */
    let particleArray = [];

    // Adjust the position of the text
    const adjustX = 20;
    const adjustY = 0;
    const particleSpacing = 7;

    canvas.width = window.innerWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.marginBottom = -canvas.getBoundingClientRect().height + 450 +
        "px";

    ctx.font = "30px Courier New";
    ctx.fillText(props.title, 0, 30);
    ctx.textBaseline = "ideographic";
    const textMeasure = ctx.measureText(props.title);
    const textCoordinates = ctx.getImageData(
        0,
        0,
        textMeasure.width,
        textMeasure.fontBoundingBoxAscent,
    );

    const init = () => {
        particleArray = [];
        const pixels_data = textCoordinates.data;

        for (let y = 0; y < textCoordinates.height; y++) {
            for (let x = 0; x < textCoordinates.width; x++) {
                const index = (y * textCoordinates.width + x) * 4;
                const a = pixels_data[index + 3];
                if (a > 0) {
                    let positionX = x + adjustX;
                    let positionY = y + adjustY;
                    particleArray.push(
                        new Particle(
                            positionX * particleSpacing,
                            positionY * particleSpacing,
                        ),
                    );
                }
            }
        }
    };

    if (window.innerWidth > 280) {
        init();
        const animationManager = new AnimationManager(
            canvasRef.value,
            [
                new RectangleAnimation(
                    canvasRef.value,
                    [
                        new Rectangle(200, -200, 300, 120, "#5B3BD8"),
                        new Rectangle(500, -350, 300, 120, "#FFDA05"),
                        new Rectangle(800, -500, 300, 120, "#0D8060"),
                    ],
                ),
                new StandaloneParticleAnimetion(canvasRef.value, 300),
                new TitleAnimation(canvasRef.value, particleArray),
            ],
        );
        animationManager.animate();
    } else {
        const animationManager = new AnimationManager(
            canvasRef.value,
            [
                new StandaloneParticleAnimetion(canvasRef.value, 300),
            ],
        );
        animationManager.animate();
    }
});
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
