import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
const Register = ({navigation}) => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Register</Text>
            <Button title="Go back" onPress={() => navigation.navigate('Login')} />
        </View>
)}

export default Register;