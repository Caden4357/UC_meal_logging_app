import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Logout from '../components/Logout';
import axios from 'axios';
import { getItemFromSecureStore } from '../lib/secureStore';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MealIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const HomeScreen = ({ navigation }) => {

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const token = await getItemFromSecureStore('token');
                console.log('token', token);
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
            <View style={{ flex: 2, borderBlockColor: 'blue', borderWidth: 2, margin: 1 }}>

            </View>
            <View style={{ flex: 4, borderBlockColor: 'red', borderWidth: 2, margin: 1 }}>

            </View>
            <View style={{ flex: 1, borderBlockColor: 'green', borderWidth: 2, margin: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '100%' }}>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <Icon style={{ borderWidth: 1,  borderRadius: 20, padding:5, alignSelf:'center' }} name="home" size={30} onPress={() => navigation.navigate('UserDetails')} />
                        <Text>Home</Text>
                    </View>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <MealIcon style={{ borderWidth: 1,  borderRadius: 20, padding:5, alignSelf:'center' }} name="food-variant" size={30} onPress={() => navigation.navigate('UserDetails')} />
                        <Text>Meals</Text>
                    </View>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <MaterialIcon style={{ borderWidth: 1,  borderRadius: 20, padding:5, alignSelf:'center' }} name="tag-faces" size={30} onPress={() => navigation.navigate('UserDetails')} />
                        <Text>Tracker</Text>
                    </View>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <FontAwesome5 style={{ borderWidth: 1,  borderRadius: 20, padding:5, alignSelf:'center' }} name="hands-helping" size={30} onPress={() => navigation.navigate('UserDetails')} />
                        <Text>Get Help</Text>
                    </View>
                    <View style={{width:'20%', alignItems:'center'}}>
                        <AntIcon style={{ borderWidth: 1,  borderRadius: 20, padding:5, alignSelf:'center' }} name="profile" size={30} onPress={() => navigation.navigate('UserDetails')} />
                        <Text>Profile</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;