import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../svg/SeraFin.png')} style={styles.image} />
      <Text style={styles.title}>SeraFin</Text>
      <Text style={styles.description}>
        O objetivo principal do aplicativo é simplificar e facilitar o exercício de sua contribuição para o município de Juazeiro do Norte
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200, 
    resizeMode: 'cover',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
  },
});

export default AboutScreen;
