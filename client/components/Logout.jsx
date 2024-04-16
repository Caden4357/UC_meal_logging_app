import React, {useState, useContext} from 'react';
import { View, Text, Button } from 'react-native';
import { logoutUser } from '../lib/secureStore';
import { UserContext } from '../context/UserContext';
const Logout = () => {
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
    }
    return (
        <View>
            <Button title="Logout" onPress={handleLogout} />
        </View>
)}

export default Logout;