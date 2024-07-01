import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Server from '../../../Server/Server';
import useScrollDirection from '../../../ScrollDirection/useScrollDirection';

const HomeScreen = ( {setScrollDirection} ) => {
  const imageListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const { isScrollingDown, onScroll } = useScrollDirection(flatListRef);

  const apiURL = Server.primaryUrl;
  const imgURL = `${apiURL}/images/hotel/`;
  const hotelURL = `${apiURL}/json-owner`;

  const images = [
    "https://lh3.googleusercontent.com/p/AF1QipNcEIaRBJo0A6JiEKVJOOj8UklvaPlnrCmNwPHZ=s1360-w1360-h1020",
    "https://lh3.googleusercontent.com/p/AF1QipPNUFqmnpslW2HkWUaLFl2grboVryHTGx5gdmkN=s1360-w1360-h1020",
    "https://i0.wp.com/lakeshore.com.np/wp-content/uploads/2022/03/IMG_4045-HDR.jpg?fit=2500%2C1557&ssl=1",
    "https://barahi.com/wp-content/themes/yootheme/cache/08/barahi-blurred-088fbfb1.webp",
    "http://pokharagrande.com/images/slideshow/K266L-pokharagrande.jpg",
    "https://content.skyscnr.com/available/1490976334/1490976334_WxH.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/367397409.jpg?k=b506d81cb1a53a2503211821aac75843d04469a1ebdee3c6c685c267ca684531&o=",
  ];

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(hotelURL);
        const data = await response.json();
        setHotels(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    setScrollDirection(isScrollingDown);
  }, [isScrollingDown]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (imageListRef.current) {
      imageListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex]);

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <ImageBackground source={{ uri: item }} style={styles.sliderImage} />
    </View>
  );

  const renderHotelItem = ({ item }) => (
    <View style={styles.hotelContainer}>
      <ImageBackground source={{ uri: `${imgURL}${item.photos}` }} style={styles.hotelImage} />
      <Text style={styles.hotelName}>{item.title}</Text>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => {
          setSelectedHotel(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={imageListRef}
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        style={styles.slider}
      />
      <FlatList
        data={hotels}
        renderItem={renderHotelItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.hotelList}
      />
      {selectedHotel && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedHotel.name}</Text>
              <ScrollView>
                <ImageBackground
                  source={{ uri: `${imgURL}${selectedHotel.photos}` }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalDescription}>{selectedHotel.description}</Text>
                {/* Add more detailed information here */}
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  slider: {
    height: Dimensions.get('window').width * 0.6,
  },
  imageContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.6,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  hotelList: {
    marginTop: 20,
  },
  hotelContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    marginHorizontal: 10,
  },
  hotelImage: {
    width: '100%',
    height: 200,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  detailsButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
