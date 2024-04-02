import React, { useState } from 'react';
import { View, Text, Button, TextInput, Pressable } from 'react-native';
import UsernameIcon from 'react-native-vector-icons/AntDesign';
import PassIcon from 'react-native-vector-icons/MaterialIcons';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const submitHandler = () => {
        console.log(username, password);
    }
    return (
        <View className='flex-1 items-center justify-center'>
            <Text className='text-3xl font-bold my-10'>Sign In</Text>
            <View style={styles.inputStyle}>
                <UsernameIcon style={{marginRight:6}} name="user" size={30} color={'black'} />
                <TextInput
                    placeholder="Username"
                    className='w-full'
                    onChangeText={text => setUsername(text)}
                />
            </View>
            <View style={styles.inputStyle}>
                <PassIcon style={{marginRight:6}} name="password" size={30} color={'black'} />
                <TextInput
                    placeholder="Password"
                    className='w-full'
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <Text>Dont have an account? 
                <Text className='text-violet-700' onPress={() => navigation.navigate('Login')}> Register Here</Text>
            </Text>
            <Pressable style={styles.loginButton}>
                <Text className='text-center text-white text-[18px]' onPress={submitHandler}>Login</Text>
            </Pressable>
        </View>
    )
}

export default Register;

const styles = {
    inputStyle: {
        flexDirection: 'row',
        width: '80%',
        padding: 5,
        borderBottomColor: '#909090',
        borderBottomWidth: 1,
        marginVertical: 10
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 40,
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        textAlign: 'center'
    }

}
