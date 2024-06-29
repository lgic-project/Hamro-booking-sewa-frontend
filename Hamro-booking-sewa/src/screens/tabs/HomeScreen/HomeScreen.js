import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import useScrollDirection from '../../../ScrollDirection/useScrollDirection';
const HomeScreen = ({ setScrollDirection }) => {
  const [hotels, setHotels] = useState([]);
  const flatListRef = useRef(null);
  const { isScrollingDown, onScroll } = useScrollDirection(flatListRef);

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    setScrollDirection(isScrollingDown);
  }, [isScrollingDown]);

  const fetchHotels = async () => {
    try {
      // Simulating fetching data from an API
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/?userId=1');
      const data = await response.json();
      setHotels(data); // Placeholder for demonstration
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/2363808/pexels-photo-2363808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} // Placeholder image API
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={styles.hotelName}>{item.title}</Text>
      </ImageBackground>
      <Text style={styles.description}>{item.body}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={hotels}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  card: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2, // Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2, // iOS shadow
  },
  imageBackground: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 10,
  },
  description: {
    margin: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'flex-end',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
