import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext, UserProvider } from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import HomeScreen from './screens/HomeScreen';
import UserDetails from './components/UserDetails';
import DefaultError from './screens/DefaultError';
import Profile from './screens/Profile';
import CameraScreen from './screens/CameraScreen';
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useContext(UserContext);
  const id = user?.id;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!id ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="DefaultError" component={DefaultError} />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name='Camera' component={CameraScreen} />
            <Stack.Screen name="DefaultError" component={DefaultError} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
}
