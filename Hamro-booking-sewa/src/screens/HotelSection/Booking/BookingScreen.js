import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Server from '../../../Server/Server';
import { UserContext } from '../../UserContext/UserContext';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const apiURL = Server.primaryUrl;
  const { user } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${apiURL}/booking-json`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const renderBookingItem = ({ item }) => {
    // Convert user.id to string for comparison
    const userIdString = user ? user.id.toString() : '';

    // Only render bookings where hotel_user_id matches the logged-in user's id
    if (item.hotel_user_id === userIdString) {
      return (
        <View style={styles.bookingContainer}>
          <Text style={styles.bookingText}>Booking ID: {item.booking_id}</Text>
          <Text style={styles.bookingText}>Hotel User ID: {item.hotel_user_id}</Text>
          <Text style={styles.bookingText}>Room ID: {item.room_id}</Text>
          <Text style={styles.bookingText}>End User ID: {item.end_user_id}</Text>
          <Text style={styles.bookingText}>Total People: {item.total_people}</Text>
          <Text style={styles.bookingText}>Arrival Date: {item.arrival_date}</Text>
          <Text style={styles.bookingText}>Arrival Time: {item.arrival_time}</Text>
        </View>
      );
    } else {
      return null; // Don't render if the booking doesn't belong to the logged-in hotel user
    }
  };

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  bookingContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default BookingScreen;
