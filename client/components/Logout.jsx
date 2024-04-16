import React, {useState, useContext} from 'react';
import { View, Text, Button } from 'react-native';
import { logoutUser } from '../lib/secureStore';
import { UserContext } from '../context/UserContext';
import { getItemFromSecureStore } from '../lib/secureStore';
import axios from 'axios';
const Logout = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        try{
            const token = await getItemFromSecureStore('token');
            await axios.post('http://10.0.0.205:8000/api/logout', {},{ headers: { Authorization: `${token}` } } );
            await logoutUser();
            setUser(null);
        }
        catch(error){
            console.log('ERROR: ', error);
        }
    }
    return (
        <View>
            <Button title="Logout" onPress={handleLogout} />
        </View>
)}

export default Logout;