import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Logout = ({ visible }) => {
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.navigate("MenuScreen");
  };

  const handleLogout = () => {
    // console.log('Logout Pending');
    navigation.navigate('LoginScreen');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.title}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    width: '80%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  confirmButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Logout;
