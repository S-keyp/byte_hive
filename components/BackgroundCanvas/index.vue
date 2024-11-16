<template>
   <canvas ref="canvasRef" id="canvas" @click="show"></canvas>
</template>

<script setup>
import Particle from '~/utils/classes/Particle';
import Animation from '~/utils/classes/Animation';

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



  // const image = new Image();
  // image.src = "/logo.png";
  // image.onload = () => {
  //   ctx.drawImage(image, 0, 0, 50, 50);
  //   textCoordinates = ctx.getImageData(0, 0, 300, 100)
  //   console.log('textCoordinates', textCoordinates);
  //   init()
  //   const animation = new Animation(canvasRef.value, particleArray, updateParticle, drawParticle)
  // }
  

  // Adjust the position of the text
  const adjustX = 0
  const adjustY = 0

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.scale(1, 1)
  ctx.fillStyle = 'white'
  ctx.font = '20px Verdana'
  ctx.fillText(props.title, 0, 16)

  ctx.strokeStyle = 'white'
  ctx.strokeRect(0, 0, 100, 100)

  const textCoordinates = ctx.getImageData(0, 0, 300, 100)

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
          particleArray.push(new Particle(positionX * 10, positionY * 10))
        }
      }
    }
  }
  init()
  
  
  /** @param {Particle} particle */
  const updateParticle = (particle, movementInfos) => {
    if (movementInfos.distance <= movementInfos.radius - 10) {

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
    ctx.fill()
  }
  
  const animation = new Animation(canvasRef.value, particleArray, updateParticle, drawParticle)
})
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>