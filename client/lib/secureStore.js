import * as SecureStore from 'expo-secure-store';

export async function getItemFromSecureStore(key) {
    let result = await SecureStore.getItemAsync(key);
    console.log('result', result);
    if (result) {
        return result;
    } else {
        return null;
    }
}

export async function storeDataInSecureStore(data) {
    for(let key in data) {
        try {
            await SecureStore.setItemAsync(key, data[key])
        } catch (error) {
            return error;
        }
    }
}

export async function logoutUser() {
    try {
        await SecureStore.deleteItemAsync('id')
    } catch (error) {
        return error;
    }
}