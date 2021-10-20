import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import { Provider } from 'react-redux'
import DrawerNav from './drawer/drawer'
import * as React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <DrawerNav/>      
    </Provider>
  );
}