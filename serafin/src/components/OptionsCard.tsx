import React, { useState, useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const OptionsCard = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Card containerStyle={{ borderRadius: 30 }}>
        <Text>{text}</Text>
      </Card>
    </Pressable>
  );
};

export default OptionsCard;
