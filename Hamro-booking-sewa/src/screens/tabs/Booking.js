import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Pressable, Modal } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const Booking = ({ route, navigation }) => {
  const { room } = route.params;
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [arrivalTime, setArrivalTime] = useState(new Date());
  const [tempTime, setTempTime] = useState(new Date());
  const [people, setPeople] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
    // Format date and time
    const formattedDate = date.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
    const formattedTime = arrivalTime.toTimeString().split(' ')[0].substring(0, 5); // Format time to HH:MM

    console.log('Booking details:', { date: formattedDate, arrivalTime: formattedTime, people });
    alert('Booking confirmed!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Room: {room.title}</Text>
      <Pressable onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date.toISOString().split('T')[0]} // Format date to YYYY-MM-DD
          editable={false} // Make TextInput non-editable
          pointerEvents="none" // Prevent the TextInput from capturing touch events
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
          value={arrivalTime.toTimeString().split(' ')[0].substring(0, 5)} // Format time to HH:MM
          editable={false} // Make TextInput non-editable
          pointerEvents="none" // Prevent the TextInput from capturing touch events
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
    backgroundColor: '#1E90FF',
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
