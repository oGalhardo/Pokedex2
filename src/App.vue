<template>
  <div>
    <h1>Pokedex</h1>
    <br />
    <h6>Digite o Nome do Pokemon e pressione Enter</h6>
    <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
    <!-- <div v-if="sprite != ''">
      <img :src="sprite" alt="Pokemon non existe" />
      <button @click="attSprite(idPokemo - 1)">Back</button>
      <br />
      <button @click="attSprite(idPokemo + 1)">Next</button>
    </div> -->
    <div>
      Selecione a geração de Pokemons
      <button @click="nextGeneration('generation-i')">Next Generation</button>
      <button @click="backGeneration">Back Generation</button>
    </div>
    <div>
      <img v-for="pokeImg in allGenPokemon" :key="pokeImg" :src="pokeImg" alt="Pokemon Sprite" />
    </div>
  </div>
</template>
<script>
import { getImage, getPokemon, getIdPokemon, getSpecies, getAllPokemonsOfGeneration } from './api'
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      idPokemo: '',
      objPokemon: '',
      espPokemon: '',
      genPokemon: '',
      allGenPokemon: ['']
    }
  },
  methods: {
    async searchPokemon(nomePokemon) {
      this.objPokemon = await getPokemon(nomePokemon)
      this.idPokemo = await getIdPokemon(nomePokemon)
      this.sprite = await getImage(this.idPokemo)
      this.espPokemon = await getSpecies(this.idPokemo)
    },
    attSprite(id) {
      this.searchPokemon(id)
    },
    async nextGeneration(gen) {
      this.allGenPokemon = await getAllPokemonsOfGeneration(gen)
      console.log(this.genPokemon)
    }
  }
}
</script>
.section
