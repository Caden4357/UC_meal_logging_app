import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const HomeScreenMain = (props) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={styles.card}>
                        <Text>Card Content {index + 1}</Text>
                    </View>
                ))}
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
