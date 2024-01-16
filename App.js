import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { useEffect } from 'react';
import { init } from './utils/database';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    init().then(() => {
      SplashScreen.hideAsync();
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500},
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700}
        }}>
          <Stack.Screen name='AllPlaces' component={AllPlaces} options={({ navigation }) => ({
            title: 'Your Favorite Places',
            headerRight: ({ tintColor }) => (
              <IconButton 
                name={'add'} 
                size={30} 
                color={'black'} 
                onPress={() => navigation.navigate('AddPlaces')}  
              />
            )
          })} />
          <Stack.Screen name='AddPlaces' component={AddPlace} options={{
            title: 'Add a New Place'
          }}/>
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
