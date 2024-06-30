import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Pressable, Modal, Alert, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Server from '../../Server/Server'; // Import server configuration
import { UserContext } from '../UserContext/UserContext';

function generateBookingId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charLength = characters.length;
  let bookingId = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charLength);
    bookingId += characters[randomIndex];
  }
  return bookingId;
}

const Booking = ({ route, navigation }) => {
  const { user } = useContext(UserContext) || {};
  const { hotel , room } = route.params || {};
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [people, setPeople] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.id) {
      console.error('User information is missing.');
      return;
    }
    if (!room || !room.id) {
      console.error('Room information is missing.');
      return;
    }

    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = () => {
    fetch(Server.primaryUrl + '/csrf-token', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setCsrfToken(data.csrfToken);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response');
        }
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
        Alert.alert('Error', 'Failed to fetch CSRF token.');
      });
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tempDate;
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      setDate(currentDate);
    } else {
      setTempDate(currentDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || tempTime;
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      setArrivalTime(currentTime);
    } else {
      setTempTime(currentTime);
    }
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
    setLoading(true);

    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = arrivalTime.toTimeString().split(' ')[0].substring(0, 5);

    const bookingData = {
      hotel_user_id: hotel.user_id,
      end_user_id: user.id,
      room_id: room.id,
      total_people: people,
      booking_id: generateBookingId(8),
      arrival_date: formattedDate,
      arrival_time: formattedTime,
    };

    fetch(`${Server.primaryUrl}/booking/store`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify(bookingData),
    })
      .then(response => {
        setLoading(false);
        if (!response.ok) {
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
        setLoading(false);
        console.error('Error:', error);
        Alert.alert('Error', 'Failed to confirm booking. Please try again.');
      });
  };

  const currentDate = new Date();
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);

  if (!user || !user.id || !room || !room.id) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

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
      {Platform.OS === 'ios' && (
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
                minimumDate={currentDate}
                maximumDate={oneYearFromNow}
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
      )}
      {Platform.OS === 'android' && showDatePicker && (
        <RNDateTimePicker
          mode="date"
          display="default"
          value={date}
          onChange={onDateChange}
          minimumDate={currentDate}
          maximumDate={oneYearFromNow}
        />
      )}
      <Pressable onPress={toggleTimePicker}>
        <TextInput
          style={styles.input}
          placeholder="Arrival Time (HH:MM)"
          value={arrivalTime.toTimeString().split(' ')[0].substring(0, 5)}
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
      {Platform.OS === 'ios' && (
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
      )}
      {Platform.OS === 'android' && showTimePicker && (
        <RNDateTimePicker
          mode="time"
          display="default"
          value={arrivalTime}
          onChange={onTimeChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Number of People"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleBooking} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Confirm Booking'}</Text>
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
    backgroundColor: '#949194',
    color: '#fff',
    paddingVertical: 10,
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
