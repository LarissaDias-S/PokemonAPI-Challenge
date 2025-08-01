import * as React from 'react';
import { TouchableOpacity } from 'react-native';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Ícones
import { Ionicons } from '@expo/vector-icons';

// Telas
import ListScreen from './screens/Lista/List';
import DetailsScreen from './screens/Detalhes/Details';

// Fontes
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Fontes específicas
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans';
import { Overpass_600SemiBold } from '@expo-google-fonts/overpass';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    Overpass_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen
          name="Lista"
          component={ListScreen}
          options={{
            title: 'Pokedex',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'Overpass_600SemiBold',
              fontSize: 20,
              color: '#222',
            },
          }}
        />

        <Stack.Screen
          name="PokemonDetails"
          component={DetailsScreen}
          options={({ route, navigation }) => ({
            title: route.params.pokemonName.toLowerCase(),
            headerTitleAlign: 'left',
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#222',
            headerTitleStyle: {
              fontFamily: 'Overpass_600SemiBold',
              fontSize: 20,
              letterSpacing: 0.5,
              color: '#222',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 15 }}
              >
                <Ionicons name="chevron-back" size={24} color="#222" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
