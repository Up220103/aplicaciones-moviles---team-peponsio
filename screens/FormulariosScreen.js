import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image } from 'react-native';

export default function FormulariosScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.card}>
        <Image style={styles.image} />

        <Text style={styles.title}>juan luis</Text>
        <Text style={styles.subtitle}>jugador</Text>

        <Text style={styles.label}>correo</Text>
        <TextInput 
          style={styles.input} 
          placeholder="escribe tu correo" 
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>contraseña</Text>
        <TextInput 
          style={styles.input} 
          placeholder="escribe tu contraseña" 
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Button title="entrar" color="#8ecae6" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 60,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
    letterSpacing: 1,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 25,
  },
});