<template>
  <div>
  <button class="buttonOn" @click="pokedexOn(1)" v-if="open != 1"></button>
    <button class="buttonOff" @click="pokedexOn(0)" v-else></button>
    <div class="flex" v-if="open != 0">
      <div class="searchPoke">
        <div class="pokedex">
          <img src="../../public/img/Pok_dex_Kanto_1.png"/>
        </div>
        <div class="searchPokeMenu">
          <h6 id="msg">Digite o Nome do Pokemon</h6>
          <br />
          <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
        </div>
        <div class="pokeInPokedex" v-if="objPokemon.id > 0">
          <div class="pokemon">
            <img
              :src="objPokemon.sprites.front_default"
              alt="Pokemon non existe"
              class="imgPokemon"
            />
          </div>
          <button @click="attPoke(objPokemon.id, parseInt(idEvo) - 1)" class="buttonBack"></button>
          <button @click="attPoke(objPokemon.id, parseInt(idEvo) + 1)" class="buttonNext"></button>
          <button
            @click="attPoke(parseInt(idPokeInEvo) - 1, evoChain)"
            class="buttonInvolue"
          ></button>
          <button
            @click="attPoke(parseInt(idPokeInEvo) + 1, evoChain)"
            class="buttonEvolue"
          ></button>
        </div>
        <div v-else></div>
      </div>
      <GenerationVue class="clasGen" v-bind:num="open"/>
    </div>
    <div v-else>
      <img src="../../public/img/Kanto_Pok_dex_Infobox.png" />
    </div>
  </div>
</template>
<script>
import {
  getPokemon,
  evolutionChain,
  getUrlEvolution,
  getIdEvolutionChain,
  getAttPokemon,
  checkEvo,
  checkId
} from '../api'
import GenerationVue from './Generation.vue'
export default {
  name: 'App',
  props:['num'],
  data() {
    return {
      nome: '',
      objPokemon: '',
      allGenPokemon: [],
      evoChain: [],
      idGen: 1,
      urlEvo: '',
      idEvo: '',
      idPokeInEvoo: '',
      open: 0
    }
  },
  components:{
    GenerationVue
  },
  methods: {
    pokedexOn(n) {
      this.open = n
    },
    async searchPokemon(nomePokemon) {
      this.nome = ''
      if (checkId(nomePokemon)) {
        this.objPokemon = await getPokemon(nomePokemon)
        this.evoChain = await evolutionChain(nomePokemon)
        this.idPokeInEvo = this.evoChain.indexOf(this.objPokemon.name)
        this.urlEvo = await getUrlEvolution(nomePokemon)
        this.idEvo = await getIdEvolutionChain(this.urlEvo)
      } else {
        alert('Non existe tal pokemon meu parça')
      }
    },
    
    async attPoke(poke, option) {
      this.nome = ' '
      if (checkEvo(option)) {
        if (await getAttPokemon(poke, option)) {
          this.searchPokemon(await getAttPokemon(poke, option))
        } else {
          alert('Non ha mais evo')
        }
      } else {
        alert('Non ha mais pokemon')
      }
    },
    
  }
}
</script>
<style>
.pokemon {
  position: relative;
  top: -360px;
  right: -140px;
}
.imgPokemon {
  width: 100px;
  height: 100px;
}
.flex {
  display: flex;
}
.buttonBack {
  background: transparent;
  position: relative;
  top: -285px;
  right: -225px;
  height: 25px;
  width: 25px;
  border: none;
}
.buttonNext {
  background: transparent;
  position: relative;
  top: -285px;
  right: -250px;
  height: 25px;
  width: 25px;
  border: none;
}
.buttonEvolue {
  background: transparent;
  position: relative;
  top: -310px;
  right: -175px;
  height: 25px;
  width: 25px;
  border: none;
}
.buttonInvolue {
  background: transparent;
  position: relative;
  top: -260px;
  right: -200px;
  height: 25px;
  width: 25px;
  border: none;
}
h6 {
  display: inline;
  font-size: 15px;
  font-weight: 700;
  color: green;
}
input {
  height: 25px;
  width: 100px;
  background: transparent;
  color: green;
}
.searchPokeMenu {
  display: inline;
  position: relative;
  top: -350px;
  right: -415px;
}
.buttonOff {
  position: relative;
  top: 420px;
  right: -50px;
  height: 50px;
  width: 50px;
  background:transparent;
  border: none;
  border-radius: 25px;

}
.buttonOn {
  position: relative;
  top: 340px;
  right: -70px;
  height: 50px;
  width: 50px;
  background:transparent;
  border: none;
  border-radius: 25px;
}
</style>
