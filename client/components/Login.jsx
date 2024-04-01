import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
const Login = ({navigation}) => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Login</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
)}

export default Login;