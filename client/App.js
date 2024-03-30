import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from './components/Register';

export default function App() {
  return (
    <View style={{flex:1}}>
      <Register />
    </View>
  );
}

