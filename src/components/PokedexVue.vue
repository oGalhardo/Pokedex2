<template>
  <div>
    <img src="/img/Pok_dex_Kanto_1.png" alt="Pokémon Image" />
    <ImagePokemon class="image-pokemon" :imgPoke="pokeImage" />
    <div class="input-poke q-pa-md">
      <q-input borderless color="grey-3" label-color="orange" v-model="pokeName" label="Label">
        {{ pokeName }}
      </q-input>
    </div>
    <div class="buttons">
      <SearchButton
        :name="pokeName"
        class="button-search"
        :pokemonName="pokeName"
        @envityImg="(img) => (pokeImage = img)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchButton from '../components/buttons/SearchButton.vue'
import ImagePokemon from '../ImagePokemon.vue'
import { ref } from 'vue'
const pokeName = ref('')
const pokeImage = ref('')
</script>

<style scoped>
.image-pokemon {
  position: absolute;
  top: 160px;
  left: 300px;
}
.input-poke {
  position: relative;
  top: -375px;
  width: 240px;
  left: 390px;
  transform: rotate(-2.5deg);
}
.button-search {
  position: absolute;
  top: 250px;
  left: 640px;
  transform: rotate(-2.5deg);
}
</style>
