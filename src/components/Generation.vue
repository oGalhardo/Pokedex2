<template>
  <div class="carousel-div">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      padding
      arrows
      navigation
      navigation-icon="radio_button_unchecked"
      class="rounded-borders"
    >
      <q-carousel-slide class="slide" name="style">
        <q-scroll-area class="fit">
          <div class="row">
            <q-avatar
              v-for="(poke, index) in pokemons"
              :key="index"
              size="100px"
              class="overlapping"
              @click="envityPokemonForPokedex(poke)"
            >
              <img :src="poke.image" />
            </q-avatar>
          </div>
        </q-scroll-area>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pa-lg flex flex-center">
      <q-badge align="top">Generation</q-badge>

      <q-pagination v-model="gen" :max="9" @click="auxGen(gen)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { apolloClient } from '../modules/query'
import getGeneration from './graphql/pokemon/Generation.gql'

const emits = defineEmits(['envityPokeOfGen'])
const slide = ref('style')
const pokemons = ref([])
const gen = 1
async function auxGen(gen: number): Promise<void> {
  try {
    const { data } = await apolloClient.query({
      query: getGeneration,
      variables: {
        generation: gen
      }
    })
    pokemons.value = data.getGeneration
  } catch (error) {
    console.error('Error fetching Pokemon:', error)
    throw error
  }
}
function envityPokemonForPokedex(poke: object) {
  emits('envityPokeOfGen', poke.name)
}
onMounted(async () => {
  try {
    await auxGen(1)
  } catch (error) {
    console.error('Error fetching Pokemon:', error)
    throw error
  }
})
</script>
<style scoped>
.slide {
  padding: 0 !important;
  cursor: pointer;
  border: none;
}

.carousel-div {
  padding: 0 !important;
  border: none;
}
</style>
