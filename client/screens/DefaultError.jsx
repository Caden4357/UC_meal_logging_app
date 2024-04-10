import React, {useState} from 'react';
import { View, Text } from 'react-native';
const DefaultError = (props) => {
    return (
        <View className='justify-center items-center flex-1 mt-10' style={{marginTop:0}}>
            <Text>There seems to be an issue please try again later</Text>
        </View>
)}

export default DefaultError;