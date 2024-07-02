import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Server from '../../../Server/Server';

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { booked_id } = route.params;
  const apiURL = Server.primaryUrl;

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/dashboard/view-booking-json/${booked_id}`);
        const data = await response.json();
        setBookingDetails(data);
        console.log(data); // Log the response data to the console
      } catch (error) {
        console.error('Error fetching booking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [booked_id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!bookingDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.detailsText}>No booking details found.</Text>
      </View>
    );
  }

  const { bookingData, endUserData, roomData } = bookingDetails;

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Booking Details</Text>
        <Text style={styles.detailsText}>Booking ID: {bookingData.booking_id}</Text>
        <Text style={styles.detailsText}>Total People: {bookingData.total_people}</Text>
        <Text style={styles.detailsText}>Arrival Date: {bookingData.arrival_date}</Text>
        <Text style={styles.detailsText}>Arrival Time: {bookingData.arrival_time}</Text>
        <Text style={styles.detailsText}>Booked on: {bookingData.created_at}</Text>
      </View> */}

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Booked By:</Text>
        <Text style={styles.detailsText}>Name: {endUserData.name}</Text>
        <Text style={styles.detailsText}>Email: {endUserData.email}</Text>
        <Text style={styles.detailsText}>Phone: {endUserData.phone_number}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>For Room</Text>
        <Text style={styles.detailsText}>Room Type : {roomData.title}</Text>
        <Text style={styles.detailsText}>Description : {roomData.description}</Text>
        <Text style={styles.detailsText}>Price : {roomData.price}</Text>
        <Text style={styles.detailsText}>Total Guest : {bookingData.total_people}</Text>
        {/* <Text style={styles.detailsText}>Rating: {roomData.rating}</Text> */}
        {/* <Text style={styles.detailsText}>Availability: {roomData.is_available}</Text> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
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
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default BookingDetails;
