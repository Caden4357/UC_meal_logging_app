import React, { useState, useContext } from 'react';
import { View, Text, Button, TextInput, Pressable, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { verifyInstallation } from 'nativewind';
import { Link } from 'expo-router';
// import { getItemFromSecureStore, storeDataInSecureStore } from '../lib/secureStore';
// import { UserContext } from '../context/UserContext';
export default function Index() {
  verifyInstallation();

  // const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState('Caden43');
  const [password, setPassword] = useState('12345678');


  const submitHandler = async () => {
      // try {
      //     console.log('HERE');
      //     const user = await axios.post('http://10.0.0.205:8000/api/login', { username, password }, { withCredentials: true })
      //     console.log('user', user.data);
      //     await storeDataInSecureStore({ token: user.data.token})
      //     const token = await getItemFromSecureStore('token')
      //     setUser({id:token, username: user.data.username})
      //     console.log('id', token);
      // }
      // catch (error) {
      //     navigation.navigate('DefaultError')
      // }
  }
  return (
    <View className='flex-1 items-center justify-center'>
      {/* <Text className='text-3xl font-bold my-10'>Welcome To UC Log</Text> */}
      <Text className='text-3xl font-bold my-10' style={{ color: '#9db4a0' }}>Healthy Gut | Happy Butt</Text>
      <View style={styles.inputStyle}>
        <AntDesign name="user" size={30} color="black" />
        <TextInput
          placeholder="Username"
          className='w-full'
          onChangeText={text => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.inputStyle}>
        <MaterialIcons name="password" size={24} color="black" />
        <TextInput
          placeholder="Password"
          className='w-full'
          onChangeText={text => setPassword(text)}
          // secureTextEntry={true}
          value={password}
        />
      </View>
      <Text>Dont have an account?
        <Link href='/register' className='text-violet-700'> Register Here</Link>
      </Text>
      <Pressable style={styles.loginButton}>
        <Text className='text-center text-white text-[20px]' onPress={submitHandler}>Login</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  inputStyle: {
    flexDirection: 'row',
    width: '80%',
    padding: 5,
    borderBottomColor: '#909090',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  loginButton: {
    backgroundColor: '#9db4a0',
    padding: 12,
    borderRadius: 15,
    marginTop: 40,
    width: 150,
    textAlign: 'center'
  }

})