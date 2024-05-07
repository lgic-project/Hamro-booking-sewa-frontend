import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { firstNameValidator } from '../helpers/firstNameValidator'
import { lastNameValidator } from '../helpers/lastNameValidator'
import { phoneNumberValidator } from '../helpers/phoneNumberValidator'
import { ScrollView } from 'react-native-gesture-handler'

export default function RegisterScreen({ navigation }) {
  const [firstname, setFirstName] = useState({ value: '', error: '' })
  const [lastname, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [phoneNumber,setPhoneNumber] = useState({ value: '', error: '' })
  const apiUrl = 'http://192.168.1.71:8000/api/userReg';

  const onSignUpPressed = () => {
    const firstNameError = firstNameValidator(firstname.value)
    const lastNameError = lastNameValidator(lastname.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const phoneNumberError = phoneNumberValidator(phoneNumber.value)
    if (emailError || passwordError || firstNameError || lastNameError || phoneNumberError) {
      setFirstName({ ...firstname, error: firstNameError })
      setLastName({ ...lastname, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPhoneNumber({...phoneNumber, error: phoneNumberError})
      return
    }

    // Construct the user data object to be sent to the API
    const userData = {
      first_name: firstname.value,
      last_name: lastname.value,
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
    };

    // Make a POST request to the API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      timeout: 10000, // Increase timeout to 10 seconds (in milliseconds)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error registering user');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful registration
      Alert.alert('Success', 'User registered successfully');
      // You can navigate to another screen or perform other actions upon successful registration
      navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      });
    })
    .catch(error => {
      // Handle registration error
      Alert.alert('Error', 'An error occurred while registering. Please try again.');
      console.error('Error:', error);
    });
  }

  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Dashboard' }],
  //   })
  // }

  return (
    
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Fill up your details</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstname.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstname.error}
        errorText={firstname.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastname.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastname.error}
        errorText={lastname.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Phone Number"
        returnKeyType="done"
        value={phoneNumber.value}
        onChangeText={(Number) => setPhoneNumber({ value: Number, error: '' })}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
        keyboardType="numeric"
      />
      <Button
        mode="outlined"
        onPress={onSignUpPressed}
        style={{ marginTop: 24, justifyContent: "center" }}
      >
        Register
      </Button>
      <View style={styles.row}>
        <Text>I already have an account !</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
    
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: '800',
    color: theme.colors.primary,
  },
})