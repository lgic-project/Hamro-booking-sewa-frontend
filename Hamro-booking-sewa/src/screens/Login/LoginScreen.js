import React, { useState, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Text, TextInput as PaperTextInput } from 'react-native-paper';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';
import { Feather } from '@expo/vector-icons';
import Server from '../../Server/Server';
import { UserContext } from '../UserContext/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const { setUser } = useContext(UserContext); // Use UserContext
  const apiUrl = Server.primaryUrl;

  useEffect(() => {
    fetch(`${apiUrl}/csrf-token`, {
      method: 'GET',
      credentials: 'include', // Include cookies if necessary
    })
      .then(response => response.json())
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

  const handleLogin = async () => {
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
      const response = await fetch(`${apiUrl}/login/mobile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      setLoading(false);

      console.log('Login Successful', data);
      Alert.alert('Login Successful', 'You have been logged in successfully');

      // Set user data in context
      setUser(data.user);

      // Check user category and navigate accordingly
      if (data.user.category === 'user') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else if (data.user.category === 'hotel') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Hotel-Dashboard' }],
        });
      } else if (data.user.category === 'superadmin') {
        Alert.alert('Login Failed', 'Cannot log in with superadmin account');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'Failed to login. Please check your credentials and try again.'
      );
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
          name={showPassword ? 'eye' : 'eye-off'}
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

      {email.error && <Text style={styles.error}>{email.error}</Text>}
      {password.error && <Text style={styles.error}>{password.error}</Text>}

      <Button mode="outlined" onPress={handleLogin} style={{ color: '#CBC3E3' }}>
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 200,
    height: 180,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 5,
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
