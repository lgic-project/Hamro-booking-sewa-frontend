import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

// Function to generate a random image URL from Lorem Picsum
const getRandomImage = () => {
  const width = 50; // Width of the image
  const height = 50; // Height of the image
  const randomImageId = Math.floor(Math.random() * 1000); // Generate a random image ID
  return `https://picsum.photos/id/${randomImageId}/${width}/${height}`;
};

export default function HomeScreen() {
  const [hotel, setHotel] = useState([
    {
      id: 1,
      title: "Hotel Landmark Pokhara",
      cost : "Rs.2500-30000",
      location: "Lakeside, Pokhara",
      image: getRandomImage(), // Random image URL
      isFavorite: true, // Flag to track if the job is favorited
    },
    {
      id: 2,
      title: "Hotel Lakeshore Pokhara",
      cost : "Rs.3000-45000",
      location: "Lakeside, Pokhara",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 3,
      title: "Hotel Asthas",
      cost : "Rs.1000-10000",
      location: "Lakeside, Pokhara",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    // Add more hotels with isFavorite property if needed
  ]);

  const [visibleHotel, setVisibleHotel] = useState(8); // Number of jobs initially visible
  const [allHotelLoaded, setAllHotelLoaded] = useState(false); // Flag to track if all jobs are loaded

  const loadMoreHotel = () => {
    if (visibleHotel + 8 >= hotel.length) {
      setVisibleHotel(hotel.length);
      setAllHotelLoaded(true);
    } else {
      setVisibleHotel(visibleHotel + 8);
    }
  };

  const toggleFavorite = (id) => {
    setHotel((prevHotel) =>
      prevHotel.map((hotel) =>
        hotel.id === id ? { ...hotel, isFavorite: !hotel.isFavorite } : job
      )
    );
  };

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.hotelDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.cost}>{item.cost}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>

      <TouchableOpacity style={styles.favoriteButton}>
        <FontAwesome
          name={item.isFavorite ? "heart" : "heart-o"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hotel.slice(0, visibleHotel)} // Only display the visible number of jobs
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          !allHotelLoaded ? (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={loadMoreHotel}
            >
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  hotelItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 45,
    marginRight: 15,
  },
  hotelDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cost: {
    color: "#555",
    marginBottom: 5,
  },
  location: {
    color: "#555",
  },
  salary: {
    marginTop: 5,
    color: "#007bff",
  },
  details: {
    marginTop: 5,
  },
  favoriteButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    // marginLeft: 10,
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadMoreButton: {
    backgroundColor: "#39B68D",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  loadMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 5,
    color: "#fff",
    backgroundColor: "#39B68D",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
});