import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import UserProfile from './UserProfile';
import { Dialog, Portal, Text, Button, Modal, PaperProvider  } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Logout = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: '#CDC8C8', padding: 20};

  

  const handleYes = () =>{
    console.log("Yes pressed");
    hideModal();
}

const handleCancel = () =>{
    console.log("Cancel pressed");
    // hideDialog();
    // navigation.navigate(UserProfile);
}

  return (
    // <Portal>
    //   <Dialog visible={{showDialog}} onDismiss={hideDialog}>
    //     <Dialog.Title style={styles.title}>Are you sure you want to logout?</Dialog.Title>
    //     <Dialog.Actions>
    //       <Button onPress={handleYes}>Yes</Button>
    //       <Button onPress={handleCancel}>Cancel</Button>
    //     </Dialog.Actions>
    //   </Dialog>
    // </Portal>

    <PaperProvider>
      <Portal>
        <Modal visible={showModal} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text style={{fontSize:20, textAlign:'center', marginBottom:20}}>Are you sure you want to logout?</Text>
          <Button style={{marginBottom: 10}} mode="contained" onPress={handleYes}>Yes</Button>
          <Button style={{marginBottom: 10}} mode="contained" onPress={handleCancel}>No</Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
})

export default Logout;



// import { View, Text, Alert } from "react-native";
// import StartScreen from "../StartScreen";
// import { TouchableOpacity } from "react-native";



// export default function Logout(){
//     return(
//     <View style={{flex:1 }}>
//         <Alert>Are you sure y</Alert>
//     </View>
//     );
// };