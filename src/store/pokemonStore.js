import { defineStore } from 'pinia'
export const usePokemonStore = defineStore('infoPokemon', {
  state: () => ({
    pokeGen: ''
  }),
  actions: {
    setPokemonGen(pokeId) {
      this.pokeGen = pokeId
    }
  },
  getters: {
    getPokemonInGen: (state) => state.pokeGen
  }
})
