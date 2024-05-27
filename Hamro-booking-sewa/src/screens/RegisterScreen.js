import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { firstNameValidator } from '../helpers/firstNameValidator';
import { lastNameValidator } from '../helpers/lastNameValidator';
import { phoneNumberValidator } from '../helpers/phoneNumberValidator';

export default function RegisterScreen({ navigation }) {
  const [first_name, setFirstName] = useState({ value: '', error: '' });
  const [last_name, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [phone_number, setPhoneNumber] = useState({ value: '', error: '' });
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('http://10.0.2.2:8000/csrf-token', {
      method: 'GET',
      credentials: 'include', // Include cookies if necessary
    })
      .then(response => {
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        return response.text(); // Read the response as text first
      })
      .then(text => {
        console.log('Response text:', text);

        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          throw new Error('Invalid JSON response');
        }

        setCsrfToken(data.csrfToken);
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const onSignUpPressed = () => {
    const firstNameError = firstNameValidator(first_name.value);
    const lastNameError = lastNameValidator(last_name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneNumberError = phoneNumberValidator(phone_number.value);
    if (emailError || passwordError || firstNameError || lastNameError || phoneNumberError) {
      setFirstName({ ...first_name, error: firstNameError });
      setLastName({ ...last_name, error: lastNameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhoneNumber({ ...phone_number, error: phoneNumberError });
      return;
    }

    const formData = {
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      phone_number: phone_number.value,
    };

    fetch('http://10.0.2.2:8000/localusers/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken, // Include the CSRF token in the headers
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        console.log('User registered successfully', json);
        navigation.navigate('StartScreen');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Fill up your details</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={first_name.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!first_name.error}
        errorText={first_name.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={last_name.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!last_name.error}
        errorText={last_name.error}
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
        value={phone_number.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phone_number.error}
        errorText={phone_number.error}
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
  );
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
});
