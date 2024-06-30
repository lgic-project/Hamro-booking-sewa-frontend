import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Server from '../../../../Server/Server';  // Ensure the correct path to Server

const HotelDetailsScreen = ({ route }) => {
  const { hotel } = route.params;
  const navigation = useNavigation();

  const homeUrl = Server.primaryUrl + "/images/hotel/";
  const roomImageUrl = Server.primaryUrl + "/images/hotel/room/";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: homeUrl + hotel.photos }} style={styles.headerImage} />
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>{hotel.title}</Text>
        </View>
      </View>
      
      <View style={styles.hotelInfoContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.description}>{hotel.description}</Text>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.text}>{hotel.location}</Text>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.text}>Phone: {hotel.phone_number}</Text>
            <Text style={styles.text}>Email: {hotel.email}</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.roomsContainer}>
        <Text style={styles.sectionTitle}>Rooms:</Text>
        {hotel.rooms.map((room) => (
          <TouchableOpacity key={room.id} onPress={() => navigation.navigate('RoomDetails', { room })}>
            <Card style={styles.roomCard}>
              <View style={styles.roomContainer}>
                <Image source={{ uri: roomImageUrl + room.room_thumbnail }} style={styles.roomImage} />
                <View style={styles.roomDetails}>
                  <Text style={styles.roomTitle}>{room.title}</Text>
                  <Text style={styles.priceText}>Price: {room.price}</Text>
                  <Text style={styles.text}>Availability: {room.is_available}</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  headerTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  hotelInfoContainer: {
    padding: 10,
    marginBottom: 10,
  },
  roomsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    borderRadius: 10,
    marginBottom: 5,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  roomCard: {
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  roomContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  roomImage: {
    width: 100,
    height: 120,
  },
  roomDetails: {
    flex: 1,
    padding: 10,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
