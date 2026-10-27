import axios from 'axios';


const IP_BACKEND = '10.249.5.243';

// Cliente para NUESTRO backend .NET (lo usan LicenciaService, TareaService y PokemonDbService)
const apiClient = axios.create({
    baseURL: `http://${IP_BACKEND}:5058`,
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
