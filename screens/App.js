import {navigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import InicioScreen from './screens/inicioScreen';
import DetallesScreen from './screens/DetallesScreen';
import FormulariosScreen from './screens/FormulariosScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    return(
        <navigationContainer>
            <Tab.Navigator 
                screenOptions={({route}) => ({
                    tabBarIcon: ({ color, size}) => {
                        let iconName;
                        if (route.name === 'inicio') {
                            iconName = 'search';
                        } else if (route.name === 'home') {
                            iconName = 'home';
                        } else if (route.name === 'perfil') {
                            iconName = 'person';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name='inicio' component={InicioScreen} />
                <Tab.Screen name='Detalle' component={DetallesScreen} />
                <Tab.Screen name='Formulario' component={FormulariosScreen} />
            </Tab.Navigator>
        </navigationContainer>
    );
}



/*
        <navigationContainer>
            <Stack.Navigator initialRouteName='inicio'> 
                <Stack.Screen name='inicio' component={InicioScreen} />
                <Stack.Screen name='Detalle' component={DetallesScreen} />
                <Stack.Screen name='Formulario' component={FormulariosScreen} />
            </Stack.Navigator>
        </navigationContainer>
*/