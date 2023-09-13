<template>
  <div id="container-imagem" :style="{ backgroundImage: backType }">
    <button class="buttonOn" @click="pokedexOn(1)" v-if="open != 1"></button>
    <button class="buttonOff" @click="pokedexOn(0)" v-else></button>
    <div class="dexGen" v-if="open != 0">
      <div class="pokedex">
        <img class="imgPokedex" src="../../public/img/Pok_dex_Kanto_1.png" />
        <div class="searchPokeMenu">
          <p id="msg">Type the Pokemon</p>
          <br />
          <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
        </div>
        <div class="pokemon">
          <button class="butMoreInfoPoke" :disabled="isLoading" @click="mostInfoPoke">
            {{ icon }}
          </button>
          <div class="loadInfo" v-if="error == ''">
            <div v-if="objPokemon">
              <div class="nomePoke" v-if="!isWhiteSprite" :style="{ display: imageDisplay }">
                Name: {{ objPokemon.name }}
              </div>
              <img
                :src="newSprite"
                alt="Pokemon non existe"
                :class="{ whiteSprite: isWhiteSprite }"
                :style="{ display: imageDisplay }"
              />
              <div class="loader" :style="{ display: load }"></div>
              <div class="infoPoke" :style="{ display: menuInfo }">
                Type:
                <p v-for="typePoke in objInfoPoke[1]" :key="typePoke">
                  <img class="imgIconType" :src="`../../public/img/icons/${typePoke}.ico`" />
                </p>
                <br />-------<br />
                <p>Gen: {{ objInfoPoke[4] }}</p>
                <br />-------<br />
                <p>Descri: {{ objInfoPoke[5] }}</p>
                <br />------<br />
                <p>EvoChain:</p>
                <br />
                <p v-for="sprite in objInfoPoke[6]" :key="sprite"><img :src="sprite" /></p>
              </div>
            </div>
          </div>
          <p class="error">{{ error }}</p>
        </div>
        <div class="dpad">
          <button
            :disabled="isLoading"
            @click="attPoke(objPokemon.id, parseInt(objInfoPoke[3]) - 1)"
            class="buttonBack"
          ></button>
          <button
            :disabled="isLoading"
            @click="attPoke(objPokemon.id, parseInt(objInfoPoke[3]) + 1)"
            class="buttonNext"
          ></button>
          <button
            :disabled="isLoading"
            @click="attPoke(parseInt(idPokeInEvo) - 1, objInfoPoke[0])"
            class="buttonInvolue"
          ></button>
          <button
            :disabled="isLoading"
            @click="attPoke(parseInt(idPokeInEvo) + 1, objInfoPoke[0])"
            class="buttonEvolue"
          ></button>
        </div>
      </div>
      <GenerationVue class="clasGen" v-bind:num="open" />
    </div>
    <div v-else>
      <img
        class="imgPokedex"
        src="../../public/img/Kanto_Pok%3Fdex_Infobox-PhotoRoom.png-PhotoRoom.png"
      />
    </div>
  </div>
</template>
<script>
import { getPokemon, getAttPokemon, checkEvo, getInfoPlusPoke } from '../api'
import GenerationVue from './GenerationVue.vue'
import { usePokemonStore } from '../store/pokemonStore'

export default {
  name: 'PokedexVue',
  props: ['num'],
  data() {
    return {
      nome: '',
      objPokemon: '',
      idPokeInEvo: '',
      open: 0,
      imageDisplay: 'block',
      load: 'none',
      error: '',
      objInfoPoke: '',
      menuInfo: 'none',
      icon: '+',
      isLoading: true,
      backType: 'url(../public/img/backgroundsType/start.png)',
      isWhiteSprite: false,
      oldSprite: '',
      newSprite: '',
      nIntervalId: ''
    }
  },
  components: {
    GenerationVue
  },
  computed: {
    pokeForGen() {
      return usePokemonStore().pokeGen
    }
  },
  watch: {
    pokeForGen(novoValor) {
      this.searchPokemon(novoValor)
    }
  },
  methods: {
    pokedexOn(n) {
      this.open = n
      if (n == 0) {
        this.objPokemon = ''
        this.isLoading = true
        this.backType = 'url(../public/img/backgroundsType/start.png)'
      }
    },
    hideImageForSeconds(seconds, msg) {
      this.imageDisplay = 'none'
      if (msg == 'await') {
        this.isLoading = true
        this.load = 'block'
        setTimeout(() => {
          this.imageDisplay = 'block'
          this.isLoading = false
          this.load = 'none'
        }, seconds * 1000)
      } else if (msg == 'evo') {
        this.imageDisplay = 'block'
        this.flashSprite()
        setTimeout(() => {
          this.isWhiteSprite = false
          this.newSprite = this.objPokemon.sprites.front_default
          clearInterval(this.nIntervalId)
        }, 2500)
      } else {
        this.error = msg
        setTimeout(() => {
          this.imageDisplay = 'block'
          this.error = ''
        }, seconds * 1000)
      }
    },
    flashSprite() {
      this.isWhiteSprite = true
      this.nIntervalId = setInterval(() => {
        if (this.newSprite == this.oldSprite) {
          this.newSprite = this.objPokemon.sprites.front_default
        } else {
          this.newSprite = this.oldSprite
        }
      }, 500)
    },
    async searchPokemon(nomePokemon) {
      this.nome = ''
      this.menuInfo = 'none'
      this.icon = '+'
      this.objPokemon = await getPokemon(nomePokemon)
      if (this.objPokemon != undefined) {
        if (this.oldSprite != '' && this.objInfoPoke[0].includes(nomePokemon)) {
          this.hideImageForSeconds(0, 'evo')
        } else {
          this.hideImageForSeconds(2.0, 'await')
        }
        this.newSprite = this.objPokemon.sprites.front_default
        this.error = ''
        await this.infoPlus(this.objPokemon)
      } else {
        this.hideImageForSeconds(1.5, 'Pokemon not found')
      }
    },
    async infoPlus(poke) {
      this.objInfoPoke = await getInfoPlusPoke(poke, this.evoChain)
      this.idPokeInEvo = this.objInfoPoke[0].indexOf(poke.name)
      this.backType = `url(../public/img/backgroundsType/${this.objInfoPoke[1][0]}.png)`
    },
    async attPoke(poke, option) {
      if (checkEvo(option, poke)) {
        const updatedPokemon = await getAttPokemon(poke, option)
        if (updatedPokemon) {
          this.oldSprite = this.objPokemon.sprites.front_default
          this.searchPokemon(updatedPokemon)
        } else {
          this.hideImageForSeconds(1.5, 'No more Evo')
        }
      } else {
        this.hideImageForSeconds(1.5, 'Over Pokemons')
      }
    },
    mostInfoPoke() {
      if (this.imageDisplay == 'block') {
        this.icon = 'x'
        this.imageDisplay = 'none'
        this.menuInfo = 'block'
      } else {
        this.imageDisplay = 'block'
        this.menuInfo = 'none'
        this.icon = '+'
      }
    }
  }
}
</script>
<style scoped>
.imgIconType {
  height: 25px;
}
.pokedex {
  left: 100px;
  position: absolute;
  top: 15%;
}
.imgPokedex {
  height: 650px;
}
#container-imagem {
  position: relative;
  left: -350px;
  height: 100vh;
  width: 100vw;
  background-image: url(../public/img/backgroundsType/start.png);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.infoPoke {
  width: 200px;
  height: 130px;
  top: -20px;
  transform: rotate(1deg);
  left: -35px;
  position: absolute;
  overflow-y: scroll;
  background: transparent;
  color: rgb(4, 209, 4);
  font-weight: bold;
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
.butMoreInfoPoke {
  position: absolute;
  left: 130px;
  top: 110px;
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
  position: inherit;
  left: px;
  bottom: -30px;
  width: 40px;
  height: 32px;
  transform: rotate(-2deg);
  color: rgb(4, 209, 4);
}

.pokemon {
  bottom: 455px;
  position: absolute;
  left: 170px;
}
.imgPokemon {
  width: 105px;
  height: 105px;
  position: absolute;
}
.whiteSprite {
  filter: brightness(0) invert(1) grayscale(100%);
}
.error {
  position: absolute;
  background: transparent;
  display: inline;
  transform: rotate(-1deg);
}
.dexGen {
  display: flex;
}
.dpad {
  position: relative;
  top: 80px;
  left: 62px;
}
.buttonBack {
  background: transparent;
  position: relative;
  top: -285px;
  right: -215px;
  height: 30px;
  width: 30px;
}
.buttonNext {
  background: transparent;
  position: relative;
  top: -288px;
  right: -250px;
  height: 30px;
  width: 30px;
}
.buttonEvolue {
  background: transparent;
  position: relative;
  top: -320px;
  right: -157px;
  height: 30px;
  width: 30px;
}
.buttonInvolue {
  background: transparent;
  position: relative;
  top: -250px;
  right: -187px;
  height: 30px;
  width: 30px;
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
  top: -440px;
  right: -515px;
  font-size: 15px;
  color: rgb(12, 215, 12);
  width: 200px;
  transform: rotate(-2.6deg);
}
.buttonOff {
  position: absolute;
  left: 175px;
  top: 625px;
  height: 40px;
  width: 40px;
  background: transparent;
  border-radius: 30px;
  z-index: 1;
}
.buttonOn {
  position: absolute;
  left: 41%;
  top: 51.5%;
  height: 55px;
  width: 30px;
  background: transparent;
  transform: rotate(-19deg);
}
</style>
