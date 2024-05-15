import {View, Text} from 'react-native';

const UserProfile = () => {
    return(
        <View style={StyleSheet.container}>
            <Text>User Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default UserProfile;