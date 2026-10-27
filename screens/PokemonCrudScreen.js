// =====================================================================
// PokemonCrudScreen.js  (SCREENS)
// Pestana "Mi Pokedex": crear, editar y eliminar pokemones de MySQL.
// Usa las funciones de services/PokemonDbService.js
// =====================================================================
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import {
  getPokemonesDb, crearPokemon, actualizarPokemon, eliminarPokemon, importarPokemones,
} from '../services/PokemonDbService';

const FORM_VACIO = { numero: '', nombre: '', tipo: '', altura: '', peso: '' };

export default function PokemonCrudScreen() {
  const [lista, setLista] = useState([]);             // registros de la BD
  const [form, setForm] = useState(FORM_VACIO);       // datos del formulario
  const [editandoId, setEditandoId] = useState(null); // null = creando
  const [mensaje, setMensaje] = useState('');

  async function cargarLista() {
    try {
      setLista(await getPokemonesDb());
    } catch (error) {
      setMensaje('No hay conexion con el backend');
    }
  }

  // Crea o actualiza segun editandoId
  async function guardar() {
    if (form.numero === '' || form.nombre === '') {
      setMensaje('Numero y nombre son obligatorios');
      return;
    }
    // Mapeo: el formulario da texto, el back espera numeros (y sin imagen)
    const pokemon = { ...form, numero: Number(form.numero), altura: Number(form.altura), peso: Number(form.peso), imagen: null };
    try {
      if (editandoId === null) await crearPokemon(pokemon);
      else await actualizarPokemon(editandoId, pokemon);
      setMensaje('Guardado');
      limpiar();
      cargarLista();
    } catch (error) {
      setMensaje('Error al guardar (¿numero repetido?)');
    }
  }

  // Pasa el registro al formulario (los numeros a texto para el TextInput)
  function editar(item) {
    setEditandoId(item.id);
    setForm({ ...item, numero: String(item.numero), altura: String(item.altura), peso: String(item.peso) });
  }

  function limpiar() {
    setEditandoId(null);
    setForm(FORM_VACIO);
  }

  async function eliminar(id) {
    await eliminarPokemon(id);
    cargarLista();
  }

  async function importar() {
    setMensaje('Importando, espera...');
    try {
      setMensaje(await importarPokemones());
      cargarLista();
    } catch (error) {
      setMensaje('Error al importar');
    }
  }

  useEffect(() => {
    cargarLista();
  }, []);

  return (
    <View style={styles.pantalla}>
      <TextInput style={styles.input} placeholder="Numero" keyboardType="numeric"
        value={form.numero} onChangeText={(v) => setForm({ ...form, numero: v })} />
      <TextInput style={styles.input} placeholder="Nombre"
        value={form.nombre} onChangeText={(v) => setForm({ ...form, nombre: v })} />
      <TextInput style={styles.input} placeholder="Tipo (ej. fire)"
        value={form.tipo} onChangeText={(v) => setForm({ ...form, tipo: v })} />
      <TextInput style={styles.input} placeholder="Altura (m)" keyboardType="numeric"
        value={form.altura} onChangeText={(v) => setForm({ ...form, altura: v })} />
      <TextInput style={styles.input} placeholder="Peso (kg)" keyboardType="numeric"
        value={form.peso} onChangeText={(v) => setForm({ ...form, peso: v })} />

      <View style={styles.botones}>
        <Button title={editandoId === null ? 'Crear' : 'Actualizar'} color="tomato" onPress={guardar} />
        {editandoId !== null && <Button title="Cancelar" color="gray" onPress={limpiar} />}
        <Button title="Importar 151" onPress={importar} />
      </View>

      {mensaje !== '' && <Text style={styles.mensaje}>{mensaje}</Text>}

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.fila}>
            <Text style={styles.texto}>#{item.numero} {item.nombre} ({item.tipo})</Text>
            <Button title="Editar" onPress={() => editar(item)} />
            <Button title="Borrar" color="tomato" onPress={() => eliminar(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 10, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 6, marginBottom: 6 },
  botones: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  mensaje: { textAlign: 'center', margin: 6 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, borderBottomWidth: 1, borderColor: '#eee' },
  texto: { flex: 1, textTransform: 'capitalize' },
});
