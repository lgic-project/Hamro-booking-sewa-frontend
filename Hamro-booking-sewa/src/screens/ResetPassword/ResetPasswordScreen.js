import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
import Server from '../../Server/Server';

const apiUrl = Server.primaryUrl;

export default function App() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: `${apiUrl}/password/reset` }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});