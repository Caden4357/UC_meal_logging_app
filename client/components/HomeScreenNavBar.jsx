import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MealIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const HomeScreenNavBar = ({navigation}) => {
    return (
        <View style={{ flex: 1, borderBlockColor: 'green', borderWidth: 2, margin: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '100%' }}>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <Icon style={{ borderWidth: 1, borderRadius: 20, padding: 5, alignSelf: 'center' }} name="home" size={30} onPress={() => navigation.navigate('UserDetails')} />
                    <Text>Home</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <MealIcon style={{ borderWidth: 1, borderRadius: 20, padding: 5, alignSelf: 'center' }} name="food-variant" size={30} onPress={() => navigation.navigate('UserDetails')} />
                    <Text>Meals</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <MaterialIcon style={{ borderWidth: 1, borderRadius: 20, padding: 5, alignSelf: 'center' }} name="tag-faces" size={30} onPress={() => navigation.navigate('UserDetails')} />
                    <Text>Tracker</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <FontAwesome5 style={{ borderWidth: 1, borderRadius: 20, padding: 5, alignSelf: 'center' }} name="hands-helping" size={30} onPress={() => navigation.navigate('UserDetails')} />
                    <Text>Get Help</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <AntIcon style={{ borderWidth: 1, borderRadius: 20, padding: 5, alignSelf: 'center' }} name="profile" size={30} onPress={() => navigation.navigate('UserDetails')} />
                    <Text>Profile</Text>
                </View>
            </View>
        </View>
    )
}

export default HomeScreenNavBar;