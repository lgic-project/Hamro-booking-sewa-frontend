import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Server from '../../../Server/Server';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const apiUrl = Server.primaryUrl+"/hotel/json-room";
  const homeUrl = Server.primaryUrl+"/images/hotel/";

  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
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

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(({ item }) => (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.icon}
          source={{ uri: homeUrl + 'room/' + item.room_thumbnail }}
          onError={() => console.log('Error loading image')}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>Total Rooms: {item.total_rooms}</Text>
            <Button mode="contained" onPress={() => {
              setSelectedItem(item);
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
      <TextInput
        style={styles.searchBar}
        placeholder="Search rooms..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator animating={true} color={'blue'} size={'large'} />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
      {selectedItem && (
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
                  source={{ uri: homeUrl + 'room/' + selectedItem.room_thumbnail }}
                  onError={() => console.log('Error loading image')}
                />
                <Card.Title title={selectedItem.title} subtitle={`Total Rooms: ${selectedItem.total_rooms}`} />
                <Card.Content>
                  <Text style={styles.priceText}>Price: {selectedItem.price}</Text>
                  <Text style={styles.availableText}>Available: {selectedItem.is_available ? 'Yes' : 'No'}</Text>
                  <Text style={styles.descriptionText}>{selectedItem.description}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => setModalVisible(false)}>Close</Button>
                  <Button onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('Booking', { room: selectedItem });
                  }}>Book Now</Button>
                </Card.Actions>
              </Card>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
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
  priceText: {
    fontSize: 15,
    color: 'red',
    marginTop: 5,
  },
  availableText: {
    fontSize: 15,
    color: 'blue',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 15,
    color: '#333',
    marginTop: 5,
  },
});
