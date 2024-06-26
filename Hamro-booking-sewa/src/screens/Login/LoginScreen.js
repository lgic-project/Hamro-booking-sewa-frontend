import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Text, TextInput as PaperTextInput } from 'react-native-paper';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Server from '../../Server/Server';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const apiUrl = Server.primaryUrl;

  useEffect(() => {
    fetch(`${apiUrl}/csrf-token`, {
      method: 'GET',
      credentials: 'include', // Include cookies if necessary
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.csrfToken) {
          setCsrfToken(data.csrfToken);
        } else {
          throw new Error('CSRF token not found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const userData = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await fetch(`${apiUrl}/login-mob`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();

      setLoading(false);

      // Check if access_token exists
      if (!data.access_token) {
        throw new Error('Access token not found in response');
      }

      // Store the token securely using AsyncStorage
      await AsyncStorage.setItem('token', data.access_token);

      // Navigate to the Dashboard screen upon successful login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      // Handle login error, e.g., show error message
      setPassword({ ...password, error: 'Invalid email or password' });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <BackButton goBack={navigation.goBack} />
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/hyt.png')} style={styles.logo} />
      </View>
      <View style={styles.headerContainer}>
        <Header>Enter your login info</Header>
      </View>
      <View style={styles.inputContainer}>
        <PaperTextInput
          label="Email"
          returnKeyType="done"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          style={styles.input}
          theme={{ colors: { primary: theme.colors.primary } }}
        />
      </View>

      {/* Password field */}
      <View style={styles.inputContainer}>
        <PaperTextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          secureTextEntry={!showPassword}
          style={styles.input}
          theme={{ colors: { primary: theme.colors.primary } }}
        />
        <Feather
          name={showPassword ? "eye" : "eye-off"}
          size={20}
          color="black"
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        />
      </View>

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password ?</Text>
        </TouchableOpacity>
      </View>

      {/* Displaying error message */}
      {email.error && <Text style={styles.error}>{email.error}</Text>}
      {password.error && <Text style={styles.error}>{password.error}</Text>}

      <Button mode="outlined" onPress={onLoginPressed} style={{ color: "#CBC3E3" }}>
        {loading ? (
          <ActivityIndicator animating={true} color={theme.colors.primary} />
        ) : (
          'Log in'
        )}
      </Button>

      <View style={styles.row}>
        <Text>Don't have an account yet ?</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Create Now!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Set background color to white
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center', // Center the logo horizontally
    marginBottom: 5, // Add some margin at the bottom of the logo
  },
  logo: {
    width: 200,
    height: 180,
  },
  headerContainer: {
    alignItems: 'center', // Center the header horizontally
    marginBottom: 5, // Add some margin at the bottom of the header
  },
  inputContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'center',
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    marginBottom: 8,
    marginLeft: 8,
  },
});
