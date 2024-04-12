import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import HomeScreen from './screens/HomeScreen';
import { UserContext, UserProvider } from './context/UserContext';
import { useContext } from 'react';
import DefaultError from './screens/DefaultError';
import UserDetails from './components/UserDetails';
const Stack = createNativeStackNavigator();


export default function App() {

  const NotLoggedIn = () => {
    return (
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="DefaultError"
          component={DefaultError}
        />
      </Stack.Navigator>
    );
  }

  const LoggedIn = () => {
    return (
      <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name='UserDetails'
          component={UserDetails}
        />
        <Stack.Screen
          name="DefaultError"
          component={DefaultError}
        />
      </Stack.Navigator>
    );
  }

  const Root = () => {
    const { id } = useContext(UserContext);

    return <>
      {!id && <NotLoggedIn />}
      {id && <LoggedIn />}

    </>
    
}


return (
  <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </UserProvider>
);
}

