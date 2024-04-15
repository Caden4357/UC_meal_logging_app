import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MyCalendar from './MyCalendar';
const CalendarDisplay = (props) => {
    let todaysDate = new Date();
    const [week, setWeek] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    
    useEffect(() => {
        const getWeek = () => {
            todaysDate = todaysDate.toISOString().split('T')[0].slice(-2);
            const tempWeek = [];
            const day = new Date();
            let endDate = day.setDate(day.getDate() + 5);
            endDate = new Date(endDate).toISOString().split('T')[0].slice(-2);
            for (let i = todaysDate; i <= endDate; i++) {
                tempWeek.push(i);
            }
            setWeek(tempWeek);
            setSelectedDate(todaysDate);
            console.log('todaysDate', todaysDate);
            console.log('endDate', endDate);
        }
        getWeek();
    }, []);

    const onDayPress = (day) => {
        setSelectedDate(day);
    }
    return (
        <View style={{ flex: 2, borderBlockColor: '#f5f1de', borderWidth: 0, margin: 1, backgroundColor: "#f5f1de", height: '' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems:'flex-end', height:'100%' }}>
            {
                week.map((day, index) => {
                    return (
                        <Pressable
                            key={index}
                            className={`${day == selectedDate ? 'bg-emerald-400' : 'bg-emerald-200'} m-2 p-3 rounded-full `}
                            onPress={() => onDayPress(day)}
                        >
                            <Text>{day}</Text>
                        </Pressable>
                    )
                })
            }
            </View>
        </View>
    )
}

export default CalendarDisplay;