<template>
  <div>
    <h1>Pokedex</h1>
    <br />
    <img src="../public/img/Pok_dex_Kanto_1.png" class="pokedex">
    <h6>Digite o Nome do Pokemon e pressione Enter</h6>
    <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
    <div v-if="objPokemon.id > 0">
      <img :src="objPokemon.sprites.front_default" alt="Pokemon non existe" class="pokemon" />
      <button @click="attPoke(objPokemon.id, parseInt(idEvo) - 1)">Back</button>
      <button @click="attPoke(objPokemon.id, parseInt(idEvo) + 1)">Next</button>
      <button @click="attPoke(parseInt(idPokeInEvo) - 1, evoChain)">Involuir</button>
      <button @click="attPoke(parseInt(idPokeInEvo) + 1, evoChain)">Evoluir</button>
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
  evolutionChain,
  getUrlEvolution,
  getIdEvolutionChain,
  getAttPokemon,
  checkEvo,
  checkId
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
      idPokeInEvoo: ''
    }
  },
  methods: {
    async searchPokemon(nomePokemon) {
      if (checkId(nomePokemon)) {
        this.objPokemon = await getPokemon(nomePokemon)
        this.evoChain = await evolutionChain(nomePokemon)
        this.idPokeInEvo = this.evoChain.indexOf(this.objPokemon.name)
        this.urlEvo = await getUrlEvolution(nomePokemon)
        this.idEvo = await getIdEvolutionChain(this.urlEvo)
      }else{alert("Non existe tal pokemon meu parça")}
    },
    async attGeneration(gen) {
      if (checkGeneration(gen)) {
        this.idGen = gen
        this.allGenPokemon = []
        this.allGenPokemon = await getPokemonsOfGeneration(gen)
      } else {
        alert('Non existe esta geração')
      }
    },
    async attPoke(poke, option) {
      if (checkEvo(option)) {
        if (await getAttPokemon(poke, option)) {
          this.searchPokemon(await getAttPokemon(poke, option))
        } else {
          alert('Non ha mais evo')
        }
      }else{alert("Non ha mais pokemon")}
    }
  },
  async beforeMount() {
    this.allGenPokemon = await getPokemonsOfGeneration(this.idGen)
  }
}
</script>
<style>
.pokedex {
  color: red;
  width: 530px;
  bottom: 100px;
}
.pokemon{
  color: red;
  width: 150px;
  position: absolute;
  bottom: 645px;
  left: 375px;
}
</style>