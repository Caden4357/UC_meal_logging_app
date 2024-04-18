import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import Logout from '../components/Logout';
import HomeScreenNavBar from '../components/HomeScreenNavBar';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
const Profile = (props) => {
    const { user } = useContext(UserContext);
    const token = user.id;
    const [foodLog, setFoodLog] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.0.205:8000/api/get_food_log', { headers: { Authorization: `${token}` } })
            .then((response) => {
                console.log(response.data);
                setFoodLog(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <View style={{ flex: 4, borderWidth: 2, padding: 10 }}>
                <Text>Profile</Text>
                <Logout />
            </View>
            <View>
                <Text>Food Log</Text>
                {
                    foodLog.map((food, index) => {
                        return (
                            <View key={index}>
                                <Text>{food.foodName}</Text>
                                <Text>{food.createdAt}</Text>
                                <Image source={{ uri: food.image.url }} style={{ width: 200, height: 200 }} />
                            </View>
                        )
                    })
                }
            </View>
            <HomeScreenNavBar navigation={props.navigation} />
        </>
    )
}

export default Profile;