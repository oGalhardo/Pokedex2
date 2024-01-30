<template>
  <q-avatar class="sprite" size="100px">
    <div v-show="props.imgPoke"><img :src="props.imgPoke" /></div>
  </q-avatar>

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
  border: none;
}
</style>
