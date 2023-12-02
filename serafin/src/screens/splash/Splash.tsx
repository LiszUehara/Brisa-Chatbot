import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/C';
import Icon from 'react-native-vector-icons/FontAwesome6';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.push('Main');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Secretaria de</Text>
      <Text style={styles.text}>Finanças</Text>
      <Text style={[styles.text, { fontSize: 14 }]}>Juazeiro do Norte</Text>
      <Icon style={{ paddingTop: 8 }} name="building-user" size={84} color={COLORS.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.blue,
  },
});

export default SplashScreen;
