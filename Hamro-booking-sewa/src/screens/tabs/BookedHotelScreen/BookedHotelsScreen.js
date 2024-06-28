import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Modal, Alert } from 'react-native';
import { Card, Text, Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import Server from '../../../Server/Server';

const BookedHotelsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const bookingUrl = Server.primaryUrl + "/booking-json";
  const roomUrl = Server.primaryUrl + "/images/hotel/room/"; // Change to the correct URL for room images

  const fetchData = async () => {
    try {
      const response = await fetch(bookingUrl);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleCancelBooking = async () => {
    try {
      const cancelUrl = `${Server.primaryUrl}/cancel-booking/${selectedBooking.id}`; // Adjust URL as necessary
      await fetch(cancelUrl, { method: 'GET' });
      Alert.alert("Booking cancelled successfully");
      fetchData(); // Refresh the data after cancellation
    } catch (error) {
      console.error(error);
      Alert.alert("Failed to cancel the booking");
    } finally {
      setDialogVisible(false);
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.title}>{item.hotel_name}</Text>
          <Text style={styles.subtitle}>Booking ID: {item.booking_id}</Text>
          <Text style={styles.subtitle}>Number of people: {item.total_people}</Text>
          <Text style={styles.subtitle}>Arrival Date: {item.arrival_date}</Text>
          <Text style={styles.subtitle}>Arrival Time: {item.arrival_time}</Text>
          <Button mode="contained" onPress={() => {
            setSelectedBooking(item);
            setModalVisible(true);
          }}>
            View Details
          </Button>
        </Card.Content>
      </Card>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>
      {loading ? (
        <ActivityIndicator animating={true} color={'blue'} size={'large'} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
      {selectedBooking && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Card style={styles.modalCard}>
                <Card.Content>
                  <Card.Title title={selectedBooking.hotel_name} subtitle={`Room: ${selectedBooking.room}`} />
                  {selectedBooking.room_thumbnail && <Card.Cover style={styles.icon} source={{ uri: roomUrl + selectedBooking.room_thumbnail }} />}
                  <Text style={styles.subtitle}>Booking ID: {selectedBooking.booking_id}</Text>
                  <Text style={styles.subtitle}>Number of people: {selectedBooking.total_people}</Text>
                  <Text style={styles.subtitle}>Arrival Date: {selectedBooking.arrival_date}</Text>
                  <Text style={styles.subtitle}>Arrival Time: {selectedBooking.arrival_time}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => setModalVisible(false)}>Close</Button>
                  <Button onPress={() => {
                    setModalVisible(false);
                    setDialogVisible(true);
                  }}>Cancel Booking</Button>
                </Card.Actions>
              </Card>
            </View>
          </View>
        </Modal>
      )}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
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
    </View>
  );
};

export default BookedHotelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#cacccf',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // Adds a subtle shadow on Android
    shadowColor: '#000', // Adds a subtle shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  status: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalCard: {
    borderRadius: 10,
  },
});
