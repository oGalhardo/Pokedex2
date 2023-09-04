<template>
  <div class="all">
    <img src="imgs" alt="" />
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
          <button class="butMoreInfoPoke" @click="mostInfoPoke">{{ icon }}</button>
          <div class="loadInfo" v-if="error == ''">
            <div v-if="objPokemon">
              <div class="nomePoke"  :style="{ display: imageDisplay }" >Name: {{ objPokemon.name }}</div>
              <img
                :src="objPokemon.sprites.front_default"
                alt="Pokemon non existe"
                class="imgPokemon"
                :style="{ display: imageDisplay }"
              />
              <div class="loader" :style="{ display: load }"></div>
              <div class="infoPoke" :style="{ display: menuInfo }">
                <p>Type:{{ objInfoPoke[0] }}</p>
                <br />-------<br />
                <p>Gen:{{ objInfoPoke[1] }}</p>
                <br />-------<br />
                <p>Descri:{{ objInfoPoke[2] }}</p>
              </div>
            </div>
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
  getInfoPlusPoke
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
      error: '',
      objInfoPoke: '',
      menuInfo: 'none',
      icon:'+'
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
      this.imageDisplay = 'none'
      if (msg != 'await') {
        this.error = msg
        setTimeout(() => {
          this.imageDisplay = 'block'
          this.error = ''
        }, seconds * 1000)
      } else {
        this.load = 'block'
        setTimeout(() => {
          this.imageDisplay = 'block'
          this.load = 'none'
        }, seconds * 1000)
      }
    },
    async searchPokemon(nomePokemon) {
      this.nome = ''
      this.objPokemon = await getPokemon(nomePokemon)
      if (this.objPokemon != undefined) {
        this.hideImageForSeconds(1.5, 'await')
        this.error = ''
        await this.infoPlus(this.objPokemon)
      } else {
        this.hideImageForSeconds(1.5, 'Pokemon not found')
      }
    },
    async infoPlus(poke) {
      this.objInfoPoke = await getInfoPlusPoke(poke)
      this.evoChain = await evolutionChain(poke.name)
      this.idPokeInEvo = this.evoChain.indexOf(poke.name)
      this.urlEvo = await getUrlEvolution(poke.id)
      this.idEvo = await getIdEvolutionChain(this.urlEvo)
    },
    async attPoke(poke, option) {
      if (checkEvo(option, poke)) {
        const updatedPokemon = await getAttPokemon(poke, option)
        this.hideImageForSeconds(1.5, 'await')
        if (updatedPokemon) {
          this.searchPokemon(updatedPokemon)
        } else {
          this.hideImageForSeconds(1.5, 'No more Evo')
        }
      } else {
        this.hideImageForSeconds(1.5, 'Over Pokemons')
      }
    },
    async mostInfoPoke() {
      if(this.imageDisplay == 'block'){
        this.icon = 'x'
        this.imageDisplay = 'none'
        this.menuInfo = 'block'
      }else{
        this.imageDisplay = 'block'
        this.menuInfo = 'none'
        this.icon = '+'
      }
    }
  }
}
</script>
<style>
.infoPoke {
  width: 150px;
  height: 100px;
  top: -20px;
  transform: rotate(-0.5deg);
  left: -35px;
  position: absolute;
  overflow-y: scroll;
  background: transparent;
}
.butMoreInfoPoke {
  position: absolute;
  left: 95px;
  top: 87px;
  width: 50px;
  height: 33px;
  transform: rotate(-1deg);
  background: black;
  border-radius: 20px;
  color: white;
}
.nomePoke {
  position: absolute;
  height: 110px;
  left: -35px;
  top: -20px;
  width: 160px;
  font-weight: bold;
}

.loader {
  height: 60px;
  aspect-ratio: 1;
  position: absolute;
  left: 20px;
  top: 10px;
}
.loader::before,
.loader::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transform-origin: bottom;
}
.loader::after {
  background:
    radial-gradient(at 75% 15%, #fffb, #0000 35%),
    radial-gradient(at 80% 40%, #0000, #0008),
    radial-gradient(circle 5px, #fff 94%, #0000),
    radial-gradient(circle 10px, #000 94%, #0000),
    linear-gradient(#f93318 0 0) top / 100% calc(50% - 5px),
    linear-gradient(#fff 0 0) bottom/100% calc(50% - 5px) #000;
  background-repeat: no-repeat;
  animation: l20 1s infinite cubic-bezier(0.5, 120, 0.5, -120);
}
.loader::before {
  background: #ddd;
  filter: blur(8px);
  transform: scaleY(0.4) translate(-13px, 0px);
}
@keyframes l20 {
  30%,
  70% {
    transform: rotate(0deg);
  }
  49.99% {
    transform: rotate(0.2deg);
  }
  50% {
    transform: rotate(-0.2deg);
  }
}
.loadInfo {
  position: absolute;
  left: 5px;
  bottom: -30px;
  width: 40px;
  height: 32px;
  transform: rotate(-2deg);
  color: rgb(4, 209, 4);
}
.all {
  background: transparent;
  position: absolute;
  left: 250px;
  bottom: -300px;
}
.pokemon {
  position: relative;
  top: -350px;
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
  right: 600px;
  transform: rotate(-1deg);
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
