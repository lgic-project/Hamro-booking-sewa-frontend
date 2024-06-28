import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import BackButton from '../../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import Server from '../../../../Server/Server';

const UserProfile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('');
  const [userID, setUserID] = useState('');
  const apiUrl = Server.primaryUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/userData/json`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        const user = data.find(user => user.id === 3); // Find the user with ID 3
        if (user) {
          setUserName(user.name);
          setEmail(user.email);
          setPhoneNumber(user.phone_number);
          setCategory(user.category);
          setUserID(user.id);
          console.log('user id is :' ,user.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const { navigate } = useNavigation();

  const handleEdit = () => {
    navigate('ProfileEdit', {
      userName,
      email,
      phoneNumber,
      userID: 3,
    });
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.profileContainer}>
        <Image source={require('../../../../assets/profile.png')} style={styles.profilePic} />
        <Text style={styles.category}>Account Type: {category}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User Name</Text>
          <Text style={styles.text}>{userName}</Text>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.text}>{phoneNumber}</Text>
          <Button mode="contained" onPress={handleEdit} style={styles.editButton}>
            Edit
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    width: '100%',
    backgroundColor: 'rgba(249, 249, 249, 0.4)',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  category: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#007bff',
    marginTop: 20,
  },
});

export default UserProfile;
