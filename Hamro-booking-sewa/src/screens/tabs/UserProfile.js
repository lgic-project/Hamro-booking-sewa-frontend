import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const UserProfile = () => {
    return(
      <View style={{flex: 1}}>
        <Text>Hello World</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    // flex:1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
});

export default UserProfile;