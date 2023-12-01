import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/C';
import Icon from 'react-native-vector-icons/FontAwesome6';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.push('Main'); 
    }, 2000); 

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sefin</Text>
      <Icon name="building-user" size={18} color={COLORS.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue, 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fffffff',
  },
});

export default SplashScreen;
