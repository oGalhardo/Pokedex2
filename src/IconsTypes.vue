<template>
  <div class="icons">
    <q-icon v-for="icon in typePokeIcon" :key="icon">
      <img class="ico" :src="icon" />
    </q-icon>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'

const props = defineProps({
  typePoke: {
    type: String,
    default: ''
  }
})

const typePokeIcon = ref<string[]>([])
watchEffect(async () => {
  const iconsArray: string[] = []

  if (props.typePoke.includes('-')) {
    const types = props.typePoke.split('-')

    const iconPromises = types.map(async (element) => {
      try {
        const module = await import(`../public/img/icons/${element}.ico`)
        iconsArray.push(module.default)
      } catch (error) {
        console.error('Error loading typePoke icon:', error)
      }
    })

    await Promise.all(iconPromises)

    typePokeIcon.value = iconsArray
  }
  const module = await import(`../public/img/icons/${props.typePoke}.ico`)
  iconsArray.push(module.default)
  typePokeIcon.value = iconsArray

})
</script>

<style scoped>
.icons {
  position: relative;
  top: 10px;
  display: grid;
  gap: 10px;
  left: 15px;
}
.ico {
  width: 50px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
  position: relative;
}
</style>
