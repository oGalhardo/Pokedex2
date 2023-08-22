<template>
  <div>
    <h1>Pokedex</h1>
    <br />
    <h6>Digite o Nome do Pokemon e pressione Enter</h6>
    <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
    <div v-if="objPokemon.id > 0">
      <img :src="objPokemon.sprite" alt="Pokemon non existe" />
      <div v-if="objPokemon != ''">
        <button @click="attSprite(objPokemon.id - 1)">Back</button>
        <br />
        <button @click="attSprite(objPokemon.id + 1)">Next</button>
      </div>
    </div>
    <div>
      Selecione a geração de Pokemons
      <button @click="attGeneration(generationAtual + 1)">Next Generation</button>
      <button @click="attGeneration(generationAtual - 1)">Back Generation</button>
    </div>
    <div v-if="allGenPokemon!=''">
      <img v-for="poke in allGenPokemon" :key="poke" :src="poke" alt="Pokemon Sprite" />
    </div>
  </div>
</template>
<script>
import {
  getImage,
  getPokemon,
  getIdPokemon,
  getSpecies,
  getAllPokemonsOfGeneration,
  getGenerationName,
  attPokemon,
  checkGeneration
} from './api'
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      objPokemon: [{ name: '', id: '', sprite: '', espPokemon: '', genPokemon: '' }],
      allGenPokemon: [],
      generationAtual:1
    }
  },
  methods: {
    async searchPokemon(nomePokemon) {
      this.objPokemon = await getPokemon(nomePokemon)
      this.objPokemon.id = await getIdPokemon(nomePokemon)
      this.objPokemon.sprite = await getImage(nomePokemon)
      this.objPokemon.espPokemon = await getSpecies(nomePokemon)
      this.objPokemon.genPokemon = await getGenerationName(nomePokemon)
    },
    attSprite(id) {
      this.searchPokemon(attPokemon(id))
    },
    async attGeneration(generationAtual){
      if(checkGeneration(generationAtual)){
      this.generationAtual = await getAllPokemonsOfGeneration(checkGeneration(generationAtual))
    }
    }
  },
  async mounted() {
    this.allGenPokemon = await getAllPokemonsOfGeneration(this.generationAtual)
    console.log(this.allGenPokemon)
  }
}
</script>
.section
