const BASE_API = 'https://pokeapi.co/api/v2'
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

//Metódos Pokemons
export async function getPokemon(pokemon) {
  return await getFromAPI('pokemon', pokemon)
}
export async function getImage(identifier) {
  const poke = await getPokemon(identifier)
  return poke.sprites.front_default
}
export async function getSpriteOfPoke(identifier) {
  return identifier.sprites.front_default
}
export async function getNamePokemon(identifier) {
  const poke = await getPokemon(identifier)
  return poke.name
}
export function getIdForImgPokemon(img) {
  const part = img.split('/')
  const idForPart = part[part.length - 1]
  const id = idForPart.split('.')
  return id[0]
}
export async function getIdPokemonUrl(url) {
  const segments = await url.split('/')
  const numeroDoPokemon = segments[segments.length - 2]
  return numeroDoPokemon
}
//Metódos Species
export async function getSpecies(identifier) {
  return await getFromAPI('pokemon-species', identifier)
}
export async function getSpeciesEvo(identifier) {
  const poke = await getSpecies(identifier)
  return poke.generation.name
}
export async function getUrlEvolution(identifier) {
  const poke = await getSpecies(identifier)
  return poke.evolution_chain.url
}
export async function getFormDescription(id) {
  const poke = await getSpecies(id)
  return poke.flavor_text_entries[0].flavor_text
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
export async function getObjEvolutionForNomepoke(nomePoke) {
  const pokeUrlEvo = await getUrlEvolution(nomePoke)
  const pokeIdEvo = await getIdEvolutionChain(pokeUrlEvo)
  const pokeObjEvo = await getObjEvolution(pokeIdEvo)
  return pokeObjEvo
}
export function getTypesPokeForPokedex(poke) {
  const pokeTypes = poke.map((item) => item.type.name)
  return pokeTypes
}
export async function getSpritesOfEvo(evos) {
  var spritesEvo = []
  evos.forEach((e) => {
    spritesEvo.push(getImage(e))
  })
  return Promise.all(spritesEvo)
}
export function checkGeneration(id) {
  if (id < 1 || id > 9) {
    return 0
  } else {
    return 1
  }
}
export function checkId(id) {
  const parsedId = +id
  if (parsedId < 1 || parsedId > 1010) {
    return 0
  } else {
    return 1
  }
}
export function checkEvo(evo, poke) {
  if (evo > 538 || evo < 1 || poke == undefined) {
    return 0
  } else {
    return 1
  }
}

export function convertProxyInArray(proxyTpoke) {
  const proxy = new Proxy([proxyTpoke[0][0], proxyTpoke[0][1]], {})
  const array = Array.from(proxy)
  return array
}
export async function getPokeTypeSelected(tPoke, gen) {
  const spritePromises = []
  const objTpoke = convertProxyInArray(tPoke)
  const ids = getIdOfPokesGen(gen)
  for (var i = 0; i < ids.length; i++) {
    spritePromises.push(getPokemonSprite(ids[i], objTpoke))
  }
  return Promise.all(spritePromises)
    .then((results) => {
      const filteredArray = results.filter((value) => value !== undefined)
      return filteredArray
    })
    .catch((error) => {
      console.error('Ocorreu um erro ao resolver as Promises:', error)
    })
}
async function getPokemonSprite(id, objTpoke) {
  const poke = await getPokemon(id)
  const typePoke = getTypesPoke(poke.types)
  if (objTpoke[1] == undefined) {
    if (typePoke.includes(objTpoke[0])) {
      return getSpriteOfPoke(poke)
    }
  } else {
    if (typePoke.includes(objTpoke[0]) && typePoke.includes(objTpoke[1])) {
      return getSpriteOfPoke(poke)
    }
  }
}

export function getIdOfPokesGen(gen) {
  const idOfPokeGen = []
  gen.map((id) => {
    return getIdForImgPokemon(id)
  })
  for (var i = 0; i < gen.length; i++) {
    idOfPokeGen.push(getIdForImgPokemon(gen[i]))
  }
  return idOfPokeGen
}

export async function getTypesOfIdPokeGen(pokeGenId) {
  const ids = getIdOfPokesGen(pokeGenId)
  const typesOfGen = []
  for (var i = 0; i < ids.length; i++) {
    const poke = await getPokemon(ids[i])
    const typePoke = getTypesPoke(poke.types)
    if (!typesOfGen.includes(typePoke[0])) {
      typesOfGen.push(typePoke[0])
    }
    if (!typesOfGen.includes(typePoke[1])) {
      typesOfGen.push(typePoke[1])
    }
  }
  return typesOfGen.filter((tipo) => {
    return tipo !== undefined
  })
}

export function getTypesPoke(poke) {
  const pokeTypes = poke.map((item) => item.type.name)
  return pokeTypes
}
export async function getInfoPlusPoke(identifier) {
  const informations = []
  informations.push(await evolutionChain(identifier.name))
  informations.push(getTypesPoke(identifier.types))
  informations.push(await getUrlEvolution(identifier.id))
  informations.push(await getIdEvolutionChain(informations[2]))
  informations.push(await getSpeciesEvo(identifier.id))
  const textPoke = await getFormDescription(identifier.id)
  informations.push(await textPoke)
  informations.push(await getSpritesOfEvo(informations[0]))
  return Promise.all(informations)
}
export async function evolutionChain(evolutionData) {
  const evoObj = await getObjEvolutionForNomepoke(evolutionData)
  const evolutionNames = []
  function traverseEvolutions(data) {
    evolutionNames.push(data.species.name)
    if (data.evolves_to.length > 0) {
      data.evolves_to.forEach(traverseEvolutions)
    }
  }
  traverseEvolutions(evoObj.chain)
  return evolutionNames
}
export async function getAttPokemon(poke, option) {
  if (typeof option === 'object') {
    if (poke >= 0 || poke < option.length) {
      return option[poke]
    } else if (poke == undefined) {
      return 0
    }
  } else {
    const pokeAtt = await getNameEvolutionChain(option)
    return pokeAtt
  }
}
//
export async function getOrderPokeFromGen(gen) {
  const idOrderPoke = []
  const quantArrayGen = await getGenerationQuant(gen)
  for (var i = 0; i < quantArrayGen; i++) {
    idOrderPoke.push(await getIdPokeArrayGen(gen, i))
  }
  return Promise.all(idOrderPoke)
}
export async function getPokemonsOfGeneration(gen) {
  const sprites = []
  const quantArrayGen = await getGenerationQuant(gen)
  console.log(quantArrayGen)
  const idPokeGen = await getOrderPokeFromGen(gen)
  idPokeGen.sort(function (a, b) {
    return a - b
  })
  for (var i = 0; i < quantArrayGen; i++) {
    sprites.push(getImage(idPokeGen[i]))
  }
  return Promise.all(sprites)
}
