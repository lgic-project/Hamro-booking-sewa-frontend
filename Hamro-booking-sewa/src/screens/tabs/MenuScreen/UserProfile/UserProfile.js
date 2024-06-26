import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import BackButton from '../../../../components/BackButton';

const UserProfile = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [password, setPassword] = useState('*******');

  const handleSave = () => {
    // Save edited data to database or API
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.profileContainer}>
        <Image source={require('../../../../assets/profile.png')} style={styles.profilePic} />
        <View style={styles.infoContainer}>
          <Text style={styles.label}>User Name</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={text => setUserName(text)}
              mode="outlined"
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
              mode="outlined"
            />
          ) : (
            <Text style={styles.text}>{email}</Text>
          )}
          <Text style={styles.label}>Password</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={text => setPassword(text)}
              mode="outlined"
              secureTextEntry
            />
          ) : (
            <Text style={styles.text}>{password}</Text>
          )}
          <Text style={styles.label}>Phone Number</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              mode="outlined"
            />
          ) : (
            <Text style={styles.text}>{phoneNumber}</Text>
          )}
          {editMode ? (
            <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
              Save
            </Button>
          ) : (
            <Button mode="contained" onPress={() => setEditMode(true)} style={styles.editButton}>
              Edit
            </Button>
          )}
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
    backgroundColor: '#ffffff',
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
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007bff',
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
  input: {
    width: '100%',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    marginTop: 20,
  },
});

export default UserProfile;
