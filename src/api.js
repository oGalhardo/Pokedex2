const BASE_API = 'https://pokeapi.co/api/v2'
//Metódos Pokemons
export async function getPokemon(pokemon) {
  return await getFromAPI('pokemon', pokemon)
}
export async function getImage(identifier) {
  const poke = await getPokemon(identifier)
  return poke.sprites.front_default
}
export async function getIdPokemon(identifier) {
  const poke = await getPokemon(identifier)
  return poke.id
}
//Metódos Species
export async function getSpecies(identifier) {
  return await getFromAPI('pokemon-species', identifier)
}
export async function getSpeciesName(identifier) {
  const poke = await getSpecies(identifier)
  return poke.generation.name
}
export async function getUrlEvolution(identifier) {
  const poke = await getSpecies(identifier)
  return poke.evolution_chain.url
}
//Metodos Generation
export async function getGeneration(identifier) {
  return await getFromAPI('generation', identifier)
}
export async function getGenerationArray(identifier) {
  const poke = await getGeneration(identifier)
  return poke.pokemon_species
}
export async function getIdPokeArrayGen(identifier, i) {
  const poke = await getGenerationArray(identifier)
  const part = poke[i].url.split('/')
  return part[part.length - 2]
}
export async function getGenerationQuant(id) {
  const poke = await getFromAPI('generation', id)
  return poke.pokemon_species.length
}

//Metódos Evolution
export async function getObjEvolution(identifier) {
  return await getFromAPI('evolution-chain', identifier)
}
export function getIdEvolutionChain(evolutio) {
  const parts = evolutio.split('/')
  return parts[parts.length - 2]
}
export async function getNameEvolutionChain(identifier) {
  const poke = await getObjEvolution(identifier)
  return poke.chain.species.name
}
//Metódos de verificação
export function checkGeneration(id) {
  if (id < 1 || id > 9) {
    return 0
  } else {
    return 1
  }
}
export function checkId(id) {
  if (id > 1008 || id < 1) {
    return 0
  } else {
    return 1
  }
}
//Socorro
export function getEvolutionNames(evolutionData) {
  const evolutionNames = [];
  function traverseEvolutions(data) {
    evolutionNames.push(data.species.name);
    if (data.evolves_to.length > 0) {
      data.evolves_to.forEach(traverseEvolutions);
    }
  }

  traverseEvolutions(evolutionData.chain);

  return evolutionNames;
}




























//Metódos para complexo da Pokedex//
export async function getPokemonsOfGeneration(gen) {
  const sprites = []
  const quantArrayGen = await getGenerationQuant(gen)
  for (var i = 0; i < quantArrayGen; i++) {
    sprites.push(getImage(await getIdPokeArrayGen(gen, i)))
  }
  return Promise.all(sprites)
}

export async function attPokemon(pokeid, url) {
  const evolution = await getUrlEvolution(pokeid)
  if (evolution == url) {
    return pokeid
  } else {
    const namepoke = await getNameEvolutionChain(url)
    return namepoke
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
