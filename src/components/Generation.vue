<template>
  <div v-if="num === 1">
    <button @click="attGeneration(idGen + 1)">Next Generation</button>
    <button @click="attGeneration(idGen - 1)">Back Generation</button>
    <div class="pokeGen">
      <div v-if="allGenPokemon != ''">
        <img
          v-for="poke in allGenPokemon"
          :key="poke"
          :src="poke"
          alt="Pokemon Sprite"
          class="pokeInGen"
        />
      </div>
      <div v-else>Loading Generation...</div>
    </div>
  </div>
  <div v-else></div>
</template>
<script>
import { getPokemonsOfGeneration, checkGeneration } from '../api'

export default {
  name: 'GenerationVue',
  props:['num'],
  data() {
    return {
      allGenPokemon: [],
      idGen: 1,
    }
  },
  methods: {
    async attGeneration(gen) {
      if (checkGeneration(gen)) {
        this.idGen = gen
        this.allGenPokemon = []
        this.allGenPokemon = await getPokemonsOfGeneration(gen)
      } else {
        alert('Não existe mais gerações')
      }
    }
  },
  async beforeMount() {
    this.allGenPokemon = await getPokemonsOfGeneration(this.idGen)
  }
}
</script>
<style>
.pokeInGen {
  width: 120px;
  height: 120px;
}
.pokeGen {
  overflow-y: scroll;
  width: 750px;
  height: 500px;
  object-position: left top;
  border: 2px solid black;
}

</style>
