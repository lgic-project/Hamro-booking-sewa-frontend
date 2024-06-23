import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Server from '../../../Server/Server';

const ListHotelsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const apiUrl = Server.primaryUrl + "/json-owner";
  const homeUrl = Server.primaryUrl + "/images/hotel/";

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
          source={{ uri: homeUrl + item.photos }}
          onError={() => console.log('Error loading image')}
        />
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Button mode="contained" onPress={() => {
              setSelectedHotel(item);
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
        placeholder="Search hotels..."
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
      {selectedHotel && (
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
                  source={{ uri: homeUrl + selectedHotel.photos }}
                  onError={() => console.log('Error loading image')}
                />
                <Card.Title title={selectedHotel.title} subtitle={selectedHotel.location} />
                <Card.Content>
                  <Text style={styles.contactText}>Contact: {selectedHotel.phone_number}</Text>
                  <Text style={styles.emailText}>Email: {selectedHotel.email}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => setModalVisible(false)}>Close</Button>
                  <Button onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('RoomsScreen', { hotelId: selectedHotel.id });
                  }}>View Rooms</Button>
                </Card.Actions>
              </Card>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ListHotelsScreen;

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
  contactText: {
    fontSize: 15,
    color: 'red',
    marginTop: 5,
  },
  emailText: {
    fontSize: 15,
    color: 'blue',
    marginTop: 5,
  },
});
