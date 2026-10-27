// =====================================================================
// PokemonDbService.js  (SERVICES)
// CRUD contra nuestro backend .NET, que guarda en MySQL.
// Flujo: Movil (aqui) -> Back (.NET) -> MySQL
// Lo usa: screens/PokemonCrudScreen.js
// =====================================================================
import apiClient from '../api/client';
import { DB_POKEMON_ENDPOINTS } from '../api/endpoints';

// GET -> lista de la base de datos
export async function getPokemonesDb() {
    const response = await apiClient.get(DB_POKEMON_ENDPOINTS.todos);
    return response.data;
}

// POST -> crea (el objeto viaja como JSON en el body)
export async function crearPokemon(pokemon) {
    await apiClient.post(DB_POKEMON_ENDPOINTS.todos, pokemon);
}

// PUT -> edita
export async function actualizarPokemon(id, pokemon) {
    await apiClient.put(DB_POKEMON_ENDPOINTS.porId(id), pokemon);
}

// DELETE -> borra
export async function eliminarPokemon(id) {
    await apiClient.delete(DB_POKEMON_ENDPOINTS.porId(id));
}

// POST -> el back hace GET a PokeAPI y llena la BD.
// Son 151 peticiones, por eso se le dan 2 minutos de timeout.
export async function importarPokemones() {
    const response = await apiClient.post(DB_POKEMON_ENDPOINTS.importar, null, { timeout: 120000 });
    return response.data.message;
}
