import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import Logout from '../components/Logout';
import axios from 'axios';
import { getItemFromSecureStore } from '../lib/secureStore';
const HomeScreen = (props) => {

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const token = await getItemFromSecureStore('token');
                console.log('token', token);
                const res = await axios.get('http://10.0.0.205:8000/api/user', { headers: { Authorization: `${token}` } })
                console.log('res', res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);
    return (
        <View className='justify-center items-center flex-1 mt-10' style={{marginTop:0}}>
            <Logout />
            <Text>HomeScreen</Text>
        </View>
)}

export default HomeScreen;