// =====================================================================
// PokemonService.js  (SERVICES / back)
// ---------------------------------------------------------------------
// Funciones que hablan con la API de Pokemon. No hay nada visual aqui.
//   - Cliente (URL base): pokeApiClient  -> api/client.js
//   - Rutas:              POKEMON_ENDPOINTS -> api/endpoints.js
//   - Quien las usa:      screens/PokemonScreen.js
// API: https://pokeapi.co   (gratis, no necesita llave)
// =====================================================================
import { pokeApiClient } from '../api/client';
import { POKEMON_ENDPOINTS } from '../api/endpoints';

// ---------------------------------------------------------------------
// getPokemones()  -> GET (todos)
// Endpoint: GET https://pokeapi.co/api/v2/pokemon?limit=151
// Se manda llamar en: PokemonScreen.js -> funcion cargarPokemones()
// Regresa: [{ id, nombre, imagen }, ...]
// ---------------------------------------------------------------------
export async function getPokemones() {
    const response = await pokeApiClient.get(POKEMON_ENDPOINTS.lista(151));

    // La API regresa { results: [{ name, url }, ...] }
    // La url termina en el numero: ".../pokemon/25/" -> sacamos el 25
    return response.data.results.map((p) => {
        const partes = p.url.split('/');      // [..., '25', '']
        const id = partes[partes.length - 2]; // '25'
        return { id: id, nombre: p.name, imagen: POKEMON_ENDPOINTS.imagen(id) };
    });
}

// ---------------------------------------------------------------------
// getPokemonPorNombre(texto)  -> GetById
// Endpoint: GET https://pokeapi.co/api/v2/pokemon/{nombre o numero}
// Se manda llamar en: PokemonScreen.js -> funcion buscar()
// Regresa: { id, nombre, imagen }
// Si no existe, axios lanza un error (404) y la pantalla lo atrapa en el catch.
// ---------------------------------------------------------------------
export async function getPokemonPorNombre(texto) {
    const response = await pokeApiClient.get(POKEMON_ENDPOINTS.porNombre(texto.toLowerCase().trim()));
    const p = response.data;
    return { id: String(p.id), nombre: p.name, imagen: POKEMON_ENDPOINTS.imagen(p.id) };
}

// ---------------------------------------------------------------------
// getPokemonDetalle(id)  -> GetById (con TODA la informacion)
// Endpoint: GET https://pokeapi.co/api/v2/pokemon/{id}
// Se manda llamar en: PokemonDetalleScreen.js -> funcion cargarDetalle()
//   (esa pantalla se abre al tocar una tarjeta en PokemonScreen.js)
// Regresa: { id, nombre, imagen, altura, peso, tipos, habilidades, stats }
// ---------------------------------------------------------------------
export async function getPokemonDetalle(id) {
    const response = await pokeApiClient.get(POKEMON_ENDPOINTS.porNombre(id));
    const p = response.data;

    return {
        id: String(p.id),
        nombre: p.name,
        imagen: POKEMON_ENDPOINTS.imagen(p.id),
        altura: p.height / 10,  // la API lo da en decimetros -> metros
        peso: p.weight / 10,    // la API lo da en hectogramos -> kg
        // p.types = [{ type: { name: 'fire' } }, ...]  -> ['fire', ...]
        tipos: p.types.map((t) => t.type.name),
        // p.abilities = [{ ability: { name: 'blaze' } }, ...] -> ['blaze', ...]
        habilidades: p.abilities.map((a) => a.ability.name),
        // p.stats = [{ base_stat: 45, stat: { name: 'hp' } }, ...]
        stats: p.stats.map((s) => ({ nombre: s.stat.name, valor: s.base_stat })),
    };
}
