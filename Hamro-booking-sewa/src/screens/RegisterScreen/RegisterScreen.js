import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Text, TextInput as PaperTextInput } from 'react-native-paper';
import Background from '../../components/Background';
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
  const [name, setNameName] = useState({ value: '', error: '' });
  const [category, setCategoryName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [phone_number, setPhoneNumber] = useState({ value: '', error: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [textInputValue, setTextInputValue] = useState('');

  const data = [
    { key: 0, label: 'Hotel', value: 'hotel' },
    { key: 1, label: 'User', value: 'user' },
  ];

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
    const categoryError = categoryNameValidator(category.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneNumberError = phoneNumberValidator(phone_number.value);
    if (emailError || passwordError || nameError || categoryError || phoneNumberError) {
      setNameName({ ...name, error: nameError });
      setCategoryName({ ...category, error: categoryError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhoneNumber({ ...phone_number, error: phoneNumberError });
      return;
    }

    const formData = {
      name: name.value,
      category: category.value,
      email: email.value,
      password: password.value,
      phone_number: phone_number.value,
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
    <Background>
      <BackButton goBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.container}>
        <Logo />
        <Header>Fill up your details</Header>
        <View style={styles.inputContainer}>
          <PaperTextInput
            label="Full Name"
            mode="outlined"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setNameName({ value: text, error: '' })}
            error={!!name.error}
            style={styles.input}
          />
          {name.error ? <Text style={styles.error}>{name.error}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          
          <ModalSelector
            data={data}
            initValue="Select a category"
            onChange={(option) => {
              setCategoryName({ value: option.value, error: '' });
              setTextInputValue(option.label);
            }}
            accessible={true}
            keyExtractor={(item) => item.key.toString()}
            labelExtractor={(item) => item.label}
          >
            <TouchableOpacity>
              <PaperTextInput
                mode="outlined"
                editable={false}
                placeholder="Select a category"
                value={textInputValue}
                style={styles.input}
              />
            </TouchableOpacity>
          </ModalSelector>
          {category.error ? <Text style={styles.error}>{category.error}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <PaperTextInput
            label="Email"
            mode="outlined"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            style={styles.input}
          />
          {email.error ? <Text style={styles.error}>{email.error}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <PaperTextInput
            label="Password"
            mode="outlined"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            secureTextEntry
            style={styles.input}
          />
          {password.error ? <Text style={styles.error}>{password.error}</Text> : null}
        </View>
        <View style={styles.inputContainer}>
          <PaperTextInput
            label="Phone Number"
            mode="outlined"
            returnKeyType="done"
            value={phone_number.value}
            onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
            error={!!phone_number.error}
            keyboardType="numeric"
            style={styles.input}
          />
          {phone_number.error ? <Text style={styles.error}>{phone_number.error}</Text> : null}
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
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: 'white',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
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
