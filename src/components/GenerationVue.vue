<template>
  <div v-if="num === 1">
    <h2>Generation:{{ idGen }}</h2>
    <div class="button-container">
      <button @click="attGeneration(idGen - 1)">&#8592;</button>
      <button @click="attGeneration(idGen + 1)">&#8594;</button>
    </div>
    <div class="pokeGen">
      <div v-if="allGenPokemon != ''">
        <img
          v-for="poke in allGenPokemon"
          @click="setPokeInPokedex(poke)"
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
import { getPokemonsOfGeneration, checkGeneration, getIdForImgPokemon } from '../api'
import { usePokemonStore} from '../store/pokemonStore'
export default {
  name: 'GenerationVue',
  props: ['num'],
  data() {
    return {
      allGenPokemon: [],
      idGen: 1,
      pokeForPokedex: ''
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
    },
    setPokeInPokedex(pokemoImg) {
      this.pokeForPokedex = getIdForImgPokemon(pokemoImg)
      usePokemonStore().setPokemonGen(this.pokeForPokedex)
    }
  },
  async beforeMount() {
    this.allGenPokemon = await getPokemonsOfGeneration(this.idGen)
  }
}
</script>
<style>
h2 {
  flex-direction: column;
}
button {
  background: transparent;
  font-size: 20px;
}

.pokeInGen {
  width: 115px;
  height: 115px;
  top: 86px;
  right: 92px;
  transform: scale(1);
  cursor: pointer;
  transition: transform 0.3s;
}
.pokeInGen:hover {
  transform: scale(1.5);
}
.pokeGen {
  overflow-y: scroll;
  background-color: transparent;
  width: 750px;
  height: 500px;
  object-position: left top;
  position: absolute;
}
::-webkit-scrollbar-track {
  display: none;
}

/* Estilos adicionais para a barra de rolagem */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
