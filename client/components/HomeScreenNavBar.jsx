import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MealIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeScreenNavBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <View style={styles.iconView}>
                    <Icon style={styles.icon} name="home" size={30} onPress={() => navigation.navigate('#')} />
                    <Text>Home</Text>
                </View>
                <View style={styles.iconView}>
                    <MealIcon style={styles.icon} name="food-variant" size={30} onPress={() => navigation.navigate('#')} />
                    <Text>Meals</Text>
                </View>
                <View style={styles.iconView}>
                    <MaterialIcon style={styles.icon} name="tag-faces" size={30} onPress={() => navigation.navigate('#')} />
                    <Text>Tracker</Text>
                </View>
                <View style={styles.iconView}>
                    <FontAwesome5 style={styles.icon} name="hands-helping" size={30} onPress={() => navigation.navigate('#')} />
                    <Text>Get Help</Text>
                </View>
                <View style={styles.iconView}>
                    <AntIcon style={styles.icon} name="profile" size={30} onPress={() => navigation.navigate('#')} />
                    <Text>Profile</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBlockColor: '#ffea94',
        borderWidth: 0,
        borderRadius: 20,
        margin: 1,
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%',
    },
    iconView: {
        width: '20%',
        alignItems: 'center',
    },
    icon: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        alignSelf: 'center',
    },
});

export default HomeScreenNavBar;
