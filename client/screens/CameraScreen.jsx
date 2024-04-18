import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';

export default function CameraScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
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

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    const takePicture = async () => {
        // setLoading(true);
        try {
            console.log('Taking picture...');
            let photo = await cameraRef.current.takePictureAsync();
            const blob = await fetch(photo.uri).then((response) => response.blob());
            const imageName = new Date().getTime() + '.jpg';
            console.log('Blob created');

            const storageRef = ref(storage, 'images/' + new Date().getTime() + '.jpg');
            const uploadTask = uploadBytesResumable(storageRef, blob);

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
                async () => {
                    try {
                        console.log('Upload is complete');
                        // setLoading(false);
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log('File available at', downloadURL);
                        await addDoc(collection(db, 'images'), { url: downloadURL, name: imageName });
                        setLoading(false);
                    }
                    catch (err) {
                        console.error("Error adding document: ", err);
                    }
                }
            );
        } catch (err) {
            console.error("Error capturing or uploading image: ", err);
        }
    };

    return (
        <View style={styles.container}>
            {/* ? loading circle while uploading */}
            {/* 
            {
                loading && <Text style={styles.text}>Uploading...</Text>
            } */}
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.closeCameraContainer}>
                    <TouchableOpacity onPress={takePicture}>
                        <FontAwesome6Icon name='x' size={40} color="white" onPress={() => navigation.navigate('HomeScreen')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Entypo name="circle" size={72} color="white" />
                    </TouchableOpacity>
                </View>
            </Camera>
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
