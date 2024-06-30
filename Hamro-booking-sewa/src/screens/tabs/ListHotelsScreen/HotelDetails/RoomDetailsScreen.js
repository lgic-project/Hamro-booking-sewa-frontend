import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Server from '../../../../Server/Server';  // Ensure the correct path to Server

const RoomDetailsScreen = ({ route }) => {
  const { room } = route.params;
  const roomImageUrl = Server.primaryUrl + "/images/hotel/room/";
  const navigation = useNavigation();

  if (!room) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Room details are not available.</Text>
      </View>
    );
  }

  const availabilityColor = room.is_available ? 'green' : 'red';

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: roomImageUrl + room.room_thumbnail }} style={styles.headerImage} />
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>{room.title}</Text>
          <View style={styles.bookButtonContainer}>
            <Button
              mode="contained"
              style={styles.bookButton}
              onPress={() => navigation.navigate('Booking', { room })}
            >
              Book Now
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.description}>{room.description}</Text>
            <Text style={styles.price}>Price: {room.price}</Text>
            <Text style={[styles.availability, { color: availabilityColor }]}>Availability: {room.is_available ? "Available" : "Not Available"}</Text>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => navigation.navigate('GalleryScreen', { room })}
            >
              View Gallery
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default RoomDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
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
  bookButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bookButton: {
    marginTop: 0,
  },
  contentContainer: {
    padding: 10,
  },
  card: {
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  availability: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
