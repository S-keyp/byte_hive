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
  console.log('props.title', props.title);
  
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvasRef.value.getContext('2d')
  let particleArray = []

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  ctx.fillStyle = 'white'
  ctx.font = '30px Verdana'
  ctx.fillText('A', 0, 30)

  ctx.strokeStyle = 'white'
  ctx.strokeRect(10, 10, 100, 100)

  const data = ctx.getImageData(0, 0, 100, 100)
  
  
  console.log('data', data);
  const init = () => {
    particleArray = []

    for(let i = 0; i < 1500; i++){
      let x = Math.random() * canvas.width
      let y = Math.random() * canvas.height
      particleArray.push(new Particle(x, y))
    }
  }
  init()
  
  
  /** @param {Particle} particle */
  const updateParticle = (particle, movementInfos) => {
    if (movementInfos.distance < movementInfos.radius) {

      particle.size = 6
      particle.x -= movementInfos.directionX
      particle.y -= movementInfos.directionY
      
    } else {

      particle.size = 3

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

// const show = () => {
//    console.log('canvas', canvasRef.value);
// }
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>