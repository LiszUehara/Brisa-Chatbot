import { useState } from 'react';


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import axios from 'axios';
import { Card, Colors } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import React = require('react');
import RNFetchBlob from 'rn-fetch-blob';
import PushNotification from 'react-native-push-notification';
import { COLORS } from '../utils/C';
import Share from 'react-native-share';
import Snackbar from 'react-native-snackbar';
import OpenAnything from 'react-native-openanything';
import FileViewer from 'react-native-file-viewer';
import DocumentPicker from 'react-native-document-picker';
const BoletoSucesso = ({ route }) => {
  const { boletoData } = route.params;

  const [scale] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const colorNow = boletoData.ies_status === 'ABERTO' ? COLORS.lightRed: COLORS.lighGreen;
  const iconNow =  boletoData.ies_status === 'ABERTO' ? "exclamation-triangle" : "check"

  const OpenDownloadedFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
    //  Alert.alert('Arquivo selecionado', `URI do arquivo: ${result.uri}`);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // A escolha do arquivo foi cancelada pelo usuário
        Alert.alert('Ação cancelada');
      } else {
        // Algum erro ocorreu durante a seleção do arquivo
        Alert.alert('Erro ao escolher arquivo', error.message);
      }
    }
  };
  
  const copiarTexto = () => {
    Clipboard.setString(boletoData.cod_boleto);
    exibirSnackbar();
  };

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
    //console.log('Caminho do arquivo:', downloadPath);
    //enviarNotificacao();
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);

    }
  };

  const baixarBoleto = async () => {
    try {
      const { config, fs } = RNFetchBlob;
      const response = await config({
        fileCache: true,
      }).fetch('GET', boletoData.url);


      const filePath = response.path();
      const downloadDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
      const downloadPath = `${downloadDir}/boleto_sefin.pdf`;
      await fs.mv(filePath, downloadPath);
      Snackbar.show({
        text: 'Boleto baixado com sucesso em Downloads ...',
        backgroundColor: COLORS.lighGreen,
        duration: Snackbar.LENGTH_SHORT,
      });

      if(Platform.OS ==='ios'){
        RNFetchBlob.ios.openDocument(downloadPath);
      }else{
      const android = RNFetchBlob.android;
      android.actionViewIntent(downloadPath, 'application/pdf');
      }
    } catch (error) {
      Snackbar.show({
        text: 'Não foi possivel baixar o boleto',
        backgroundColor: COLORS.lightRed,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
  

  const exibirSnackbar = () => {
    Snackbar.show({
      text: 'Texto copiado para a área de transferência ✅',
      backgroundColor: COLORS.lighGreen,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const enviarNotificacao = () => {
    PushNotification.localNotification({
      title: 'Boleto Baixado',
      message: 'Seu boleto foi baixado com sucesso!',
      channelId: 'Downloads',
      userInfo: {},
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={styles.textHeader}>Meu(s) boleto(s)</Text>
        <Card containerStyle={styles.card}>

          <Text style={styles.title}>Detalhes do Boleto</Text>
          <View style={{ borderBottomColor: '#3e3e3e3e', borderBottomWidth: 1, marginBottom: 10 }} />

          <View style={styles.cardHeader}>
            <MaterialIcon name="receipt" size={18} color={COLORS.blue} />
            <Text style={styles.cardText}>
              Código do Boleto:
            </Text>
            <Text> {boletoData.cod_boleto} </Text>

            <TouchableOpacity onPress={copiarTexto}>
                  <Icon name="clipboard" size={16}/>
      </TouchableOpacity>

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
          <Card containerStyle={{backgroundColor:colorNow,borderRadius:30,padding:10,width:'30%' }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name={iconNow} size={18} color={"#FFF"} />
              <Text style={{ color: '#FFF' }}> {boletoData.ies_status}</Text>
            </View>
          </Card>

        </Card>

        <View style={{alignSelf:'stretch',width:'100%'}}>
          <Card containerStyle={{backgroundColor:"#FFF",borderRadius:10}}>

              <TouchableOpacity onPress={baixarBoleto}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='download' size={24} color={COLORS.blue} />
              <Text style={{color:COLORS.blue, fontWeight:'500', fontSize:18, marginStart:10}}>Baixar boleto</Text>
            </View>
              </TouchableOpacity>
          </Card>
        </View>
        <View style={{alignSelf:'stretch',width:'100%'}}>
          <Card containerStyle={{backgroundColor:"#FFF",borderRadius:10}}>

              <TouchableOpacity onPress={sharePDF}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name='share' size={24} color={COLORS.blue} />
              <Text style={{color:COLORS.blue, fontWeight:'500', fontSize:18, marginStart:10}}>Compartilhar boleto</Text>
            </View>
              </TouchableOpacity>
          </Card>
        </View>

      </Animated.View>

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
    paddingBottom:5 
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
    width: "100%"
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: "#000000"
  },
});

export default BoletoSucesso;
