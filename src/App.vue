<template>
  <div>
    <h1>Pokedex</h1>
    <br />
    <h6>Digite o Nome do Pokemon e pressione Enter</h6>
    <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
    <div v-if="objPokemon.id > 0">
      <img :src="objPokemon.sprites.front_default" alt="Pokemon non existe" />
        <button @click="attSprite(objPokemon.id - 1)">Back</button>
        <button @click="attSprite(objPokemon.id + 1)">Next</button>
        <button @click="attEvolution(objPokemon.id - 1)">Involuir</button>
        <button @click="attEvolution(objPokemon.id + 1)">Evoluir</button>
      </div>
      <div v-else>
        Carregando Geração de Pokemons...
      </div>
      <div v-if="allGenPokemon != ''">
      Selecione a geração de Pokemons
      <button @click="attGeneration(generationAtual + 1)">Next Generation</button>
      <button @click="attGeneration(generationAtual - 1)">Back Generation</button>
      <img v-for="poke in allGenPokemon" :key="poke" :src="poke" alt="Pokemon Sprite" />
      </div>
  </div>
</template>
<script>
import {
  getPokemon,
  attPokemon,
  checkEvolution,
  getSpecies,
  checkGeneration,
  getAllPokemonsOfGeneration
} from './api'
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      objPokemon: '',
      objPokemonSpecies: '',
      generationAtual: 1 ,
      allGenPokemon: []
    }
  },
  methods: {
    async searchPokemon(nomePokemon) {
      this.objPokemon = await getPokemon(nomePokemon)
      this.objPokemonSpecies = await getSpecies(nomePokemon)
    },
    attSprite(id) {
      this.searchPokemon(attPokemon(id))
    },
    async attGeneration(generation) {
      if (checkGeneration(generation)) {
        this.generationAtual = await getAllPokemonsOfGeneration(checkGeneration(generation))
      }
    },



    async attEvolution(id) {
      if (await checkEvolution(id, this.objPokemonSpecies.evolution_chain)) {
        this.searchPokemon(id)
      }else{alert("Tal pokemon não tem mais evoluções")}
    }
  },




  
  async beforeMount() {
    this.allGenPokemon = await getAllPokemonsOfGeneration(this.generationAtual)
    console.log(this.generationAtual)
  }
}
</script>
.section
