import React, {useState} from 'react';
import { View, Text } from 'react-native';
import Logout from '../components/Logout';

const HomeScreen = (props) => {
    return (
        <View className='justify-center items-center flex-1 mt-10' style={{marginTop:0}}>
            <Logout />
            <Text>HomeScreen</Text>
        </View>
)}

export default HomeScreen;