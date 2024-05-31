import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Server from '../../../Server/Server';

const ListHotelsScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const apiUrl = Server.primaryUrl+"/json-owner";
  const homeUrl = "http://192.168.1.71:8000/images/hotel/";
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator animating={true} color={'blue'} size={'large'} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Cover style={styles.icon} source={{uri: Server.primaryUrl +'/images/hotel/'+ item.photos}} onError={() => console.log('Error loading image')} />
              <Card.Title title={item.title} subtitle={item.location} />
              <Card.Content>
                <Text style={{ fontSize: 15, color: 'red' }}>Contact: {item.phone_number}</Text>
                <Text style={{ fontSize: 15, color: 'blue' }}>Email: {item.email}</Text>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          refreshing={refreshing}
          onRefresh={onRefresh}
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
    margin: 5,
  },
  flatListContent: {
    paddingBottom: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {
    flex: 1,
    height: 200,
    width: "auto",
    resizeMode: "contain",
  },
  card: {
    marginBottom: 10,
  },
});
