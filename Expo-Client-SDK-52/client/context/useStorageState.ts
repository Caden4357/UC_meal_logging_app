import * as SecureStore from 'expo-secure-store';

export const setAuthToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('token', token);
    } catch (error) {
        console.log('Error storing token:', error);
    }
}

export const getAuthToken = async () => {
    try {
        return await SecureStore.getItemAsync('token');
    } catch (error) {
        console.log('Error getting token:', error);
    }
}

export const deleteAuthToken = async () => {
    try {
        await SecureStore.deleteItemAsync('token');
    } catch (error) {
        console.log('Error deleting token:', error);
    }
}