import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Register = ({navigation}) => {
    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Hello</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

export default Register;