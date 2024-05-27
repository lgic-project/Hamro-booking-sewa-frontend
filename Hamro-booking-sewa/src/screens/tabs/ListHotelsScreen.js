// ListHotelsScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet ,FlatList, ActivityIndicator, Searchbar } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const ListHotelsScreen = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false);
  const apiUrl = "http://10.0.2.2:8000/json-owner";
  const [searchQuery, setSearchQuery] = useState('');

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
            
              
            <Card.Cover style={styles.icon} source={{ uri: item.photos }} onError={console.log('Error loading image')} />
            <Card.Title title={item.title} subtitle={item.location} />
            <Card.Content>
            <Text style={{ fontSize: 15, color: 'red' }}>Contact: {item.phone_number}</Text>
            <Text style={{ fontSize: 15, color: 'blue' }}>Email: {item.email}</Text>
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

export default ListHotelsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      margin: 10,
    },

    flatListContent: {
      paddingBottom: 20, // Adjust as needed
      justifyContent: "center",
      alignContent: "center"
    },

    icon: {
      flex: 1,
      height: 200,
      width: "auto", // Adjust height as needed
      resizeMode: "contain",
    },
    card : {
      marginBottom: 10,
    }
});