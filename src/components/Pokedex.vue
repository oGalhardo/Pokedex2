<template>
  <div class="all">
    <button class="buttonOn" @click="pokedexOn(1)" v-if="open != 1"></button>
    <button class="buttonOff" @click="pokedexOn(0)" v-else></button>
    <div class="dexGen" v-if="open != 0">
      <div class="pokedex">
        <img src="../../public/img/Pok_dex_Kanto_1.png" />
        <div class="searchPokeMenu">
          <p id="msg">Type the Pokemon</p>
          <br />
          <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
        </div>
        <div class="pokemon">
          <div v-if="objPokemon.id > 0">
            <img
              :src="objPokemon.sprites.front_default"
              alt="Pokemon non existe"
              class="imgPokemon"
              :style="{ display: imageDisplay }"
            />
            <div class="loader" :style="{display: load}"></div>
          </div>
          <p class="error">{{ error }}</p>
        </div>
        <div class="dpad">
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
      </div>
      <GenerationVue class="clasGen" v-bind:num="open" />
    </div>
    <div v-else>
      <img src="../../public/img/Kanto_Pok%3Fdex_Infobox-PhotoRoom.png-PhotoRoom.png" />
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
  checkId,
  getImage
} from '../api'
import GenerationVue from './Generation.vue'
export default {
  name: 'App',
  props: ['num'],
  data() {
    return {
      nome: '',
      objPokemon: '',
      evoChain: [],
      urlEvo: '',
      idEvo: '',
      idPokeInEvoo: '',
      open: 0,
      imageDisplay: 'block',
      load: 'none',
      error: ''
    }
  },
  components: {
    GenerationVue
  },
  methods: {
    pokedexOn(n) {
      this.open = n
    },
    hideImageForSeconds(seconds, msg) {
      this.imageDisplay = 'none' // Esconde a imagem
      this.error = msg
      setTimeout(() => {
        this.imageDisplay = 'block' // Mostra a imagem novamente após o intervalo de tempo
        this.error = ''
      }, seconds * 1000) // Converte segundos para milissegundos
    },
    hideLoadforSeconds(seconds) {
      this.imageDisplay = 'none' // Esconde a imagem
      this.load = 'block'
      setTimeout(() => {
        this.imageDisplay = 'block' // Mostra a imagem novamente após o intervalo de tempo
        this.load = 'none'
      }, seconds * 1000) // Converte segundos para milissegundos
    },
    async searchPokemon(nomePokemon) {
      this.hideLoadforSeconds(2)
      this.nome = ''
      if (checkId(nomePokemon)) {
        this.objPokemon = await getImage(nomePokemon)
        this.error = ''
        await this.infoPlus(nomePokemon)
      } else {
        this.hideImageForSeconds(2, 'Pokemon not found')
      }
    },
    async infoPlus(poke) {
      this.objPokemon = await getPokemon(poke)
      this.evoChain = await evolutionChain(this.objPokemon.id)
      this.idPokeInEvo = this.evoChain.indexOf(this.objPokemon.name)
      this.urlEvo = await getUrlEvolution(this.objPokemon.id)
      this.idEvo = await getIdEvolutionChain(this.urlEvo)
    },
    async attPoke(poke, option) {
      this.hideLoadforSeconds(2)
      if (checkEvo(option, poke)) {
        const updatedPokemon = await getAttPokemon(poke, option)
        if (updatedPokemon) {
          this.searchPokemon(updatedPokemon)
        } else {
          this.hideImageForSeconds(3, 'No more Evo')
        }
      } else {
        this.hideImageForSeconds(3, 'Over Pokemons')
      }
    }
  },
  mounted() {
    this.hideImageForSeconds(2) // Chama a função para esconder a imagem por 3 segundos
    this.hideLoadforSeconds(2)
  }
}
</script>
<style>
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid rgb(4, 209, 4); /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 20px;
  right: 615px
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.all {
  background: transparent;
  position: absolute;
  left: 250px;
  bottom: -300px;
}
.pokemon {
  position: relative;
  top: -360px;
  right: -140px;
}
.imgPokemon {
  width: 100px;
  height: 100px;
  position: absolute;
}
.error {
  position: absolute;
  background: transparent;
  display: inline;
  top: 20x;
  right: 620px;
}
.dexGen {
  display: flex;
}
.dpad {
  position: relative;
  top: 110px;
}
.buttonBack {
  background: transparent;
  position: relative;
  top: -285px;
  right: -225px;
  height: 25px;
  width: 25px;
}
.buttonNext {
  background: transparent;
  position: relative;
  top: -285px;
  right: -250px;
  height: 25px;
  width: 25px;
}
.buttonEvolue {
  background: transparent;
  position: relative;
  top: -310px;
  right: -175px;
  height: 25px;
  width: 25px;
}
.buttonInvolue {
  background: transparent;
  position: relative;
  top: -260px;
  right: -200px;
  height: 25px;
  width: 25px;
}
p {
  display: inline;
  font-size: 15px;
  font-weight: 700;
  color: rgb(12, 215, 12);
  transform: rotate(10deg);
}
input {
  display: inline;
  height: 25px;
  width: 100px;
  background: transparent;
  color: rgb(12, 215, 12);
}
.searchPokeMenu {
  position: relative;
  top: -360px;
  right: -415px;
  font-size: 15px;
  color: rgb(12, 215, 12);
  width: 200px;
  transform: rotate(-2.6deg);
}
.buttonOff {
  position: relative;
  right: -60px;
  top: 420px;
  border-radius: 25px;
  height: 35px;
  width: 35px;
  background: transparent;
}
.buttonOn {
  position: relative;
  top: 340px;
  right: -95px;
  height: 50px;
  width: 20px;
  background: transparent;
  transform: rotate(-20deg);
}
</style>
