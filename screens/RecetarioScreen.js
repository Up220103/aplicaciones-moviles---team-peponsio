// =====================================================================
// RecetarioScreen.js  (capa "front" / pantalla)
// ---------------------------------------------------------------------
// Pestana "Recetario" del menu inferior (se registra en App.js).
// Muestra recetas con foto, nombre y categoria, y un buscador.
//
// Flujo:
//  1. Al abrir la pantalla, useEffect llama cargarRecetas('').
//  2. cargarRecetas() llama buscarRecetas() de services/RecetaService.js
//  3. La respuesta se guarda en el estado "recetas" y la lista se pinta.
//  4. Al presionar "Buscar" se vuelve a llamar cargarRecetas(texto).
// =====================================================================
import { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, FlatList, Pressable, StyleSheet } from 'react-native';
import { buscarRecetas } from '../services/RecetaService';

// navigation llega porque esta pantalla vive dentro de RecetarioStack (App.js)
export default function RecetarioScreen({ navigation }) {
  const [recetas, setRecetas] = useState([]);            // lista que se muestra
  const [texto, setTexto] = useState('');                // lo que escribe el usuario
  const [mensaje, setMensaje] = useState('Cargando...'); // avisos (cargando / error)

  // Pide recetas al service. Se llama en useEffect y en el boton "Buscar".
  async function cargarRecetas(busqueda) {
    try {
      const data = await buscarRecetas(busqueda);
      setRecetas(data);
      setMensaje(data.length === 0 ? 'No se encontraron recetas' : '');
    } catch (error) {
      console.log(error);
      setMensaje('Error al cargar recetas');
    }
  }

  // Se ejecuta una sola vez al abrir la pantalla
  useEffect(() => {
    cargarRecetas('');
  }, []);

  // Como se dibuja cada receta (FlatList llama esta funcion por cada item)
  // Al tocar abrimos RecetaDetalleScreen con el id; alla se consume getRecetaPorId(id).
  function renderReceta({ item }) {
    return (
      <Pressable style={styles.fila} onPress={() => navigation.navigate('RecetaDetalle', { id: item.id })}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <View>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text>{item.categoria}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.pantalla}>
      <View style={styles.buscador}>
        <TextInput
          style={styles.input}
          placeholder="Buscar receta en ingles (ej. chicken)"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={() => cargarRecetas(texto)}
        />
        <Button title="Buscar" color="tomato" onPress={() => cargarRecetas(texto)} />
      </View>

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}

      <FlatList
        data={recetas}
        keyExtractor={(item) => item.id}
        renderItem={renderReceta}
      />
    </View>
  );
}

// Estilos sencillos: buscador arriba y una fila por receta
const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#fff' },
  buscador: { flexDirection: 'row', padding: 10, gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8 },
  mensaje: { textAlign: 'center', margin: 10 },
  fila: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  imagen: { width: 60, height: 60, marginRight: 10 },
  nombre: { fontSize: 16, fontWeight: 'bold' },
});
