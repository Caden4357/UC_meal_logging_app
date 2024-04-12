import React, { useRef, useState } from "react"
import { SafeAreaView, Button, View, Text, TextInput, Pressable } from "react-native"
import Wizard from "react-native-wizard"
import Icon from 'react-native-vector-icons/Feather';

const UserDetails = ({ navigation }) => {
    const wizard = useRef(null)
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [isLastStep, setIsLastStep] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [medication, setMedication] = useState('')
    const [medications, setMedications] = useState([])

    const addMedications = () => {
        const alreadyAdded = medications.find(med => med === medication)
        if (alreadyAdded) {
            alert('Medication already added')
        }
        else {
            setMedications([...medications, medication])
            setMedication('')
        }
    }
    const removeMedication = (med) => {
        const newMeds = medications.filter(m => m !== med)
        setMedications(newMeds)
    }
    const stepList = [
        {
            content:
                <View>
                    {
                        medications.map((med, index) => (
                            <View style={{ borderColor: 'black', borderWidth: 1, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 6, marginBottom: 4 }}>
                                <Text style={{}} className='p-2 m-1' key={medication + index}>{med}</Text>
                                <Icon name="x" size={20} onPress={() => removeMedication(med)} />
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
                    <Pressable style={{ backgroundColor: 'purple', marginTop: 4, padding: 4 }} onPress={() => wizard.current.next()}>
                        <Text className='text-center text-white text-[18px]'>Next</Text>
                    </Pressable>
                </View>
        },
        {
            content: <View style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />,
        },
        {
            content: <View style={{ width: 100, height: 500, backgroundColor: "#9be07d" }} />,
        },
        {
            content: <View style={{ width: 100, height: 100, backgroundColor: "#2634e0" }} />,
        },
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