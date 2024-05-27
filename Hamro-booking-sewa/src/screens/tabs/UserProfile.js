import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import BackButton from '../../components/BackButton';

const UserProfile = ({navigation}) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

  const handleSave = () => {
    // Save edited data to database or API
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/profile.png')} style={styles.profilePic} />
        <Text style={styles.label}>User Name</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={text => setUserName(text)}
          />
        ) : (
          <Text style={styles.text}>{userName}</Text>
        )}
        <Text style={styles.label}>Email Address</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        ) : (
          <Text style={styles.text}>{email}</Text>
        )}
        <Text style={styles.label}>Phone Number</Text>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
          />
        ) : (
          <Text style={styles.text}>{phoneNumber}</Text>
        )}
        {editMode ? (
          <Button mode="contained" onPress={handleSave} style={styles.button}>Save</Button>
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    // flex: 1,
    width: '95%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default UserProfile;
