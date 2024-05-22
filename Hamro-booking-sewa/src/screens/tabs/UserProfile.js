import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const UserProfile = () => {
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
          <Button mode="contained" onPress={handleSave} >Save</Button>
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 100,
    borderRadius: 10,
    elevation: 5,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: 5,
  },
  editButton: {
    color: '#007bff',
    borderRadius: 5,
    textDecorationLine: 'none',
    alignSelf: 'flex-end',
    fontSize: 25,
  },
});

export default UserProfile;
