import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Server from '../../../../Server/Server';

const ProfileEdit = ({ route, navigation }) => {
  const { userID, userName, email, phoneNumber } = route.params; // Assuming userId is passed as a route param

  const [editedUserName, setEditedUserName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
  const [csrfToken, setCsrfToken] = useState('');
  const apiUrl = Server.primaryUrl;

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/csrf-token`, {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch CSRF token');
        }
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`${apiUrl}/localusers/update/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          name: editedUserName,
          email: editedEmail,
          phone_number: editedPhoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Error saving user data');
      }

      const data = await response.json();
      console.log('User data edited successfully:', data);
      Alert.alert('Edited Successfully!');
      navigation.navigate('UserProfile');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error editing data!!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={editedUserName}
        onChangeText={text => setEditedUserName(text)}
        mode="outlined"
        label="User Name"
      />
      <TextInput
        style={styles.input}
        value={editedEmail}
        onChangeText={text => setEditedEmail(text)}
        mode="outlined"
        label="Email Address"
      />
      <TextInput
        style={styles.input}
        value={editedPhoneNumber}
        onChangeText={text => setEditedPhoneNumber(text)}
        mode="outlined"
        label="Phone Number"
      />
      <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default ProfileEdit;
