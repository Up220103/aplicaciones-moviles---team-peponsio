// =====================================================================
// PokemonDetalleScreen.js  (SCREENS / front)
// ---------------------------------------------------------------------
// Pantalla de detalle de UN pokemon.
// Se abre desde PokemonScreen.js al tocar una tarjeta:
//   navigation.navigate('PokemonDetalle', { id: item.id })
// El id llega en route.params.id y con el llamamos a
// getPokemonDetalle() de services/PokemonService.js
// =====================================================================
import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getPokemonDetalle } from '../services/PokemonService';

export default function PokemonDetalleScreen({ route }) {
  const { id } = route.params;                   // id que mando PokemonScreen
  const [pokemon, setPokemon] = useState(null);  // null = todavia no llega

  // Pide el detalle al service. Se llama en useEffect.
  async function cargarDetalle() {
    try {
      const data = await getPokemonDetalle(id);
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Se ejecuta al abrir la pantalla (y si cambia el id)
  useEffect(() => {
    cargarDetalle();
  }, [id]);

  if (!pokemon) return <Text style={styles.cargando}>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Image source={{ uri: pokemon.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>#{pokemon.id} {pokemon.nombre}</Text>

      <Text style={styles.subtitulo}>Tipos</Text>
      <Text>{pokemon.tipos.join(', ')}</Text>

      <Text style={styles.subtitulo}>Altura y peso</Text>
      <Text>{pokemon.altura} m  |  {pokemon.peso} kg</Text>

      <Text style={styles.subtitulo}>Habilidades</Text>
      <Text>{pokemon.habilidades.join(', ')}</Text>

      <Text style={styles.subtitulo}>Estadisticas</Text>
      {pokemon.stats.map((s) => (
        <Text key={s.nombre}>{s.nombre}: {s.valor}</Text>
      ))}
    </ScrollView>
  );
}

// Estilos sencillos: solo titulo, subtitulos y la imagen
const styles = StyleSheet.create({
  cargando: { textAlign: 'center', marginTop: 40 },
  contenedor: { padding: 20, backgroundColor: '#fff' },
  imagen: { width: 150, height: 150, alignSelf: 'center' },
  nombre: { fontSize: 22, fontWeight: 'bold', textTransform: 'capitalize' },
  subtitulo: { fontWeight: 'bold', marginTop: 12 },
});
