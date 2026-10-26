import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getLicencia } from '../services/LicenciaService';

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#e6f7ff' },
  contenedor: { padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  encabezado: { alignItems: 'center', marginBottom: 16 },
  tituloEncabezado: { fontSize: 12, letterSpacing: 2, color: '#0077b6', fontWeight: '700' },
  subtituloEncabezado: { fontSize: 18, fontWeight: 'bold', color: '#023e8a' },
  filaPrincipal: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  foto: { width: 90, height: 90, borderRadius: 12, marginRight: 16, borderWidth: 2, borderColor: '#0077b6' },
  datosPrincipales: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#03045e', marginBottom: 6 },
  badge: {
    backgroundColor: '#b7e4c7',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTexto: { color: '#2d6a4f', fontSize: 12, fontWeight: '600' },
  linea: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
  fila: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  etiqueta: { fontSize: 13, color: '#666' },
  valor: { fontSize: 13, fontWeight: '600', color: '#333', flexShrink: 1, textAlign: 'right' },
});

function InfoFila({ etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </View>
  );
}

export default function LicenciaScreen({ navigation }) {
  const [licencia, setLicencia] = useState({});

  async function llamarLicencia() {
    try {
      const data = await getLicencia();
      setLicencia(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    llamarLicencia();
  }, [navigation]);

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenedor}>
      <View style={styles.card}>
        <View style={styles.encabezado}>
          <Text style={styles.tituloEncabezado}>LICENCIA DE CONDUCIR</Text>
          <Text style={styles.subtituloEncabezado}>Fondo de Bikini</Text>
        </View>

        <View style={styles.filaPrincipal}>
          <Image source={{ uri: licencia.foto }} style={styles.foto} />
          <View style={styles.datosPrincipales}>
            <Text style={styles.nombre}>{licencia.nombre}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>{licencia.estado}</Text>
            </View>
          </View>
        </View>

        <View style={styles.linea} />

        <InfoFila etiqueta="No. de Licencia" valor={licencia.numeroLicencia} />
        <InfoFila etiqueta="Fecha de Nacimiento" valor={licencia.fechaNacimiento} />
        <InfoFila etiqueta="Fecha de Vencimiento" valor={licencia.fechaVencimiento} />
        <InfoFila etiqueta="Tipo" valor={licencia.tipoLicencia} />
        <InfoFila etiqueta="Dirección" valor={licencia.direccion} />
      </View>
    </ScrollView>
  );
}
