// =====================================================================
// RecetaDetalleScreen.js  (SCREENS / front)
// ---------------------------------------------------------------------
// Pantalla de detalle de UNA receta.
// Se abre desde RecetarioScreen.js al tocar una receta:
//   navigation.navigate('RecetaDetalle', { id: item.id })
// El id llega en route.params.id y con el llamamos a
// getRecetaPorId() de services/RecetaService.js
// =====================================================================
import { useState, useEffect } from 'react';
import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getRecetaPorId } from '../services/RecetaService';

export default function RecetaDetalleScreen({ route }) {
  const { id } = route.params;                 // id que mando RecetarioScreen
  const [receta, setReceta] = useState(null);  // null = todavia no llega

  // Pide la receta completa al service. Se llama en useEffect.
  async function cargarDetalle() {
    try {
      const data = await getRecetaPorId(id);
      setReceta(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  if (!receta) return <Text style={styles.cargando}>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Image source={{ uri: receta.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{receta.nombre}</Text>
      <Text>{receta.categoria} · {receta.origen}</Text>

      <Text style={styles.subtitulo}>Ingredientes</Text>
      {receta.ingredientes.map((ing, index) => (
        <Text key={index}>• {ing}</Text>
      ))}

      <Text style={styles.subtitulo}>Preparacion</Text>
      <Text>{receta.instrucciones}</Text>
    </ScrollView>
  );
}

// Estilos sencillos: solo titulo, subtitulos y la imagen
const styles = StyleSheet.create({
  cargando: { textAlign: 'center', marginTop: 40 },
  contenedor: { padding: 20, backgroundColor: '#fff' },
  imagen: { width: '100%', height: 200 },
  nombre: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  subtitulo: { fontWeight: 'bold', marginTop: 12 },
});
