<template>
  <div>
    <h1>Pokedex</h1>
    <br />
    <h6>Digite o Nome do Pokemon e pressione Enter</h6>
    <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
    <div v-if="objPokemon.id > 0">
      <img :src="objPokemon.sprites.front_default" alt="Pokemon non existe" />
      <button @click="attSprite(objPokemon.id, parseInt(idEvolutionChain) - 1)">Back</button>
      <button @click="attSprite(objPokemon.id, parseInt(idEvolutionChain) + 1)">Next</button>
      <button @click="attSprite(objPokemon.id - 1, urlEvolution)">Involuir</button>
      <button @click="attSprite(objPokemon.id + 1, urlEvolution)">Evoluir</button>
    </div>
    <div v-else>Waiting Pokemon...</div>
    <div v-if="allGenPokemon != ''">
      Selecione a geração de Pokemons
      <button @click="attGeneration(idGen + 1)">Next Generation</button>
      <button @click="attGeneration(idGen - 1)">Back Generation</button>
      <img v-for="poke in allGenPokemon" :key="poke" :src="poke" alt="Pokemon Sprite" />
    </div>
    <div v-else>Loading Generation...</div>
  </div>
</template>
<script>
import {
  getPokemon,
  attPokemon,
  getIdEvolutionChain,
  getUrlEvolution,
  getPokemonsOfGeneration,
  checkGeneration,
  checkId,
  getObjEvolution,
  getEvolutionNames
  
} from './api'
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      objPokemon: '',
      urlEvolution: '',
      allGenPokemon: [],
      idEvolutionChain: '',
      idGen: 1,
      evo:'',
      evo2:''
    }
  },
  methods: {
    async searchPokemon(nomePokemon) {
      if (checkId(nomePokemon)) {
        this.objPokemon = await getPokemon(nomePokemon)
        this.urlEvolution = await getUrlEvolution(nomePokemon)
        this.idEvolutionChain = getIdEvolutionChain(this.urlEvolution)
        this.evo = await getObjEvolution(1)
        this.evo2 = await getEvolutionNames(this.evo)
        console.log(this.evo2)
      } else {
        alert('Non Existe esse pokemon')
      }
    },
    async attSprite(id, url) {
      if (checkId(id) && checkId(url)) {
        this.searchPokemon(await attPokemon(id, url))
      } else {
        alert('Non existe este Pokemon')
      }
    },
    async attGeneration(gen) {
      if (checkGeneration(gen)) {
        this.idGen = gen
        this.allGenPokemon = []
        this.allGenPokemon = await getPokemonsOfGeneration(gen)
      } else {
        alert('Non existe esta geração')
      }
    }
  },
  async beforeMount() {
    this.allGenPokemon = await getPokemonsOfGeneration(this.idGen)
  }
}
</script>
.section
