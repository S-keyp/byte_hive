<template>
   <canvas ref="canvas" id="canvas"></canvas>
</template>

<script setup lang="ts">
import Particle from '~/utils/classes/primary/Particle';
import type { MovementInfos } from '~/utils/classes/TitleAnimation';
import Rectangle from '~/utils/classes/primary/Rectangle';
import AnimationManager from '~/utils/classes/AnimationManager';
import RectangleAnimation from '~/utils/classes/RectangleAnimation';
import TitleAnimation from '~/utils/classes/TitleAnimation';
import StandaloneParticleAnimetion from '~/utils/classes/StandaloneParticleAnimation';

const props = defineProps<{title: string}>()

const canvasRef: Ref<HTMLCanvasElement | null> = useTemplateRef('canvas')
  
onMounted(() => {
  const canvas = canvasRef.value!
  const ctx = canvas.getContext('2d')!
  let particles: Particle[] = []

  // Adjust the position of the text
  const adjustX = 20
  const adjustY = 0

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
    particles = []

    // Scan imageData column by column and row by row
    for(let y = 0, y2 = textCoordinates.height; y < y2; y++){
      for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
        // Filter out pixels with opacity > 128 
        // (opacity is the 4th value in the array because it's rgba)
        if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
          let positionX = x + adjustX
          let positionY = y + adjustY
          particles.push(new Particle(positionX * 7, positionY * 7))
        }
      }
    }
  }
  
  
  /** @param {Particle} particle */
  const updateParticle = (particle: Particle, movementInfos: MovementInfos) => {
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
  const drawParticle = (particle: Particle) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fillStyle = "#333";
    ctx.fill()
  }
  
  if (window.innerWidth > 1280){
    init()
    const animationManager = new AnimationManager(
      canvas,
      [
        new RectangleAnimation(
          canvas, 
          [
            new Rectangle(200, -200, 300, 120, "#5B3BD8"), 
            new Rectangle(500, -350, 300, 120, "#FFDA05"),
            new Rectangle(800, -500, 300, 120, "#0D8060")
          ]
        ),
        new TitleAnimation(canvas, particles, updateParticle, drawParticle),
        new StandaloneParticleAnimetion(canvas, 300)
      ]
    )
    animationManager.animate(0)
  } else {
    const animationManager = new AnimationManager(
      canvas,
      [
        new StandaloneParticleAnimetion(canvas, 300)
      ]
    )
    animationManager.animate(0)
  }
})
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>