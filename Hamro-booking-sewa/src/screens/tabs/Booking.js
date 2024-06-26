import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Pressable, Modal, Alert } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Server from '../../Server/Server'; // Import server configuration

const Booking = ({ route, navigation }) => {
  const { room } = route.params;
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [people, setPeople] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch(Server.primaryUrl + '/csrf-token', {
      method: 'GET',
      credentials: 'include', // Include cookies if necessary
    })
      .then(response => response.text())
      .then(text => {
        let data;
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response');
        }

        setCsrfToken(data.csrfToken);
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || tempTime;
    setTempTime(currentTime);
  };

  const handleDateOkPress = () => {
    setDate(tempDate);
    toggleDatePicker();
  };

  const handleTimeOkPress = () => {
    setArrivalTime(tempTime);
    toggleTimePicker();
  };

  const handleBooking = () => {
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    const formattedTime = arrivalTime.toTimeString().split(' ')[0].substring(0, 5); // Format time to HH:MM

    const bookingData = {
      hotel_user_id: '2',
      room_id: '1',
      end_user_id:'3',
      total_people: people,
      booking_id: 'ABCD',
      arrival_date: formattedDate,
      arrival_time: formattedTime,
    };

    console.log('Booking Data to be sent:', bookingData);

    fetch(`${Server.primaryUrl}/booking/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(bookingData),
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          console.log('Response data:', JSON.stringify(bookingData));
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log('Booking confirmed', json);
        Alert.alert('Booking confirmed!');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error confirming booking. Please try again.');
      });
  };

  const currentDate = new Date(); // Get the current date
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(currentDate.getFullYear() + 1); // Set the date one year in the future

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Room: {room.title}</Text>
      <Pressable onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date.toISOString().split('T')[0]}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={toggleDatePicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <RNDateTimePicker
              mode="date"
              display="spinner"
              value={tempDate}
              onChange={onDateChange}
              minimumDate={currentDate} // Restrict past dates
              maximumDate={oneYearFromNow} // Restrict to one year from now
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={toggleDatePicker} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDateOkPress} style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={toggleTimePicker}>
        <TextInput
          style={styles.input}
          placeholder="Arrival Time (HH:MM)"
          value={arrivalTime.toTimeString().split(' ')[0].substring(0, 5)}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      <Modal
        transparent={true}
        animationType="slide"
        visible={showTimePicker}
        onRequestClose={toggleTimePicker}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <RNDateTimePicker
              mode="time"
              display="spinner"
              value={tempTime}
              onChange={onTimeChange}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={toggleTimePicker} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTimeOkPress} style={styles.button}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Number of People"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
  backgroundColor: '#949194', // Adding background color
  color: '#fff', // Text color to contrast with background
  paddingVertical: 10, // Vertical padding for better spacing
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
