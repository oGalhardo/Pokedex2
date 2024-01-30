<template>
  <div class="d-pad">
    <GetEvo
      :pokemonName="pokeNameforDpad"
      class="button-up custom-button"
      :choice="'evolves_into_species'"
      @envityImg="(pok) => handleEnvityImg(pok)"
    />

    <button class="button-right custom-button">.</button>
    <button class="button-center custom-button">.</button>
    <button class="button-left custom-button">.</button>
    <GetEvo
      :pokemonName="pokeNameforDpad"
      :choice="'evolves_from_species'"
      class="button-down custom-button"
      @envityImg="(pok) => handleEnvityImg(pok)"
      >.</GetEvo
    >
  </div>
</template>

<script setup lang="ts">
import GetEvo from '../buttons/GetEvo.vue'
import { ref } from 'vue'
const emits = defineEmits(['envityPoke'])
const props = defineProps({
  pokeNameforDpad: {
    type: String,
    default: ''
  }
})
const handleEnvityImg = (pok: object) => {
  emits('envityPoke', pok)
}
</script>

<style scoped>
.d-pad {
  display: grid;
  grid-template-rows: repeat(3, 30px);
  grid-template-columns: repeat(3, 30px);
}

.custom-button {
  border-radius: 10px;
  background-color: transparent;
  color: transparent;
  font-size: 16px;
  cursor: pointer;
  height: 100%;
  width: 100%;
  background-color: black;
}

.button-up {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
}
.button-down {
  grid-column: 2;
  grid-row: 3;
  justify-self: center;
}
.button-left {
  grid-column: 3;
  grid-row: 2;
  justify-self: start;
}
.button-right {
  grid-column: 1;
  grid-row: 2;
  justify-self: end;
}
.button-center {
  grid-column: 2;
  grid-row: 2;
  justify-self: center;
}
</style>
