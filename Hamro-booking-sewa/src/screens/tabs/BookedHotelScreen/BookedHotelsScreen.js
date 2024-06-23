import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Modal, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import Server from '../../../Server/Server';

const BookedHotelsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookingUrl = Server.primaryUrl + "/booking-json";
  const homeUrl = Server.primaryUrl + "/images/hotel/";

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

  const renderItem = useCallback(({ item }) => (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.icon}
          source={{ uri: homeUrl + item.hotel_photo }}
          onError={() => console.log('Error loading image')}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.hotel_name}</Text>
            <Text style={styles.subtitle}>Room: {item.room}</Text>
            <Text style={styles.subtitle}>Date: {item.date}</Text>
            <Text style={styles.subtitle}>Time: {item.time}</Text>
            <Text style={styles.subtitle}>People: {item.people}</Text>
            <Button mode="contained" onPress={() => {
              setSelectedBooking(item);
              setModalVisible(true);
            }}>
              View Details
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  ), []);

  return (
    <View style={styles.container}>
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
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Card style={styles.modalCard}>
                <Card.Cover
                  style={styles.icon}
                  source={{ uri: homeUrl + selectedBooking.hotel_photo }}
                  onError={() => console.log('Error loading image')}
                />
                <Card.Title title={selectedBooking.hotel_name} subtitle={`Room: ${selectedBooking.room}`} />
                <Card.Content>
                  <Text style={styles.status}>Status: Pending</Text>
                  <Text style={styles.subtitle}>Date: {selectedBooking.date}</Text>
                  <Text style={styles.subtitle}>Time: {selectedBooking.time}</Text>
                  <Text style={styles.subtitle}>People: {selectedBooking.people}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => setModalVisible(false)}>Close</Button>
                  <Button onPress={() => Alert.alert("Cancel booking feature not implemented yet")}>Cancel Booking</Button>
                </Card.Actions>
              </Card>
            </View>
          </View>
        </Modal>
      )}
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
  flatListContent: {
    paddingBottom: 20,
  },
  icon: {
    height: 150,
    resizeMode: 'cover',
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
  textContainer: {
    alignItems: 'center',
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
