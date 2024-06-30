import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const HomeScreen = () => {
  const imageListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        style={styles.slider}
      />
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
});

export default HomeScreen;
