import { NavigationContainer } from '@react-navigation/native';
import store from './store/store';
import { Provider } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './components/pages/Home/Home'
import None from './components/pages/None/None'
import Loading from './components/pages/Loading/Loading'
import Trainings from './components/pages/Trainings/Trainings'
import Levels from './components/pages/Levels/Levels'
import * as React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans-extra-bold': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator 
      initialRouteName="Loading"
      backBehavior='history'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#170e67',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#170e67',
          opacity: 100,
          width: '65%',
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#6222f5'
      }}>
        <Drawer.Screen
          name="Loading"
          component={Loading}
          options={{
            headerShown: false,
            title: 'LOADING',
            drawerLabel: ''
          }} />
        <Drawer.Screen 
        name="Home"
        component={Home}
        options={{
          title: 'TRENING SŁUCHU FONEMOWEGO',
          headerStyle: {
            backgroundColor: '#170e67',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'HOME'
        }}/>
        <Drawer.Screen 
        name="Trainings"
        component={Trainings}
        options={{
          title: 'ĆWICZENIA',
          headerStyle: {
            backgroundColor: '#170e67',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'ĆWICZENIA'
        }}/>
        <Drawer.Screen 
        name="Levels"
        component={Levels}
        options={{
          title: 'XXXName',
          headerStyle: {
            backgroundColor: '#170e67',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'XXXName'
        }}/>
        <Drawer.Screen 
        name="Tests"
        component={None}
        options={{
          title: 'TEST',
          headerStyle: {
            backgroundColor: '#170e67',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'TEST'
        }}/>
        <Drawer.Screen 
        name="Results"
        component={None}
        options={{
          title: 'WYNIKI',
          headerStyle: {
            backgroundColor: '#170e67',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerLabel: 'WYNIKI'
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}