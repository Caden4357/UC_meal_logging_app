// MyCalendar.js
import React from 'react';
import { Dimensions, View, Button } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const MyCalendar = () => {
    const screenWidth = Dimensions.get('window').width;

    return (
        <View>
            <CalendarList
                // Horizontal scrolling enabled
                horizontal={true}
                pagingEnabled={true} // Enables swiping page by page
                calendarWidth={screenWidth}
                pastScrollRange={50} // Adjust as needed
                futureScrollRange={50} // Adjust as needed
                showScrollIndicator={true}
                // Show only 5 days in a single view (modify based on the screen width and day cell width)
                markedDates={{
                    '2024-04-15': { selected: true, marked: true },
                    '2024-04-16': { marked: true },
                    '2024-04-17': { marked: true },
                    '2024-04-18': { marked: true },
                    '2024-04-19': { selected: true, marked: true },
                }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <Button title="Prev" onPress={() => {/* Logic to handle previous day navigation */ }} />
                <Button title="Next" onPress={() => {/* Logic to handle next day navigation */ }} />
            </View>
        </View>
    );
};

export default MyCalendar;
