import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableOpacity } from 'react-native';

const Booking = ({ route, navigation }) => {
  const { room } = route.params;
  const [date, setDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [people, setPeople] = useState('');

  const handleBooking = () => {
    // Here you can handle the booking logic, such as sending data to a server
    console.log('Booking details:', { date, arrivalTime, people });
    alert('Booking confirmed!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Room: {room.title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Arrival Time (HH:MM)"
        value={arrivalTime}
        onChangeText={setArrivalTime}
      />
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
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
