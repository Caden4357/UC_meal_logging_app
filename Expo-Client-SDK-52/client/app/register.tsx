import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const ibs = [
    { key: '1', value: 'Crohns' },
    { key: '2', value: 'Ulcerative Colitis' },
    { key: '3', value: 'Unknown' },
    { key: '4', value: 'None' }
]
const Register = () => {
    // const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('fred2');
    const [email, setEmail] = useState('f@aol.com');
    const [ibd, setIbd] = useState('None');
    const [password, setPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('12345678');

    const submitHandler = async () => {
        // try {
        //     const user = { username, email, ibd, password, confirmPassword }
        //     const res = await axios.post('http://10.0.0.205:8000/api/register', user, { withCredentials: true })
        //     console.log('user', res.data);
        //     await storeDataInSecureStore({ token: res.data.token })
        //     const token = await getItemFromSecureStore('token')
        //     navigation.navigate('UserDetails')
        // }
        // catch (error) {
        //     console.log('ERROR: ', error);
        // }
    }
    return (
        <View className='flex-1 items-center justify-center'>
            {/* <Text className='text-3xl font-bold my-10'>Welcome To UC Log</Text> */}
            <Text className='text-3xl font-bold my-10'>Register</Text>
            <View style={styles.inputStyle}>
                <AntDesign style={{ marginRight: 6 }} name="user" size={30} color={'black'} />
                <TextInput
                    placeholder="Username"
                    className='w-full'
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
            </View>
            <View style={styles.inputStyle}>
                <MaterialIcons style={{ marginRight: 6 }} name="email" size={30} color={'black'} />
                <TextInput
                    placeholder="Email"
                    className='w-full'
                    onChangeText={text => setEmail(text)}
                    value={email}
                    keyboardType='email-address'
                />
            </View>
            <View className='flex-row items-center ml-6'>
                <MaterialIcons style={{ marginRight: 6 }} name="health-and-safety" size={30} color={'black'} />
                {/* <SelectList
                    setSelected={(val) => setIbd(val)}
                    data={ibs}
                    save="value"
                    boxStyles={{ width: '80%'}}
                /> */}
            </View>
            <View style={styles.inputStyle}>
                <MaterialIcons style={{ marginRight: 6 }} name="password" size={30} color={'black'} />
                <TextInput
                    placeholder="Password"
                    className='w-full'
                    onChangeText={text => setPassword(text)}
                    // secureTextEntry={true}
                    value={password}
                />
            </View>
            <View style={styles.inputStyle}>
                <MaterialIcons style={{ marginRight: 6 }} name="password" size={30} color={'black'} />
                <TextInput
                    placeholder="Password"
                    className='w-full'
                    onChangeText={text => setConfirmPassword(text)}
                    // secureTextEntry={true}
                    value={confirmPassword}
                />
            </View>
            <Text>Already have an account?
                <Link href="/" className='text-violet-700' >Login Here</Link>
            </Text>
            <Pressable style={styles.loginButton}>
                <Text className='text-center text-white text-[18px]' onPress={submitHandler}>Register</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
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
})
export default Register;