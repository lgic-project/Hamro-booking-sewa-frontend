import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import BackButton from '../../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../UserContext/UserContext';

const UserProfile = ({ navigation }) => {
  const { user } = useContext(UserContext);

  // Debug output to check user object
  console.log('User:', user);

  if (!user || !user.name || !user.email || !user.phone_number || !user.category || !user.id) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const { name, email, phone_number, category, id } = user;

  const { navigate } = useNavigation();

  const handleEdit = () => {
    navigate('ProfileEdit', {
      userName: name,
      email,
      phoneNumber: phone_number,
      userID: id,
    });
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View style={[styles.profileContainer, Platform.OS === 'ios' ? styles.iosShadow : styles.androidShadow]}>
        <Image source={require('../../../../assets/profile.png')} style={styles.profilePic} />
        <Text style={styles.category}>Account Type: {category}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User Name</Text>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.label}>Email Address</Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.text}>{phone_number}</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iosShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  androidShadow: {
    elevation: 5,
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
