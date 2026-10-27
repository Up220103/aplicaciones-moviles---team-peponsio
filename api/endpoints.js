

// ---------------- POKEAPI (https://pokeapi.co) ----------------
export const POKEMON_ENDPOINTS = {
  
    lista: (limite) => `/pokemon?limit=${limite}`,

    porNombre: (nombre) => `/pokemon/${nombre}`,

    imagen: (id) =>
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
};

// ---------------- THEMEALDB (https://www.themealdb.com) ----------------

export const RECETA_ENDPOINTS = {

    buscar: (texto) => `/search.php?s=${texto}`,
    porId: (id) => `/lookup.php?i=${id}`,
};


export const DB_POKEMON_ENDPOINTS = {
    todos: '/pokemon',                // GET lista  /  POST crear
    porId: (id) => `/pokemon/${id}`,  // PUT editar  /  DELETE eliminar
    importar: '/pokemon/importar',    // POST llena la BD con PokeAPI
};
