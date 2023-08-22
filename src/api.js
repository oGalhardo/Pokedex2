const BASE_API = 'https://pokeapi.co/api/v2'
export async function getPokemon(pokemon) {
  return await getFromAPI('pokemon', pokemon)
}
export function attPokemon(id) {
  if (id > 0) {
    return id
  } else {
    return alert('Não existem mais pokemons')
  }
}
export async function getImage(identifier) {
  const poke = await getPokemon(identifier)
  return poke.sprites.front_default
}
export async function getIdPokemon(identifier) {
  const poke = await getPokemon(identifier)
  return poke.id
}
export async function getSpecies(identifier) {
  return await getFromAPI('pokemon-species', identifier)
}
export async function getGenerationName(identifier) {
  const poke = await getSpecies(identifier)
  return poke.generation.name
}
export async function getGenerationId(id) {
  const poke = await getFromAPI('generation', id)
  return poke.name
}











export function checkGeneration(id) {
  if (id > 0) {
    return id
  } else {
    ;('Não há mais gerações')
  }
}
export async function getAllPokemonsOfGeneration(generation) {
  const sprites = []
  const nameGeneration = await getGenerationId(generation)
  for (var  i = 1;  i <= 1; i++) {
    if ((await getGenerationName(i)) == nameGeneration) {
      sprites.push(await getImage(i))
    } else {
      break
    }
  }
  return Promise.all(sprites)
}




















//Metódos para evolução do Pokemon//
export async function getUrlEvolution(identifier) {
  const poke = await getSpecies(identifier)
  return poke.evolution_chain
}
export async function checkEvolution(pokeid, {url}) {
  const evolution = await getUrlEvolution(pokeid)
  if (evolution.url == url) {
    return 1
  } else {
    return 0
  }
}

async function getFromAPI(path, identifier) {
  return await fetch(`${BASE_API}/${path}/${identifier}/`, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
    .then((data) => data.json())
    .catch((err) => console.log(err))
}
