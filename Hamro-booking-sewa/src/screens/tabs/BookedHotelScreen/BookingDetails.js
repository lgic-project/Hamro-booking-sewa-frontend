import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Portal, Dialog } from 'react-native-paper'; // Assuming you use react-native-paper for enhanced UI
import { useNavigation } from '@react-navigation/native';
import Server from '../../../Server/Server'; // Adjust path as necessary

const BookingDetails = ({ route }) => {
  const { bookingId } = route.params;
  const apiUrl = `${Server.primaryUrl}/dashboard/view-end-user-booking-details/${bookingId}`;
  const [bookingDetails, setBookingDetails] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setBookingDetails(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const cancelUrl = `${Server.primaryUrl}/cancel-booking/${bookingId}`; // Adjust URL as necessary
      await fetch(cancelUrl, { method: 'GET' });
      Alert.alert("Booking cancelled successfully");
      navigation.goBack();
      // You can add navigation or any other action after cancellation
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to cancel the booking");
    } finally {
      setDialogVisible(false);
    }
  };

  if (!bookingDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { bookingData, hotelOwnerData, roomData } = bookingDetails;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Card elevation={5} style={styles.card}>
          <Image
            source={{ uri: `${Server.primaryUrl}/images/hotel/room/${roomData.room_thumbnail}` }}
            style={styles.image}
            resizeMode="cover"
          />
          <Card.Content>
            <View style={styles.section}>
              <Title style={styles.title}>Hotel Details</Title>
              <Paragraph style={styles.subtitle}>Hotel name : {hotelOwnerData.title}</Paragraph>
              <Paragraph style={styles.subtitle}>Email : {hotelOwnerData.email}</Paragraph>
              <Paragraph style={styles.subtitle}>Location : {hotelOwnerData.location}</Paragraph>
            </View>
            <View style={styles.section}>
              <Title style={styles.title}>Room Details</Title>
              <Paragraph style={styles.subtitle}>Room Title : {roomData.title}</Paragraph>
              <Paragraph style={styles.subtitle}>Price : Rs. {roomData.price}</Paragraph>
            </View>
            <Button mode="contained" onPress={() => setDialogVisible(true)}>
              Cancel Booking
            </Button>
          </Card.Content>
        </Card>
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title>Cancel Booking</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to cancel the booking?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>No</Button>
            <Button onPress={handleCancelBooking}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
});
