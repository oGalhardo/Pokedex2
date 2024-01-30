<template>
  <div class="pokedex-container">
    <div class="left-side">
      <div class="display">
        <ImagePokemon class="img-poke" :imgPoke="pokeImage" />
        <IconsTypes class="icons_poke" :typePoke="pokeTypes" />
      </div>
      <div class="d-pad">
        <Dpad
          :pokeNameforDpad="pokeName"
          @envity-poke="
            (pokemon) => (
              (pokeImage = pokemon.image), (pokeName = pokemon.name), (pokeTypes = pokemon.type)
            )
          "
        />
      </div>
    </div>
    <div class="right-side">
      <input class="input-container" type="text" v-model="pokeName" placeholder="Name of Pokemon" />
      <div class="buttons">
        <SearchButton
          class="button-search"
          :pokemonName="pokeName"
          @envityPokeofSearchButton="
            (pokemon) => ((pokeImage = pokemon.image), (pokeTypes = pokemon.type))
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchButton from '../components/buttons/SearchButton.vue'
import ImagePokemon from './ImagePokemon.vue'
import { ref, watchEffect } from 'vue'
import Dpad from './dpad/Dpad.vue'
import IconsTypes from '../IconsTypes.vue'
const props = defineProps({
  pokeOfGen: {
    type: String,
    default: ''
  }
})
const pokeName = ref('')
const pokeImage = ref('')
const pokeTypes = ref('')
watchEffect(() => [(pokeName.value = props.pokeOfGen)])
</script>

<style scoped>
.pokedex-container {
  background-image: url('/img/Pok_dex_Kanto_1.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 90%;
}
.left-side {
  grid-column: 1;
  display: grid;
  grid-template-rows: 30% 45% 25%;
}

.right-side {
  grid-column: 2;
  display: grid;
  grid-template-rows: 25% 25%;
  margin-left: 50px;
}
.input-container {
  position: relative;
  grid-row: 2;
  transform: rotate(-2deg);
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  left: 40px;
}
.buttons {
  display: grid;
  grid-row: 3;
  grid-template-rows: repeat(2, 25px);
  grid-template-columns: repeat(3, 25px);
  position: relative;
  justify-items: center;
  left: 40px;
  top: 15px;
}
.d-pad {
  grid-row: 3;
  position: relative;
  top: 9.5%;
  left: 33.5%;
}
.display {
  display: grid;
  grid-template-columns: auto 45%;
  position: relative;
  height: 45%;
  width: 45%;
  grid-row: 2;
  left: 35%;
  top: 35%;
}
</style>
