<template>
  <div>
    <p>Olá, seja bem vindo a sua Pokedex Online</p>
    <br />
    <p>Digite o número do Pokemon(0-1000)</p>
    <number-poke @valor-recebido="capturarValor" />
    <br />
    <div>O número do Pokemon digitado se chama {{ nome }}
      <img v-if="image" :src="image" alt="Imagem do Pokémon">
    </div>
  </div>
</template>
<script>
import { fetchData } from '../api';
import NumberPoke from '../NumberPoke.vue'
export default {
  name: 'HomePokedex',
  data(){
    return{
        nome:'',
        image:'',
        pokemons: [],
    }
  },
  computed:{
     itens() {
        return fetchData()
    }
  },
  components:{
    NumberPoke
  },
  methods:{
    capturarValor(valor){
        this.pokemons = this.itens
        this.nome = this.pokemons[valor].name
        fetch(this.pokemons[valor].url)
        .then(response => response.json())
        .then(pokemonData => {
          // Obtém a URL da imagem do JSON retornado
          this.image = pokemonData.sprites.front_default;
        })
    },
  }

}
</script>
<style></style>
