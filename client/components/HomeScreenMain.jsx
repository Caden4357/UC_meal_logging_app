import React, {useContext} from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import mainMeal from '../assets/meal-main.jpg';
import health from '../assets/health.jpg';
import gutHealth from '../assets/gut-health.jpg';
import { UserContext } from '../context/UserContext';
const HomeScreenMain = (props) => {
    const { user } = useContext(UserContext);
    console.log('USER HOME SCREEN', user);
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#9db4a0', marginBottom:20 }}>Try our AI custom meal prep</Text>
                    <Text style={{ fontSize: 16, color: '#9db4a0', marginBottom: 20 }}>Our AI will create a custom meal plan for you based on your preferences and dietary restrictions.</Text>
                    <View style={{ width:'100%', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Pressable onPress={() => alert('coming song')} style={{ width: '45%', backgroundColor: '#9db4a0', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Get Started</Text>
                        </Pressable>
                        <Image source={mainMeal} style={{ width: 125, height: 125, borderRadius:100 }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#9db4a0', marginBottom:20 }}>Looking for fitness tips?</Text>
                    <Text style={{ fontSize: 16, color: '#9db4a0', marginBottom: 20 }}>Check out our blog for the latest fitness tips and tricks to help you reach your goals.</Text>
                    <View style={{ width:'100%', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Pressable onPress={() => alert('coming song')} style={{ width: '45%', backgroundColor: '#9db4a0', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Get Started</Text>
                        </Pressable>
                        <Image source={gutHealth} style={{ width: 125, height: 125, borderRadius:100 }} />
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#9db4a0', marginBottom:20 }}>Looking for fitness tips?</Text>
                    <Text style={{ fontSize: 16, color: '#9db4a0', marginBottom: 20 }}>Check out our blog for the latest fitness tips and tricks to help you reach your goals.</Text>
                    <View style={{ width:'100%', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Pressable onPress={() => alert('coming song')} style={{ width: '45%', backgroundColor: '#9db4a0', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Get Started</Text>
                        </Pressable>
                        <Image source={health} style={{ width: 125, height: 125, borderRadius:100}} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 4, // takes up 4/5 of the parent container's height
        borderBlockColor: '#9db4a0',
        borderWidth: 0,
        margin: 1,
        backgroundColor: '#f5f1de'
    },
    scrollContainer: {
        alignItems: 'center', // Centers the card views horizontally
        paddingBottom: 10, // Ensures padding at the end of the scroll
    },
    card: {
        backgroundColor: '#ffffff', // White background for the cards
        borderWidth: 1,
        borderColor: '#ddd', // Light grey border for the cards
        borderRadius: 10,
        padding: 20,
        width: '90%', // Card width relative to the screen width
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center', // Center text inside the card
    },
});

export default HomeScreenMain;
