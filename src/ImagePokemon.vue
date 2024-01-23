<template>
  <img v-if="imgPoke" :src="props.imgPoke" class="sprite" />
</template>

<script setup lang="ts">
const props = defineProps({
  imgPoke: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.sprite {
  height: 200px;
  width: 200px;
}
</style>
