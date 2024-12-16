import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { getItemFromSecureStore } from '../lib/secureStore';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import axios from 'axios';
import LoadingImage from '../components/LoadingImage';
export default function CameraScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    // const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [photoUri, setPhotoUri] = useState(null)
    const [photoDesc, setPhotoDesc] = useState('');
    const cameraRef = useRef(null);
    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {

        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    // function toggleCameraType() {
    //     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    // }
    const takePicture = async () => {
        try {
            setLoading(true);
            console.log('Taking picture...');
            let photo = await cameraRef.current.takePictureAsync(); // take picture
            setPhotoUri(photo.uri);
        }
        catch (err) {
            console.error("Error taking picture: ", err);
        }
        finally {
            setLoading(false);
        }
    };
    const uploadImage = async () => {
        setLoading(true);
        const blob = await fetch(photoUri).then((response) => response.blob()); // convert to blob for upload
        const imageName = new Date().getTime() + '.jpg'; // create unique name for image file ! should probably change this to something more descriptive

        const storageRef = ref(storage, 'images/' + new Date().getTime() + '.jpg'); // create a reference to the storage bucket 'images/' is the path to the folder in the bucket
        const uploadTask = uploadBytesResumable(storageRef, blob); // this is a function from firebase that uploads the file to the storage bucket

        // this is a listener that listens for changes in the upload state we can use this to show a progress bar
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress.toFixed(2)}% done`);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Log the complete error object
                console.error("Complete Error Object:", error);

                // Log detailed parts of the error
                console.error("Error Code:", error.code);
                console.error("Error Message:", error.message);
                if (error.serverResponse) {
                    console.error("Server Response:", error.serverResponse);
                } else {
                    console.error("No server response available.");
                }
            },
            // this is the callback that runs when the upload is complete we can use this to get the download url and save it to the database
            async () => {
                try {
                    console.log('Upload is complete');
                    // setLoading(false);
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // get the download url
                    const response = await addDoc(collection(db, 'images'), { url: downloadURL, name: imageName }); // save the download url to the database in firestore 
                    console.log(response);
                    setLoading(false);
                    const token = await getItemFromSecureStore('token'); // get the token from secure store
                    console.log("HERE Line 97");
                    const res = await axios.post('http://10.0.0.205:8000/api/log_food_image', { imageUrl: downloadURL, foodName: 'food' }, { headers: { Authorization: `${token}` } }); // send the download url to the server for mongoDB
                }
                catch (err) {
                    console.error("Error adding document: ", err);
                }
                finally {
                    setLoading(false);
                    setPhotoUri(null);
                    navigation.navigate('HomeScreen');
                }
            }
        );
    };
    return (
        <View style={styles.container}>
            {
                photoUri ?
                    <View style={styles.camera}>
                        <View>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{
                                    uri: photoUri,
                                }}
                            />
                        </View>
                        {
                            !loading ?
                                <View style={{ zIndex: 2, position: 'absolute', bottom: 40, left: 150 }}>
                                    <Button color={'blue'} title='Submit' onPress={uploadImage} />
                                    <Button color={'red'} title='Retake' onPress={() => setPhotoUri('')} />
                                </View> :
                                <View style={{ zIndex: 2, position: 'absolute', bottom: 40, left: 150 }}>
                                    <Button color={'blue'} title='Loading...' onPress={uploadImage} />
                                </View>
                        }
                    </View> :
                    <Camera style={styles.camera} ref={cameraRef}>
                        <View style={styles.closeCameraContainer}>
                            <TouchableOpacity onPress={takePicture}>
                                <FontAwesome6Icon name='x' size={40} color="white" onPress={() => navigation.navigate('HomeScreen')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            {
                                !loading ?
                                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                                        <Entypo name="circle" size={72} color="white" />
                                    </TouchableOpacity> :
                                    <View style={styles.button}>

                                        <Button color={'blue'} title='loading...' onPress={takePicture} />
                                    </View>
                            }
                        </View>
                    </Camera>

            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    closeCameraContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        // borderWidth:2,
        // borderColor:'white',
        margin: 64,
    }
});
