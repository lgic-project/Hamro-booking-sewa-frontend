import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import Header from '../../components/Header';
import Paragraph from '../../components/Paragraph';
import Logo from '../../components/Logo';

const SplashScreen = ({navigation}) => {
    // State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        navigation.replace('StartScreen');
      }, 5000);
    }, [navigation]);

    return (
      <View style={styles.container}>
        {/* <Image
          source={require('../../assets/main-logo.png')}
          style={{width: '90%', resizeMode: 'contain', margin: 30}}
        /> */}
        <Logo />
      <Header>Hamro Booking Sewa</Header>
        <Paragraph>
          Start Booking Your Desired Hotel Rooms.
        </Paragraph>
        {/* <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        /> */}
      </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
