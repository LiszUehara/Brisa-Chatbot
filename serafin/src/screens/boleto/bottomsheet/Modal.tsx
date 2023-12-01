import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { COLORS } from '../../../utils/C';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-elements';

const BottomSheet = ({ isVisible, onClose }) => {
  const [dragY, setDragY] = useState(new Animated.Value(0));

  const onGestureEvent = Animated.event([{ nativeEvent: { translateY: dragY } }], {
    useNativeDriver: false,
  });

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(dragY, {
        toValue: 0,
        velocity: 1,
        tension: 2,
        friction: 8,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: dragY }] }]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Meu(s) boleto(s)</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name={"close"} size={24} color={COLORS.blue} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={{paddingBottom:8}}>Significado e detalhes das tags:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center',width:'60%' }}>
              <Card containerStyle={{ backgroundColor: COLORS.lightRed, borderRadius: 30, padding: 10, width: 'relative' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name={'exclamation-triangle'} size={18} color={"#FFF"} />
                  <Text style={{ color: '#FFF', paddingStart: 8 }}>ABERTO</Text>
                </View>
              </Card>
              <Text>O boleto não foi pago, pode ser baixado pago.</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center',width:'60%'}}>
            <Card containerStyle={{ backgroundColor: COLORS.lighGreen, borderRadius: 30, padding: 10, width: 'relative' }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name={'check'} size={18} color={"#FFF"} />
                <Text style={{ color: '#FFF', paddingStart: 8 }}>PAGO</Text>
              </View>
            </Card>
              <Text style={{alignSelf:'center'}}>Pode ficar tranquilo, o boleto já foi pago e está tudo em dias!</Text>
            </View>


          </View>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '50%', // Ajuste conforme necessário
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.blue
  },
  closeButton: {
    color: 'blue',
  },
  content: {
    flex: 1,
  },
});

export default BottomSheet;
