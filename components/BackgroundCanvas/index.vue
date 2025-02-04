<template>
   <canvas ref="canvasRef" id="canvas" @click="show"></canvas>
</template>

<script setup>
import Particle from '~/utils/classes/primary/Particle';
import Animation from '~/utils/classes/TitleAnimation';
import StandaloneParticleAnimetion from '~/utils/classes/StandaloneParticleAnimation';
import AnimationManager from '~/utils/classes/AnimationManager';
import RectangleAnimation from '~/utils/classes/RectangleAnimation';
import Rectangle from '~/utils/classes/primary/Rectangle';

const props = defineProps({
  title: String
})

/** @type {Ref<HTMLCanvasElement>} */
const canvasRef = ref(null)
  
onMounted(() => {
  /** @type { CanvasRenderingContext2D } */
  const ctx = canvasRef.value.getContext('2d')
  /** @type { Particle[] } */
  let particleArray = []

  // Adjust the position of the text
  const adjustX = 20
  const adjustY = 0

  let longestParticleLine = []

  canvas.width = window.innerWidth
  canvas.height = document.body.clientHeight
  canvas.style.marginBottom = -canvas.getBoundingClientRect().height + 450 + 'px'

  ctx.fillStyle = 'white'
  ctx.font = '30px Courier New'
  ctx.fillText(props.title, 0, 36)
  const textMeasure = ctx.measureText(props.title)

  const textCoordinates = ctx.getImageData(
    0, 
    0, 
    textMeasure.width, 
    textMeasure.actualBoundingBoxAscent * 2 + textMeasure.actualBoundingBoxDescent
  )

  const init = () => {
    particleArray = []

    // Scan imageData column by column and row by row
    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
      for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
        // Filter out pixels with opacity > 128 
        // (opacity is the 4th value in the array because it's rgba)
        if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
          let positionX = x + adjustX
          let positionY = y + adjustY
          particleArray.push(new Particle(positionX * 7, positionY * 7))
        }
        if(x == textCoordinates.width - 1){
          longestParticleLine.push(x)
        }
      }
    }

    // Get the longest line of particles
    longestParticleLine = Math.max(...longestParticleLine)
    console.log('longestParticleLine', longestParticleLine);
  }
  
  
  /** @param {Particle} particle */
  const updateParticle = (particle, movementInfos) => {
    if (movementInfos.distance <= movementInfos.radius - 1) {
      particle.size = 4
      
      if(movementInfos.isClicked){
        particle.x += movementInfos.directionX / 2
        particle.y += movementInfos.directionY / 2
      } else {
        particle.x -= movementInfos.directionX
        particle.y -= movementInfos.directionY
      }
      
    } else {
      particle.size = 2

      if (particle.x != particle.baseX) {
        let dx = particle.x - particle.baseX
        particle.x -= dx / 10
      } 

      if (particle.y != particle.baseY){
        let dy = particle.y - particle.baseY
        particle.y -= dy / 10
      }
    }
  }
  
  /**
   * @param {Particle} particle
   */
  const drawParticle = (particle) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = "#333";
    ctx.fill()
  }
  
  if (window.innerWidth > 1280){
    init()
    const animationManager = new AnimationManager(
      canvasRef.value,
      [
        new RectangleAnimation(
          canvasRef.value, 
          [
            new Rectangle(200, -200, 300, 120, "#5B3BD8"), 
            new Rectangle(500, -350, 300, 120, "#FFDA05"),
            new Rectangle(800, -500, 300, 120, "#0D8060")
          ]
        ),
        new Animation(canvasRef.value, particleArray, updateParticle, drawParticle),
        new StandaloneParticleAnimetion(canvasRef.value, 300)
      ]
    )
    animationManager.animate()
  } else {
    const animationManager = new AnimationManager(
      canvasRef.value,
      [
        new StandaloneParticleAnimetion(canvasRef.value, 300)
      ]
    )
    animationManager.animate()
  }
})
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>