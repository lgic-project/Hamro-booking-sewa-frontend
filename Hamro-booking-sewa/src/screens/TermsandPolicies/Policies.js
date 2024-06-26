import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native';
import BackButton from '../../components/BackButton';

const Policies = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Terms and Policies</Text>
          <Text style={styles.paragraph}>
            Welcome to Hamro Booking Sewa! These Terms and Policies govern your use of our mobile application ("App") and related services. By accessing or using our App, you agree to comply with these Terms and Policies. Please read them carefully before using our services.
          </Text>
          <Text style={styles.subHeading}>1. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing or using Hamro Booking Sewa, you agree to be bound by these Terms and Policies. If you do not agree with any part of these terms, you may not access or use our services.
          </Text>
          <Text style={styles.subHeading}>2. Registration</Text>
          <Text style={styles.paragraph}>
            Users and hotels are required to register an account to access certain features of Hamro Booking Sewa. By registering, you agree to provide accurate, current, and complete information about yourself or your hotel as prompted by the registration process. You are responsible for maintaining the confidentiality of your account and password.
          </Text>
          <Text style={styles.subHeading}>3. User Conduct</Text>
          <Text style={styles.paragraph}>
            Users agree to use Hamro Booking Sewa solely for lawful purposes and in accordance with these Terms and Policies. You agree not to:
            {"\n"}- Violate any applicable laws or regulations.
            {"\n"}- Infringe upon the rights of others.
            {"\n"}- Interfere with or disrupt the operation of the App.
            {"\n"}- Use the App in any manner that could harm, disable, overburden, or impair Hamro Booking Sewa.
          </Text>
          <Text style={styles.subHeading}>4. Hotel Accounts</Text>
          <Text style={styles.paragraph}>
            Hotels can create accounts on Hamro Booking Sewa to showcase their properties and manage room listings. By creating an account, hotels agree to provide accurate and up-to-date information about their properties.
          </Text>
          <Text style={styles.subHeading}>5. Room Listings</Text>
          <Text style={styles.paragraph}>
            Hotels can add, edit, or remove room listings as per their requirements. Hamro Booking Sewa reserves the right to review and moderate room listings to ensure compliance with our guidelines.
          </Text>
          <Text style={styles.subHeading}>6. User Bookings</Text>
          <Text style={styles.paragraph}>
            Users can browse hotel listings, book rooms, and manage their reservations through Hamro Booking Sewa. Users agree to provide accurate and truthful information when making reservations.
          </Text>
          <Text style={styles.subHeading}>7. Cancellations</Text>
          <Text style={styles.paragraph}>
            Users may cancel their bookings subject to the cancellation policies of the respective hotels. Hamro Booking Sewa is not responsible for any cancellation fees or penalties imposed by hotels.
          </Text>
          <Text style={styles.subHeading}>8. Privacy</Text>
          <Text style={styles.paragraph}>
            Your privacy is important to us. Please refer to our Privacy Policy to understand how we collect, use, and disclose your information.
          </Text>
          <Text style={styles.subHeading}>9. Intellectual Property</Text>
          <Text style={styles.paragraph}>
            All content, including but not limited to text, graphics, logos, images, and software, available on Hamro Booking Sewa is the property of Hamro Booking Sewa or its licensors and is protected by intellectual property laws.
          </Text>
          <Text style={styles.subHeading}>10. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            Hamro Booking Sewa shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the App.
          </Text>
          <Text style={styles.subHeading}>11. Changes to Terms and Policies</Text>
          <Text style={styles.paragraph}>
            Hamro Booking Sewa reserves the right to modify or revise these Terms and Policies at any time. Continued use of the App after any such changes shall constitute your consent to such changes.
          </Text>
          <Text style={styles.subHeading}>12. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have any questions or concerns about these Terms and Policies, please contact us at "hamrobookingsewa@gmail.com".
          </Text>
          <Text style={styles.paragraph}>
            By using Hamro Booking Sewa, you acknowledge that you have read, understood, and agree to be bound by these Terms and Policies. Thank you for choosing Hamro Booking Sewa!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 0,
    color: '#333333',
  },
  paragraph: {
    fontSize: 16,
    marginTop:10,
    marginBottom: 4,
    lineHeight: 24,
    color: '#666666',
    textAlign: 'justify',
  },
});

export default Policies;
