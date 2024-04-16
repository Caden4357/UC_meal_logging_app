import React, {useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Logout from '../components/Logout';
import HomeScreenNavBar from '../components/HomeScreenNavBar';
const Profile = (props) => {

    return (
        <View style={{flex:1, borderWidth:2, padding:20}}>
            <Text>Profile</Text>
            <Logout />
            <HomeScreenNavBar navigation={props.navigation} />
        </View>
        
)}

export default Profile;