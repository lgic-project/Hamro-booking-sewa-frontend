import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome.</Header>
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
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next
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
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})