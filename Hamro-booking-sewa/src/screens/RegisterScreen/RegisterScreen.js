import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput as PaperTextInput } from 'react-native-paper';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { nameValidator } from '../../helpers/nameValidator';
import { categoryNameValidator } from '../../helpers/categoryNameValidator';
import { phoneNumberValidator } from '../../helpers/phoneNumberValidator';
import Server from '../../Server/Server';
import ModalSelector from 'react-native-modal-selector';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [category, setCategory] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [textInputValue, setTextInputValue] = useState('');

  // const data = [
  //   { key: 0, label: 'Hotel', value: 'hotel' },
  //   { key: 1, label: 'User', value: 'user' },
  // ];

  useEffect(() => {
    fetch(Server.primaryUrl+'/csrf-token', {
      method: 'GET',
      credentials: 'include', // Include cookies if necessary
    })
      .then(response => response.text())
      .then(text => {
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
    const nameError = nameValidator(name.value);
    // const categoryError = categoryNameValidator(category.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    if (emailError || passwordError || nameError  || phoneNumberError) {
      setName({ ...name, error: nameError });
      // setCategory({ ...category, error: categoryError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      return;
    }

    const formData = {
      name: name.value,
      category: 'user',
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
    };

    fetch(`${Server.primaryUrl}/registerUser/add`, {
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
        Alert.alert('User registered Successfully!');
        navigation.navigate('StartScreen');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <BackButton goBack={navigation.goBack}/>
        <ScrollView contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
          <Logo />
          <Header>Fill up your details</Header>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <PaperTextInput
                label="Full Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                style={styles.input}
              />
              {name.error && <Text style={styles.error}>{name.error}</Text>}
            </View>
            {/* <View style={styles.inputContainer}>
              <ModalSelector
                data={data}
                initValue="Select a category"
                onChange={(option) => {
                  setCategory({ value: option.value, error: '' });
                  setTextInputValue(option.label);
                }}
                accessible={true}
                keyExtractor={(item) => item.key.toString()}
                labelExtractor={(item) => item.label}
              >
                <TouchableOpacity>
                  <PaperTextInput
                    label="Category"
                    value={textInputValue}
                    error={!!category.error}
                    errorText={category.error}
                    editable={false}
                    style={styles.input}
                  />
                </TouchableOpacity>
              </ModalSelector>
              {category.error && <Text style={styles.error}>{category.error}</Text>}
            </View> */}
            <View style={styles.inputContainer}>
              <PaperTextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                style={styles.input}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              {email.error && <Text style={styles.error}>{email.error}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <PaperTextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                style={styles.input}
                secureTextEntry
              />
              {password.error && <Text style={styles.error}>{password.error}</Text>}
            </View>
            <View style={styles.inputContainer}>
              <PaperTextInput
                label="Phone Number"
                returnKeyType="done"
                value={phoneNumber.value}
                onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
                error={!!phoneNumber.error}
                style={styles.input}
                keyboardType="numeric"
              />
              {phoneNumber.error && <Text style={styles.error}>{phoneNumber.error}</Text>}
            </View>
            <Button
              mode="outlined"
              onPress={onSignUpPressed}
              style={styles.button}
            >
              Register
            </Button>
            <View style={styles.row}>
              <Text>I already have an account!</Text>
              <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.link}> Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background color to white
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    paddingHorizontal: 15, // Add padding to input fields
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  button: {
    marginTop: 24,
    padding: 8,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
