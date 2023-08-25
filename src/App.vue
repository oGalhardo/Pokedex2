<template>
  <div>
    <h1>Pokedex</h1>
    <br />
    <h6>Digite o Nome do Pokemon e pressione Enter</h6>
    <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
    <div v-if="objPokemon.id > 0">
      <img :src="objPokemon.sprites.front_default" alt="Pokemon non existe" />
      <button @click="attPoke(objPokemon.id -1)">Back</button>
      <button @click="attPoke(objPokemon.id +1)">Next</button>
      <button @click="attEvo(objPokemon.id - 1, evoChain)">Involuir</button>
      <button @click="attEvo(objPokemon.id + 1, evoChain)">Evoluir</button>
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
  getPokemonsOfGeneration,
  checkGeneration,
  checkId,
  evolutionChain,
  getUrlEvolution,
  getIdEvolutionChain,
  searchPoke,
  searchEvo

} from './api'
export default {
  name: 'App',
  data() {
    return {
      nome: '',
      objPokemon: '',
      allGenPokemon: [],
      evoChain: [],
      idGen: 1,
      urlEvo: '',
      idEvo: '',
    }
  },
  methods: {
    async searchPokemon(nomePokemon) {
      if (checkId(nomePokemon)) {
        this.objPokemon = await getPokemon(nomePokemon)
        this.evoChain = await evolutionChain(nomePokemon)
        this.urlEvo = await getUrlEvolution(nomePokemon)
        this.idEvo = await getIdEvolutionChain(this.urlEvo)
      } else {
        alert('Non Existe esse pokemon')
      }''
    },
    async attEvo(id, evos) {
      if(await searchEvo(id,evos)){
        this.searchPokemon(await searchEvo(id,evos))
      }else{return alert("Non ha mais evolucoes")}
    },
    async attPoke(id){
      if(await searchPoke(id)){
        searchPoke(id)
      }else{return alert("Non ha mais pokemons")}
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
