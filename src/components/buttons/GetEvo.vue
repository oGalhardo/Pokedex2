<template>
  <button @click="evolution()">.</button>
</template>
<script setup lang="ts">
import getEvo from '../graphql/pokemon/EvolutionChain.gql'
import { apolloClient } from '../../modules/query'
const emits = defineEmits(['envityImg'])
const props = defineProps({
  pokemonName: {
    type: String,
    default: ''
  },
  choice: {
    type: String,
    default: ''
  }
})
async function evolution() {
  const { data } = await apolloClient.query({
    query: getEvo,
    variables: { name: props.pokemonName, option: props.choice }
  })
  emits('envityImg', data.getEvo)
}
</script>
