<template>
  <div>
    <q-btn class="button" flat color="white" icon="search" @click="fetchPokemon" />
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { apolloClient } from '../../modules/query'
import getPokemon from '../graphql/pokemon/Pokemon.gql'
const emits = defineEmits(['envityPokeofSearchButton'])
const props = defineProps({
  pokemonName: {
    type: String,
    default: ''
  }
})

async function fetchPokemon() {
  try {
    const { data } = await apolloClient.query({
      query: getPokemon,
      variables: {
        name: props.pokemonName
      }
    })
    emits('envityPokeofSearchButton', data.getPokemon)
  } catch (error) {
    console.error('Error fetching Pokemon:', error)
  }
}
watchEffect(() => {
  if (props.pokemonName) {
    fetchPokemon()
  }
})
</script>

<style scoped>
.button {
  height: 30px;
  width: 35px;
}
</style>
