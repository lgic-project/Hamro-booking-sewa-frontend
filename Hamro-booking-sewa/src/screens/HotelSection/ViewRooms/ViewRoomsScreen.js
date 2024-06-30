import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, RefreshControl } from 'react-native';
import Server from '../../../Server/Server';
import { UserContext } from '../../UserContext/UserContext';

const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext) || {};
  console.log(user);

  const apiURL = Server.primaryUrl;
  const imageURL = `${Server.primaryUrl}/images/hotel/room/`;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${apiURL}/json-room`);
      const data = await response.json();
      
      // Filter bookings based on user.id
      const filteredBookings = data.filter(item => item.user_id === String(user.id));
      
      setBookings(filteredBookings);
      console.log(filteredBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingContainer}>
      <Image source={{ uri: `${imageURL}${item.room_thumbnail}` }} style={styles.roomImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.roomTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            setSelectedRoom(item);
            setModalVisible(true);
          }}
        >
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {selectedRoom && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Room Details</Text>
              <Image source={{ uri: `${imageURL}${selectedRoom.room_thumbnail}` }} style={styles.modalImage} />
              <Text style={styles.modalText}>Title: {selectedRoom.title}</Text>
              <Text style={styles.modalText}>Description: {selectedRoom.description}</Text>
              <Text style={styles.modalText}>Price: {selectedRoom.price}</Text>
              <Text style={styles.modalText}>Total Rooms: {selectedRoom.total_rooms}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  bookingContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#3134a4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#3134a4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BookingScreen;
