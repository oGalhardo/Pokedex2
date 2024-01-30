<template>
  <div class="home-container">
    <PokedexVue class="pokedex" :pokeOfGen="guardOfPokeOfGen" />
    <Generation class="gen" @envity-poke-of-gen="(poke) => (guardOfPokeOfGen = poke)" />
  </div>
</template>

<script setup lang="ts">
import Generation from '../Generation.vue'
import PokedexVue from '../PokedexVue.vue'
import { ref } from 'vue'
const guardOfPokeOfGen = ref()
</script>
<style scoped>
.home-container {
  display: grid;
  grid-template-columns: auto auto;
  position: relative;
  gap: 30px;
}

.pokedex {
  width: 700px;
  height: 560px;
  position: relative;
}
.gen {
  margin-top: 20%; /* Adiciona um espaço à esquerda do novo item */
  width: 600px;
  height: 390px;
}
</style>
