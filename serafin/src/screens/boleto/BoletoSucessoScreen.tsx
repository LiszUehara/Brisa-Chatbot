import { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import React = require('react');
import RNFetchBlob from 'rn-fetch-blob';
import PushNotification from 'react-native-push-notification';
import { COLORS } from '../../utils/C';
import Share from 'react-native-share';
import Snackbar from 'react-native-snackbar';
import BottomSheet from '../boleto/bottomsheet/Modal';

const BoletoSucesso = ({ route }) => {
  const { boletoData } = route.params;
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [scale] = useState(new Animated.Value(0));

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const colorNow = boletoData.ies_status === 'ABERTO' ? COLORS.lightRed : COLORS.lighGreen;
  const iconNow = boletoData.ies_status === 'ABERTO' ? "exclamation-triangle" : "check"

  const sharePDF = async () => {
    try {
      const { config, fs } = RNFetchBlob;
      const response = await config({
        fileCache: true,
      }).fetch('GET', boletoData.url);
      const filePath = response.path();
      const downloadDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
      const downloadPath = `${downloadDir}/boleto_sefin.pdf`;
      await fs.mv(filePath, downloadPath);
      try {
        const options = {
          title: 'Compartilhar PDF',
          url: `file://${downloadPath}`,
          type: 'application/pdf',
        };
        await Share.open(options);
      } catch (error) {
        Snackbar.show({
          text: 'Compartilhamento cancelado',
          backgroundColor: COLORS.lightRed,
          duration: Snackbar.LENGTH_SHORT,
        })
      }

    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);

    }
  };

  const baixarBoleto = async () => {
    console.log(" a url do boleto é:", boletoData.url)
    try {
      const { config, fs } = RNFetchBlob;
      const response = await config({ fileCache: true }).fetch('GET', boletoData.url);

      const filePath = response.path();
      if (!await RNFetchBlob.fs.exists(filePath)) {
        console.error('O arquivo não foi baixado corretamente.');
        return;
      }

      const downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
      const downloadPath = `${downloadDir}/boleto_sefin.pdf`;

      if (await RNFetchBlob.fs.exists(downloadPath)) {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(downloadPath);
        } else {
          const android = RNFetchBlob.android;
          android.actionViewIntent(downloadPath, 'application/pdf');
        }
        return;
      }

      await RNFetchBlob.fs.cp(filePath, downloadPath);
      await RNFetchBlob.fs.unlink(filePath);

      Snackbar.show({
        text: 'Boleto baixado com sucesso em Downloads ...',
        backgroundColor: COLORS.lighGreen,
        duration: Snackbar.LENGTH_SHORT,
      });

      if (Platform.OS === 'ios') {
        RNFetchBlob.ios.openDocument(downloadPath);
      } else {
        const android = RNFetchBlob.android;
        android.actionViewIntent(downloadPath, 'application/pdf');
      }
    } catch (error) {
      console.error('Erro ao baixar o boleto:', error);
      Snackbar.show({
        text: 'Não foi possível baixar o boleto',
        backgroundColor: COLORS.lightRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={styles.textHeader}>Meu(s) boleto(s)</Text>
        <Card containerStyle={styles.card}>

          <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Detalhes do Boleto</Text>
            <TouchableOpacity onPress={openBottomSheet}>
              <Icon name="info-circle" size={24} />
            </TouchableOpacity>
          </View>
          <View style={{ borderBottomColor: '#3e3e3e3e', borderBottomWidth: 1, marginBottom: 10 }} />

          <View style={styles.cardHeader}>
            <MaterialIcon name="receipt" size={18} color={COLORS.blue} />
            <Text style={styles.cardText}>
              Código do Boleto:
            </Text>
            <Text> {boletoData.cod_boleto} </Text>



          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardRowBasic}>

              <View style={styles.cardColumn}>
                <View style={styles.cardRow}>
                  <MaterialIcon name="people" size={18} color={COLORS.blue} />
                  <Text style={styles.cardText}>Nome</Text>
                </View>
                <Text>{boletoData.nome}</Text>
              </View>

              <View style={styles.cardColumn}>
                <View style={styles.cardRow}>
                  <Icon name="calendar" size={18} color={COLORS.blue} />
                  <Text style={styles.cardText}>Vencimento</Text>
                </View>
                <Text>{boletoData.dat_vencimento}</Text>
              </View>

            </View>
            <View style={styles.cardRowBasic}>
              <View style={styles.cardColumn}>
                <View style={styles.cardRow}>
                  <Icon name="dollar" size={18} color={COLORS.blue} />
                  <Text style={styles.cardText}>
                    Valor
                  </Text>
                </View>
                <Text>R$ {boletoData.val_boleto}</Text>
              </View>
              <View style={styles.cardColumn}>
                <View style={styles.cardRow}>
                  <Icon name="money" size={18} color={COLORS.blue} />
                  <Text style={styles.cardText}>
                    Taxas
                  </Text>
                </View>
                <Text>R$ {boletoData.val_taxa}</Text>
              </View>
            </View>
          </View>
          <Card containerStyle={{ backgroundColor: colorNow, borderRadius: 30, padding: 10, width: '30%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name={iconNow} size={18} color={"#FFF"} />
              <Text style={{ color: '#FFF' }}> {boletoData.ies_status}</Text>
            </View>
          </Card>

        </Card>

        <View style={{ alignSelf: 'stretch', width: '100%' }}>
          <Card containerStyle={{ backgroundColor: "#FFF", borderRadius: 10 }}>

            <TouchableOpacity onPress={baixarBoleto}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name='download' size={24} color={COLORS.blue} />
                <Text style={{ color: COLORS.blue, fontWeight: '500', fontSize: 18, marginStart: 10 }}>Baixar boleto</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
        <View style={{ alignSelf: 'stretch', width: '100%' }}>
          <Card containerStyle={{ backgroundColor: "#FFF", borderRadius: 10 }}>

            <TouchableOpacity onPress={sharePDF}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name='share' size={24} color={COLORS.blue} />
                <Text style={{ color: COLORS.blue, fontWeight: '500', fontSize: 18, marginStart: 10 }}>Compartilhar boleto</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

      </Animated.View>

      <BottomSheet isVisible={bottomSheetVisible} onClose={closeBottomSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
    color: "#000000",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#FFFFFFFF",
    padding: 10,
  },
  cardSucess: {
    borderRadius: 30,
    //backgroundColor: COLORS.lighGreen,
    padding: 10,
    width: "30%",
  },
  cardHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  cardBody: {
    flexDirection: 'column',
  },
  cardRow: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: COLORS.lighGreen,
  },
  cardRowBasic: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  cardColumn: {
    flex: 1, //  essa linha para dividir em duas colunas
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 5,
    color: "#000000",
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: "#000000"
  },
});

export default BoletoSucesso;
