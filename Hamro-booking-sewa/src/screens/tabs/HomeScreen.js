// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet ,FlatList, ActivityIndicator } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const HomeScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false);
  const apiUrl = "http://192.168.1.71:8000/json-room";

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(()=> {
    fetch(apiUrl)
    .then((response)=>response.json())
    .then((json)=>setData(json))
    .catch((error)=>console.error(error))
    .finally(()=>setLoading(false))
  },[])
  // Render list of hotels once data is fetched
  return (

    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} color={'blue'} size={'large'} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Cover style={styles.icon} source={{ uri: item.room_thumbnail }} onError={console.log('Error loading image')} />
              <Card.Title title={item.title} subtitle={`Rooms: ${item.total_rooms}`} />
              <Card.Content>
                <Text style={styles.priceText}>Price: {item.price}</Text>
                <Text style={styles.availableText}>Available: {item.is_available ? 'Yes' : 'No'}</Text>
                <Text style={styles.descriptionText}>Description: {item.description}</Text>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
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
  flatListContent: {
    paddingBottom: 20,
  },
  icon: {
    height: 200,
    resizeMode: 'cover',
  },
  card: {
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