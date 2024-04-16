import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import UsernameIcon from 'react-native-vector-icons/AntDesign';
import PassIcon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { getItemFromSecureStore, storeDataInSecureStore } from '../lib/secureStore';
import { UserContext } from '../context/UserContext';
import { SelectList } from 'react-native-dropdown-select-list';
const ibs = [
    { key: '1', value: 'Crohns' },
    { key: '2', value: 'Ulcerative Colitis' },
    { key: '3', value: 'Unknown' },
    { key: '4', value: 'None' }
]
const Register = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('fred2');
    const [email, setEmail] = useState('f@aol.com');
    const [ibd, setIbd] = useState('None');
    const [password, setPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('12345678');

    const submitHandler = async () => {
        try {
            const user = { username, email, ibd, password, confirmPassword }
            const res = await axios.post('http://10.0.0.205:8000/api/register', user, { withCredentials: true })
            console.log('user', res.data);
            await storeDataInSecureStore({ token: res.data })
            const token = await getItemFromSecureStore('token')
            setUser({id:token, username: res.data.username})
            navigation.navigate('Root', {screen: 'UserDetails'})
        }
        catch (error) {
            console.log('ERROR: ', error);
        }
    }
    return (
        <View className='flex-1 items-center justify-center'>
            {/* <Text className='text-3xl font-bold my-10'>Welcome To UC Log</Text> */}
            <Text className='text-3xl font-bold my-10'>Register</Text>
            <View style={styles.inputStyle}>
                <UsernameIcon style={{ marginRight: 6 }} name="user" size={30} color={'black'} />
                <TextInput
                    placeholder="Username"
                    className='w-full'
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
            </View>
            <View style={styles.inputStyle}>
                <PassIcon style={{ marginRight: 6 }} name="email" size={30} color={'black'} />
                <TextInput
                    placeholder="Email"
                    className='w-full'
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType='email-address'
                />
            </View>
            <View className='flex-row items-center ml-6'>
                <PassIcon style={{ marginRight: 6 }} name="health-and-safety" size={30} color={'black'} />
                <SelectList
                    setSelected={(val) => setIbd(val)}
                    data={ibs}
                    save="value"
                    boxStyles={{ width: '80%'}}
                />
            </View>
            <View style={styles.inputStyle}>
                <PassIcon style={{ marginRight: 6 }} name="password" size={30} color={'black'} />
                <TextInput
                    placeholder="Password"
                    className='w-full'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    value={password}
                />
            </View>
            <View style={styles.inputStyle}>
                <PassIcon style={{ marginRight: 6 }} name="password" size={30} color={'black'} />
                <TextInput
                    placeholder="Confirm Password"
                    className='w-full'
                    onChangeText={text => setConfirmPassword(text)}
                    secureTextEntry={true}
                    value={confirmPassword}
                />
            </View>
            <Text>Already have an account?
                <Text className='text-violet-700' onPress={() => navigation.navigate('Login')}>Login Here</Text>
            </Text>
            <Pressable style={styles.loginButton}>
                <Text className='text-center text-white text-[18px]' onPress={submitHandler}>Register</Text>
            </Pressable>
        </View>
    )
}

export default Register;

const styles = {
    inputStyle: {
        flexDirection: 'row',
        width: '80%',
        padding: 5,
        borderBottomColor: '#909090',
        borderBottomWidth: 1,
        marginVertical: 10
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 40,
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        textAlign: 'center'
    }

}
