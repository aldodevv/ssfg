import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Details} from './src/screen';
import MobileAds from 'react-native-google-mobile-ads';

// keytool -genkey -v -keystore aldomonetizer.keystore -alias aldomonetizer -keyalg RSA -keysize 2048 -validity 10000
// asdasds
const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log(adapterStatuses, 'INITIALIZATION');
      });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
