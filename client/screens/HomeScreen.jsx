import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Logout from '../components/Logout';
import axios from 'axios';
import { getItemFromSecureStore } from '../lib/secureStore';
import HomeScreenNavBar from '../components/HomeScreenNavBar';
import HomeScreenMain from '../components/HomeScreenMain';
import CalendarDisplay from '../components/CalendarDisplay';
const HomeScreen = ({ navigation }) => {

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const token = await getItemFromSecureStore('token');
                console.log('*********TOKEN HOME SCREEN LINE 16*********', token);
                const res = await axios.get('http://10.0.0.205:8000/api/user', { headers: { Authorization: `${token}` } })
                console.log('res', res.data);
            }
            catch (error) {
                navigation.navigate('DefaultError')
            }
        }
        fetchUser();
    }, []);
    return (
        <View className='flex-1' style={{ marginTop: 0 }}>
            <CalendarDisplay />
            <HomeScreenMain navigation={navigation} />
            <HomeScreenNavBar navigation={navigation} />
            {/* <Logout navigation={navigation} /> */}
        </View>
    )
}

export default HomeScreen;