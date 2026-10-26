// =====================================================================
// PokemonScreen.js  (capa "front" / pantalla)
// ---------------------------------------------------------------------
// Pestana "Pokemones" del menu inferior (se registra en App.js).
// Muestra una cuadricula de pokemones y un buscador.
//
// Flujo:
//  1. Al abrir la pantalla, useEffect llama cargarPokemones().
//  2. cargarPokemones() llama getPokemones() de services/PokemonService.js
//  3. La respuesta se guarda en el estado "pokemones" y la lista se pinta.
//  4. Al escribir y presionar "Buscar", se llama buscar(), que usa
//     getPokemonPorNombre() del mismo service.
// =====================================================================
import { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, FlatList, Pressable, StyleSheet } from 'react-native';
import { getPokemones, getPokemonPorNombre } from '../services/PokemonService';

// navigation llega porque esta pantalla vive dentro de PokemonStack (App.js)
export default function PokemonScreen({ navigation }) {
  // Estado = variables que, al cambiar, vuelven a dibujar la pantalla
  const [pokemones, setPokemones] = useState([]);        // lista que se muestra
  const [texto, setTexto] = useState('');                // lo que escribe el usuario
  const [mensaje, setMensaje] = useState('Cargando...'); // avisos (cargando / error)

  // Trae la lista inicial. Se llama en useEffect y cuando el buscador va vacio.
  async function cargarPokemones() {
    try {
      const data = await getPokemones();
      setPokemones(data);
      setMensaje('');
    } catch (error) {
      console.log(error);
      setMensaje('Error al cargar pokemones');
    }
  }

  // Se llama al presionar el boton "Buscar" (o Enter en el teclado).
  async function buscar() {
    if (texto.trim() === '') {
      cargarPokemones(); // sin texto -> regresamos a la lista completa
      return;
    }
    try {
      const pokemon = await getPokemonPorNombre(texto);
      setPokemones([pokemon]); // mostramos solo el encontrado
      setMensaje('');
    } catch (error) {
      setPokemones([]);
      setMensaje('No se encontro ese pokemon');
    }
  }

  // useEffect con [] se ejecuta UNA vez, cuando la pantalla aparece
  useEffect(() => {
    cargarPokemones();
  }, []);

  // Como se dibuja cada tarjeta (FlatList llama esta funcion por cada item)
  // Pressable = se puede tocar. Al tocar abrimos PokemonDetalleScreen y
  // le mandamos el id; alla se consume getPokemonDetalle(id).
  function renderPokemon({ item }) {
    return (
      <Pressable style={styles.fila} onPress={() => navigation.navigate('PokemonDetalle', { id: item.id })}>
        <Image source={{ uri: item.imagen }} style={styles.imagen} />
        <Text style={styles.nombre}>#{item.id} {item.nombre}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.pantalla}>
      <View style={styles.buscador}>
        <TextInput
          style={styles.input}
          placeholder="Nombre o numero (ej. pikachu, 25)"
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={buscar}
        />
        <Button title="Buscar" color="tomato" onPress={buscar} />
      </View>

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}

      <FlatList
        data={pokemones}
        keyExtractor={(item) => item.id}
        renderItem={renderPokemon}
      />
    </View>
  );
}

// Estilos sencillos: buscador arriba y una fila por pokemon
const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#fff' },
  buscador: { flexDirection: 'row', padding: 10, gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8 },
  mensaje: { textAlign: 'center', margin: 10 },
  fila: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  imagen: { width: 60, height: 60, marginRight: 10 },
  nombre: { fontSize: 16, textTransform: 'capitalize' },
});
