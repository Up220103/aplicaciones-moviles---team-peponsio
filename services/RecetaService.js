// =====================================================================
// RecetaService.js  (SERVICES / back)
// ---------------------------------------------------------------------
// Funciones que hablan con la API de recetas. No hay nada visual aqui.
//   - Cliente (URL base): mealApiClient    -> api/client.js
//   - Rutas:              RECETA_ENDPOINTS -> api/endpoints.js
//   - Quien las usa:      screens/RecetarioScreen.js
// API: https://www.themealdb.com   (gratis, llave de prueba "1")
// =====================================================================
import { mealApiClient } from '../api/client';
import { RECETA_ENDPOINTS } from '../api/endpoints';

// ---------------------------------------------------------------------
// buscarRecetas(texto)  -> GET
// Endpoint: GET https://www.themealdb.com/api/json/v1/1/search.php?s={texto}
// Si el texto va vacio, la API regresa recetas variadas.
// Se manda llamar en: RecetarioScreen.js -> funcion cargarRecetas()
// Regresa: [{ id, nombre, categoria, imagen }, ...]  (o [] si no hay)
// ---------------------------------------------------------------------
export async function buscarRecetas(texto) {
    const response = await mealApiClient.get(RECETA_ENDPOINTS.buscar(texto));

    // La API regresa { meals: [...] } o { meals: null } si no encontro nada
    const meals = response.data.meals || [];

    // Nos quedamos solo con los campos que usa la pantalla
    return meals.map((m) => ({
        id: m.idMeal,
        nombre: m.strMeal,
        categoria: m.strCategory,
        imagen: m.strMealThumb,
    }));
}

// ---------------------------------------------------------------------
// getRecetaPorId(id)  -> GetById (receta completa)
// Endpoint: GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
// Se manda llamar en: RecetaDetalleScreen.js -> funcion cargarDetalle()
//   (esa pantalla se abre al tocar una receta en RecetarioScreen.js)
// Regresa: { id, nombre, categoria, origen, imagen, instrucciones, ingredientes }
// ---------------------------------------------------------------------
export async function getRecetaPorId(id) {
    const response = await mealApiClient.get(RECETA_ENDPOINTS.porId(id));
    const m = response.data.meals[0]; // la API regresa un arreglo con 1 receta

    // La API trae los ingredientes en campos separados:
    // strIngredient1..strIngredient20 y strMeasure1..strMeasure20
    // Los juntamos en una lista: ['200g Chicken', '1 tsp Salt', ...]
    const ingredientes = [];
    for (let i = 1; i <= 20; i++) {
        const ingrediente = m['strIngredient' + i];
        const medida = m['strMeasure' + i];
        if (ingrediente && ingrediente.trim() !== '') {
            ingredientes.push(`${medida} ${ingrediente}`.trim());
        }
    }

    return {
        id: m.idMeal,
        nombre: m.strMeal,
        categoria: m.strCategory,
        origen: m.strArea,
        imagen: m.strMealThumb,
        instrucciones: m.strInstructions,
        ingredientes: ingredientes,
    };
}
