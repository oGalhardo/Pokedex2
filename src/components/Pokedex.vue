<template>
  <div>
    <button class="buttonOn" @click="pokedexOn(1)" v-if="open != 1"></button>
    <button class="buttonOff" @click="pokedexOn(0)" v-else></button>
    <div class="dexGen" v-if="open != 0">
      <div class="pokedex">
        <img src="../../public/img/Pok_dex_Kanto_1.png" />
        <div class="searchPokeMenu">
          <p id="msg">Digite o Nome do Pokemon</p>
          <br />
          <input type="text" v-model="nome" @keyup.enter="searchPokemon(nome)" />
        </div>
        <div class="pokemon">
          <div v-if="objPokemon.id > 0">
            <img
              :src="objPokemon.sprites.front_default"
              alt="Pokemon non existe"
              class="imgPokemon"
            />
          </div>
          <p class="errorMsg" v-else></p>
        </div>
        <button @click="attPoke(objPokemon.id, parseInt(idEvo) - 1)" class="buttonBack"></button>
        <button @click="attPoke(objPokemon.id, parseInt(idEvo) + 1)" class="buttonNext"></button>
        <button
          @click="attPoke(parseInt(idPokeInEvo) - 1, evoChain)"
          class="buttonInvolue"
        ></button>
        <button @click="attPoke(parseInt(idPokeInEvo) + 1, evoChain)" class="buttonEvolue"></button>
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
  checkId
} from '../api'
import GenerationVue from './Generation.vue'
export default {
  name: 'App',
  props: ['num'],
  data() {
    return {
      nome: '',
      objPokemon: '',
      allGenPokemon: [],
      evoChain: [],
      urlEvo: '',
      idEvo: '',
      idPokeInEvoo: '',
      open: 0,
    }
  },
  components: {
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
        await this.infoPlus(this.objPokemon.id, this.objPokemon.name)
      } else {
        const errorMsgElement = document.querySelector(".errorMsg");
        errorMsgElement.textContent = "Não existe esse pokemon";
      }
    },
    async infoPlus(id, name) {
      this.evoChain = await evolutionChain(id)
      this.idPokeInEvo = this.evoChain.indexOf(name)
      this.urlEvo = await getUrlEvolution(id)
      this.idEvo = await getIdEvolutionChain(this.urlEvo)
    },
    async attPoke(poke, option) {
      this.nome = ' '
      if (checkEvo(option)) {
        if (await getAttPokemon(poke, option)) {
          this.searchPokemon(await getAttPokemon(poke, option))
        } else {
          const errorMsgElement = document.querySelector(".errorMsg");
          errorMsgElement.textContent = "Não há mais evoluções";        }
      } else {
        const errorMsgElement = document.querySelector(".errorMsg");
        errorMsgElement.textContent = "Não há pokemon pokemon";
      }
    }
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
.errorMsg {
  color: rgb(12, 215, 12);
  font-size: 15px;
  font-weight: 700;
  widows: 40px
  ;
}
.dexGen {
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
  background: black;
  right: -50px;
  top: 425px;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  background: transparent;
  border: none;
}
.buttonOn {
  position: relative;
  top: 340px;
  right: -70px;
  height: 50px;
  width: 50px;
  background: transparent;
  border: none;
  border-radius: 25px;
}
</style>
