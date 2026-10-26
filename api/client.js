import axios from 'axios';

// =====================================================================
// CLIENTES HTTP (axios)
// ---------------------------------------------------------------------
// Aqui se crean las "conexiones" a cada API. Cada cliente ya trae la
// URL base, asi en los services solo escribimos la ruta final.
// Ejemplo: pokeApiClient.get('/pokemon/25')
//          -> GET https://pokeapi.co/api/v2/pokemon/25
// =====================================================================

// Cliente para NUESTRO backend local (lo usan LicenciaService y TareaService)
const apiClient = axios.create({
    baseURL: 'http://localhost:5058',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Cliente para la API publica de Pokemon -> https://pokeapi.co
// Lo usa: services/PokemonService.js
export const pokeApiClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000,
});

// Cliente para la API publica de recetas -> https://www.themealdb.com
// Lo usa: services/RecetaService.js
export const mealApiClient = axios.create({
    baseURL: 'https://www.themealdb.com/api/json/v1/1',
    timeout: 10000,
});

export default apiClient;
