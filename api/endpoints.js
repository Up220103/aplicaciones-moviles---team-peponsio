// =====================================================================
// endpoints.js  (ENDPOINTS)
// ---------------------------------------------------------------------
// Aqui viven TODAS las rutas de las APIs externas, en un solo lugar.
// Si una URL cambia, solo se edita aqui.
//
// Estructura del proyecto:
//   api/client.js      -> clientes axios (URL base de cada API)
//   api/endpoints.js   -> rutas de cada API (este archivo)
//   services/*.js      -> funciones que llaman a los endpoints (back)
//   screens/*.js       -> pantallas que llaman a los services (front)
// =====================================================================

// ---------------- POKEAPI (https://pokeapi.co) ----------------
// Base: https://pokeapi.co/api/v2  (ver pokeApiClient en api/client.js)
export const POKEMON_ENDPOINTS = {
    // GET lista -> /pokemon?limit=30   (usado en PokemonService.getPokemones)
    lista: (limite) => `/pokemon?limit=${limite}`,
    // GET uno por nombre o numero -> /pokemon/pikachu
    // (usado en PokemonService.getPokemonPorNombre y PokemonService.getPokemonDetalle)
    porNombre: (nombre) => `/pokemon/${nombre}`,
    // URL de la imagen oficial (no es de la API, es del repositorio de sprites)
    imagen: (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
};

// ---------------- THEMEALDB (https://www.themealdb.com) ----------------
// Base: https://www.themealdb.com/api/json/v1/1  (ver mealApiClient en api/client.js)
export const RECETA_ENDPOINTS = {
    // GET buscar por nombre -> /search.php?s=chicken   (usado en RecetaService.buscarRecetas)
    buscar: (texto) => `/search.php?s=${texto}`,
    // GET una receta completa por id -> /lookup.php?i=52772   (usado en RecetaService.getRecetaPorId)
    porId: (id) => `/lookup.php?i=${id}`,
};
