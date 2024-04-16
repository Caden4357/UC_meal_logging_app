import React, {useContext} from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Logout from '../components/Logout';
const Profile = (props) => {

    return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Profile</Text>
            <Logout />
        </View>
        
)}

export default Profile;