import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import InicioScreen from './screens/InicioScreen';
import DetallesScreen from './screens/DetallesScreen';
import FormulariosScreen from './screens/FormulariosScreen';
import PerfilScreen from './screens/PerfilScreen';
import LicenciaScreen from './screens/LicenciaScreen';
import TareaScreen from './screens/TareaScreen';
// Pantallas nuevas que consumen APIs publicas
// (sus funciones estan en services/PokemonService.js y services/RecetaService.js)
import PokemonScreen from './screens/PokemonScreen';
import RecetarioScreen from './screens/RecetarioScreen';
import PokemonDetalleScreen from './screens/PokemonDetalleScreen';
import RecetaDetalleScreen from './screens/RecetaDetalleScreen';
// CRUD contra nuestro backend .NET + MySQL (services/PokemonDbService.js)
import PokemonCrudScreen from './screens/PokemonCrudScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="inicio">
      <Stack.Screen name="inicio" component={InicioScreen} options={{ title: 'Inicio' }} />
      <Stack.Screen name="Detalle" component={DetallesScreen} />
    </Stack.Navigator>
  );
}

// Pila de pantallas de la pestana Pokemones: lista -> detalle
// PokemonScreen hace navigation.navigate('PokemonDetalle', { id })
function PokemonStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PokemonLista" component={PokemonScreen} options={{ title: 'Pokemones' }} />
      <Stack.Screen name="PokemonDetalle" component={PokemonDetalleScreen} options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
}

// Pila de pantallas de la pestana Recetario: lista -> detalle
// RecetarioScreen hace navigation.navigate('RecetaDetalle', { id })
function RecetarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecetaLista" component={RecetarioScreen} options={{ title: 'Recetario' }} />
      <Stack.Screen name="RecetaDetalle" component={RecetaDetalleScreen} options={{ title: 'Receta' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Formulario') iconName = 'create';
            else if (route.name === 'Perfil') iconName = 'person';
            else if (route.name === 'Licencia') iconName = 'card';
            else if (route.name === 'Tareas') iconName = 'list';
            else if (route.name === 'Pokemones') iconName = 'paw';        // icono pestana Pokemones
            else if (route.name === 'Recetario') iconName = 'restaurant'; // icono pestana Recetario
            else if (route.name === 'Mi Pokedex') iconName = 'server'; // icono pestana CRUD
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Formulario" component={FormulariosScreen} />
        <Tab.Screen name="Tareas" component={TareaScreen} />
        <Tab.Screen name="Licencia" component={LicenciaScreen} />
        {/* Pestanas nuevas, a un lado de Licencia */}
        <Tab.Screen name="Pokemones" component={PokemonStack} options={{ headerShown: false }} />
        <Tab.Screen name="Recetario" component={RecetarioStack} options={{ headerShown: false }} />
        <Tab.Screen name="Mi Pokedex" component={PokemonCrudScreen} />
        <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
