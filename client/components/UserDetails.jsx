import React, { useRef, useState } from "react"
import { SafeAreaView, Button, View, Text, TextInput, Pressable } from "react-native"
import Wizard from "react-native-wizard"
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import uuid from 'react-native-uuid';
import axios from "axios";
import { getItemFromSecureStore } from '../lib/secureStore';

const UserDetails = ({ navigation }) => {
    const wizard = useRef(null)
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [isLastStep, setIsLastStep] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [medication, setMedication] = useState('')
    const [medications, setMedications] = useState([])
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [selected, setSelected] = useState(false)


    const addMedications = () => {
        const alreadyAdded = medications.find(med => med === medication)
        if (alreadyAdded) {
            alert('Medication already added')
        }
        else {
            const newMed = { id: uuid.v4(), name: medication }
            console.log('medication', newMed);
            setMedications([...medications, newMed])
            setMedication('')
        }
    }
    const removeMedication = (id) => {
        const newMeds = medications.filter(m => m.id !== id)
        setMedications(newMeds)
    }

    const submitHandler = async () => {
        try{
            const token = await getItemFromSecureStore('token');
            console.log('TOKEN: ',token);
            const res = await axios.put('http://10.0.0.205:8000/api/user',{medications, age, gender}, { headers: { Authorization: `${token}` } })
            navigation.navigate('HomeScreen')

        }
        catch(error){
            console.log('ERROR: ', error);
        }
    }
    const stepList = [
        {
            content:
                <View className='w-screen p-6'>
                    {
                        medications.map((med) => (
                            <View key={med.id} style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 6, marginBottom: 4 }}>
                                <Text style={{}} className='p-2 m-1' >{med.name}</Text>
                                <Icon name="x" size={20} onPress={() => removeMedication(med.id)} />
                            </View>
                        ))
                    }
                    <Text>Are you taking any medications?</Text>
                    <TextInput
                        placeholder="Medication"
                        onChangeText={text => setMedication(text)}
                        value={medication}
                        className='w-full border-2 border-gray-300 p-2 rounded-lg my-2'
                    />
                    {
                        medication.length > 0 &&
                        <Pressable style={{ borderColor: 'black', borderWidth: 1, marginTop: 4 }} onPress={addMedications}>
                            <Text className='text-center text-[18px]'>Add</Text>
                        </Pressable>
                    }
                    {
                        medications.length > 0 ?
                            < Pressable style={{ backgroundColor: 'purple', marginTop: 4, padding: 4 }} onPress={() => wizard.current.next()}>
                                <Text className='text-center text-white text-[18px]'>Next</Text>
                            </Pressable> :
                            < Pressable style={{ backgroundColor: 'purple', marginTop: 4, padding: 4 }} onPress={() => wizard.current.next()}>
                                <Text className='text-center text-white text-[18px]'>Skip</Text>
                            </Pressable>

                    }
                </View >
        },
        {
            content:
                // Gender Seletion 
                <View className='w-screen p-6'>
                    <Pressable style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, padding: 6, backgroundColor: gender === 'Male' ? '#D8BFD8' : 'transparent' }} onPress={() => setGender('Male')}>
                        <Text className='text-center text-[18px]'><AntIcon name='man' /> Male</Text>
                    </Pressable>
                    <Pressable style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, marginVertical: 10, padding: 6, backgroundColor: gender === 'Female' ? '#DDA0DD' : 'transparent' }} onPress={() => setGender('Female')}>
                        <Text className='text-center text-[18px]'><AntIcon name='woman' />  Female</Text>
                    </Pressable>
                    {
                        gender.length === 0 ?
                            null
                            :
                            <Pressable style={{ backgroundColor: 'purple', marginBottom: 8, padding: 4 }} onPress={() => wizard.current.next()}>
                                <Text className='text-center text-white text-[18px]'>Next</Text>
                            </Pressable>
                    }
                    <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />

                </View>
        },
        {
            content:
                <View className='w-screen p-6' >
                    {/* Age */}
                    <Text>Age</Text>
                    <TextInput
                        placeholder="Age"
                        onChangeText={text => setAge(text)}
                        value={age}
                        className='w-full border-2 border-gray-300 p-2 rounded-lg my-2'
                        keyboardType="numeric"
                    />
                    {
                        age.length === 0 ?
                            <Pressable style={{ backgroundColor: 'purple', marginBottom: 8, padding: 4 }} onPress={submitHandler} >
                                <Text className='text-center text-white text-[18px]'>Skip</Text>
                            </Pressable>
                            :
                            <Pressable style={{ backgroundColor: 'purple', marginBottom: 8, padding: 4 }} onPress={submitHandler} >
                                <Text className='text-center text-white text-[18px]'>Next</Text>
                            </Pressable>
                    }
                    <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />

                </View>
        }
    ]

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <SafeAreaView style={{ backgroundColor: "#FFF" }}>
                <View
                    style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        backgroundColor: "#FFF",
                        borderBottomColor: "#dedede",
                        borderBottomWidth: 1,
                    }}>
                    <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
                    <Text>{currentStep + 1}. Step</Text>
                    <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
                </View>
            </SafeAreaView> */}
            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Wizard
                    ref={wizard}
                    steps={stepList}
                    isFirstStep={val => setIsFirstStep(val)}
                    isLastStep={val => setIsLastStep(val)}
                    onNext={() => {
                        console.log("Next Step Called")
                    }}
                    onPrev={() => {
                        console.log("Previous Step Called")
                    }}
                    currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                        setCurrentStep(currentStep)
                    }}
                />
                <View style={{ flexDirection: "row", margin: 18 }}>
                    {stepList.map((val, index) => (
                        <View
                            key={"step-indicator-" + index}
                            style={{
                                width: 10,
                                marginHorizontal: 6,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: index === currentStep ? "#fc0" : "#000",
                            }}
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}

export default UserDetails;