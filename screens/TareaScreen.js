import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from 'react-native';
import { getTareas, getTaskById, createTask, updateTask, deleteTask } from '../services/TareaService';

export default function TareaScreen({navigation}) {
    const [task, setTask] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [tarea, setTarea] = useState({});

    async function llamarTareas() {
        try {
            const data = await getTareas();
            setTask(data);
        }   catch (error) {
            console.log(error);
        }
    }

    async function verTarea(id) {
        try {
            const data = await getTaskById(id);
            setTarea(data);
        }   catch (error) {
            console.log(error);
        }
    }

    async function crearTarea() {
        // Nuevo: si no escribió título no crea nada
        if (titulo == '') return;
        try {
            await createTask({ titulo: titulo });
            llamarTareas();
        }   catch (error) {
            console.log(error);
        }
    }

    async function completarTarea(item) {
        try {
            await updateTask(item.id, { titulo: item.titulo, descripcion: item.descripcion, completada: true });
            llamarTareas();
        }   catch (error) {
            console.log(error);
        }
    }

    async function eliminarTarea(id) {
        try {
            await deleteTask(id);
            llamarTareas();
        }   catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        llamarTareas();
    }, [navigation]);

return (
    <ScrollView style={styles.container}>

        <View style={styles.card}>
            <Text style={styles.label}>Nueva tarea</Text>
            <TextInput style={styles.input} placeholder="escribe el titulo" onChangeText={setTitulo} />
            <Button title="crear" color="#8ecae6" onPress={crearTarea} />
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Tarea seleccionada</Text>
            <Text>{tarea.titulo}</Text>
            <Text>{tarea.descripcion}</Text>
        </View>

        {task.map((item) => (
            <View key={item.id} style={styles.card}>
                <Text style={styles.title}>{item.titulo}</Text>
                <Text>{item.descripcion}</Text>

                <View style={styles.botones}>
                    <View style={styles.boton}>
                        <Button title="ver" color="#8ecae6" onPress={() => verTarea(item.id)} />
                    </View>
                    <View style={styles.boton}>
                        <Button title="completar" color="#2d6a4f" onPress={() => completarTarea(item)} />
                    </View>
                    <View style={styles.boton}>
                        <Button title="eliminar" color="tomato" onPress={() => eliminarTarea(item.id)} />
                    </View>
                </View>
            </View>
        ))}

    </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  input: {
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  botones: {
    flexDirection: 'row',
    marginTop: 15,
  },
  boton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
