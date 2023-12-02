import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/FontAwesome';

const Item = ({ title, description, color, onPress, icon }) => (
  <TouchableOpacity style={[styles.item]} onPress={onPress}>
    <LinearGradient
      colors={color}
      style={styles.gradient}
    >
      <View style={styles.row}>
        <View style={[styles.column, styles.leftColumn]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={[styles.rightColumn, styles.rightColumn]}>
          <Icon name={icon} size={32} color={"#FFFFFF"} />
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    elevation: 10,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  column: {
    flex: 1,
    justifyContent: 'center',
  },
  leftColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightColumn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    margin: 5,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 10,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
    }),
  },
  gradient: {
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Item;
