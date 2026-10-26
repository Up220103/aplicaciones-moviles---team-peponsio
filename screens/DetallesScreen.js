import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetallesScreen({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Pantalla Detalles</Text>
            <Button
                title='Ir a Inicio'
                onPress={() => navigation.navigate('inicio')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cde7ff',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold', 
        marginBottom: 20,    
    }
});