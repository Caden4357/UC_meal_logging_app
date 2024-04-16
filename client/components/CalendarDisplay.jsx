import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import MyCalendar from './MyCalendar';
import { UserContext } from '../context/UserContext';

const CalendarDisplay = (props) => {
    const { user } = useContext(UserContext);

    let todaysDate = new Date();
    const [week, setWeek] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        function formatDate(date) {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
            const dayOfWeek = days[date.getDay()];
            const month = months[date.getMonth()];
            const dayOfMonth = date.getDate();
            const year = date.getFullYear();
        
            // Adding suffix to day
            const suffix = (day) => {
                if (day > 3 && day < 21) return 'th'; // handles special cases for 11th to 13th
                switch (day % 10) {
                    case 1:  return "st";
                    case 2:  return "nd";
                    case 3:  return "rd";
                    default: return "th";
                }
            };
        
            return `${dayOfWeek}, ${month} ${dayOfMonth}${suffix(dayOfMonth)} ${year}`;
        }
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
        setFormattedDate(formatDate(new Date()));
    }, []);

    const onDayPress = (day) => {
        setSelectedDate(day);
    }
    return (
        <View style={{ flex: 2, borderBottomWidth: 1, padding: 8, paddingTop:20, marginBottom:10, 
        backgroundColor: "#f2f0e5" 
        }}>
            <View style={{flex:2, justifyContent:'center'}}>
                <Text style={{ textAlign: 'center', fontSize: 20, padding: 10}}>Welcome back, {user?.username}</Text>
                <Text style={{ textAlign: 'left', fontSize: 20, marginLeft:16}}>{formattedDate}</Text>
            </View>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'flex-end' }}>
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