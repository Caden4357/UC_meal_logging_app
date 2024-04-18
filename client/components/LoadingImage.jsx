import React, {useState} from 'react';
import { View, Text } from 'react-native';

const LoadingImage = ({progress}) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{progress}%</Text>
        </View>

)}

export default LoadingImage;