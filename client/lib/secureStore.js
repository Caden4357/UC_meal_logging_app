import * as SecureStore from 'expo-secure-store';


// improve this function to handle errors try catch

export async function getItemFromSecureStore(key) {
    try {
        const token = await SecureStore.getItemAsync(key)
        return token;
    } catch (error) {
        return error;
    }
}

export async function storeDataInSecureStore(data) {
    try {
        console.log('data', data);
        await SecureStore.setItemAsync('token', data.token)
    } catch (error) {
        return error;
    }
}

export async function logoutUser() {
    try {
        await SecureStore.deleteItemAsync('token')
    } catch (error) {
        return error;
    }
}