const BASE_API = 'https://pokeapi.co/api/v2'
export async function getPokemon(pokemon) {
  return await getFromAPI('pokemon', pokemon)
}
export async function getImage(identifier) {
  const poke = await getPokemon(identifier)
  return poke.sprites.front_default
}
export async function getIdPokemon(identifier){
  const poke = await getPokemon(identifier)
  return poke.id
}
export async function getSpecies(identifier) {
  return await getFromAPI('pokemon-species', identifier)
}
export async function getGenerationName(identifier){
  const poke = await getSpecies(identifier)
  return poke.generation.name
}
export async function getAllPokemonsOfGeneration(generation){
  var sprites = []
  var i = 0
  for(i=1; i<5; i++){
    if(await getGenerationName(i) === generation){
      sprites.push(getImage(i))
      console.log("cheguei")
    }
  }
  return Promise.all(sprites)
}
// export async function getPokemonGeneration(generation){
//   var sprites = []
//     for( i=1;i<=1281;i++){
//       get
//       sprites.push(await getImage(i))
//     }
//   }
//   console.log(sprites)
//   return Promise.all(sprites)
// }



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
