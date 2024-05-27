import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import BackButton from '../../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = ({navigation}) => {
  
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onToggleSwitch = () => setIsNotificationOn(!isNotificationOn);
  const onThemeSwitch = () => setIsDarkMode(!isDarkMode);

  return(
    <SafeAreaView>
      <BackButton goBack={navigation.goBack} />
    <View style={styles.container}>
          <View style={styles.theme}>
          <Text style={styles.label}>Enable Notifications</Text>
            <Switch value={isNotificationOn} onValueChange={onToggleSwitch} />
            </View>
            
            <View style={styles.theme}>
            <Text style={styles.label}>Theme Mode</Text>
            <Switch value={isDarkMode} onValueChange={onThemeSwitch} />
            </View>
            
        </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  label: {
    fontSize: 16,
  },
  theme: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  }
});

export default Settings;