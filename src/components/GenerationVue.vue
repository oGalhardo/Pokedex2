<template>
  <div class="genAll" v-if="num === 1">
    <div class="topGen">
      <h2>Generation:{{ idGen }}</h2>
      <button @click="attGeneration(idGen - 1)">&#8592;</button>
      <button @click="attGeneration(idGen + 1)">&#8594;</button>
      <div v-if="allGenPokemon != ''" :class="{ checkBoxList: true, 'right-align': num === 1 }">
        <button
          class="searchButtonType"
          :disabled="selectedTypes == ''"
          @click="setTypesForGen([selectedTypes])"
        >
          Search for Type
        </button>
        <button class="backNormal" @click="comebackNormal">♻</button>
        <label v-for="typePoke in types" :key="typePoke">
          <input
            type="checkbox"
            v-model="selectedTypes"
            :value="typePoke"
            @change.prevent="checkHandler()"
          />
          <img class="imgIconTypeInGen" :src="`../../public/img/icons/${typePoke}.ico`" alt="" />
        </label>
      </div>
      <div class="loadTypes" v-else>Loading Types...</div>
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
import {
  getPokemonsOfGeneration,
  checkGeneration,
  getIdForImgPokemon,
  getTypesOfIdPokeGen,
  getPokeTypeSelected
} from '../api'
import { usePokemonStore } from '../store/pokemonStore'
export default {
  name: 'GenerationVue',
  props: ['num'],
  data() {
    return {
      saveGenPoke: [],
      allGenPokemon: [],
      selectedTypes: [],
      idGen: 1,
      pokeForPokedex: '',
      selectedPoke: '',
      types: ''
    }
  },
 
  methods: {
    async attGeneration(gen) {
      if (checkGeneration(gen)) {
        this.idGen = gen
        this.allGenPokemon = []
        this.allGenPokemon = await getPokemonsOfGeneration(gen)
        this.types = await getTypesOfIdPokeGen(this.allGenPokemon)
      } else {
        alert('Não existe mais gerações')
      }
    },
    setPokeInPokedex(pokemoImg) {
      this.pokeForPokedex = getIdForImgPokemon(pokemoImg)
      usePokemonStore().setPokemonGen(this.pokeForPokedex)
    },
    async setTypesForGen(typesPokemons) {
      this.allGenPokemon = await getPokeTypeSelected(typesPokemons, this.saveGenPoke)
      if (this.allGenPokemon.length < 1) {
        alert('Não existe essa combinação de pokemon')
        this.allGenPokemon = this.saveGenPoke
      }
    },
    comebackNormal() {
      this.allGenPokemon = this.saveGenPoke
    },
    checkHandler() {
      if (this.selectedTypes.length > 2) {
        alert('Não existem pokemons com mais de 2 tipos')
        this.selectedTypes.pop()
      }
    }
  },
  async beforeMount() {
    this.saveGenPoke = await getPokemonsOfGeneration(this.idGen)
    this.allGenPokemon = this.saveGenPoke
    this.types = await getTypesOfIdPokeGen(this.allGenPokemon)
  }
}
</script>
<style scoped>
.backNormal{
  position: fixed;
  right: 45%;
  bottom: 5%;
  background: transparent;
}
.loadTypes {
  left: 70px;
  top: 610px;
  position: absolute;
}
.imgIconTypeInGen {
  height: 30px;
  width: 30px;
  background: black;
}
.searchButtonType {
  position: fixed;
  right: 45%;
  bottom: 10%;
  background: transparent;
}
.checkBoxList {
  text-align: justify; /* Justifica o conteúdo dentro do contêiner */
  position: absolute;
  left: 70px; /* Ajuste a posição horizontal conforme necessário */
  top: 610px; /* Ajuste a posição vertical conforme necessário */
  width: 607px; /* Define a largura do contêiner para ocupar toda a largura disponível */
}

.checkBoxList label {
  text-align: left; /* Alinha o texto dos rótulos à esquerda */
  padding-right: 7px;
  display: inline-block;
  width: 120px;
}

.topGen {
  position: relative;
  right: 700px;
  top: -15px;
}
.topGen button {
  background-color: transparent;
  font-size: 20px;
}
.genAll {
  position: absolute;
  right: 10px;
  top: 230px;
}
.initialGen {
  position: absolute;
  right: 700px;
  top: -100px;
}

.pokeInGen {
  width: 115px;
  height: 115px;
  right: 160px;
  transform: scale(1);
  cursor: pointer;
  transition: transform 0.3s;
  overflow: visible;
}
.pokeInGen:hover {
  transform: scale(1.5);
}
.pokeGen {
  overflow-y: scroll;
  background-color: transparent;
  width: 760px;
  height: 500px;
  object-position: left top;
  position: absolute;
  right: 100px;
  padding: 25px;
}
::-webkit-scrollbar-track {
  display: none;
}

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
