import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../utils/C';
import { retrieveData } from '../../repo/store/Dao';
import { useAtom } from 'jotai';
import {contribuinte} from '../../repo/atom'


const ProfileScreen = () => {

  const [contribuintes, setContribuintes] = useAtom(contribuinte);
  
  //console.log("os contribuintes sao",contribuintes)
  if(contribuintes){
    return (
      <View style={styles.container}>
  
        <View style={styles.profileHeader}>
          <Image
            source={require('../../svg/SeraFin.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{contribuintes.pes_nome}</Text>
          <View style={styles.locationSection}>
            <Icon name="map-marker" size={20} color="#ffff" />
            <Text style={styles.locationText}>{contribuintes.pes_cidade}, {contribuintes.pes_cep}</Text>
          </View>
        </View>
  
        <View style={styles.body}>
  
          {/* Seção de Contato */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contato</Text>
            <View style={styles.contactItem}>
              <Icon name="phone" size={32} color="#25D366" />
              <Text style={styles.contactText}>{contribuintes.pes_fone}</Text>
            </View>
  
            <View style={styles.contactItem}>
              <Icon name="envelope" size={32} color={COLORS.blue} />
              <Text style={styles.contactText}>{contribuintes.pes_email}</Text>
            </View>
          </View>
  
          <View style={styles.horizontalLine} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Adicionais</Text>
            <View style={styles.additionalInfoItem}>
              <Icon name="id-card" size={32} color={COLORS.blue} />
              <Text style={styles.contactText}>CPF/CPNJ: {contribuintes.chave_cpfcnpj}</Text>
            </View>
  
            <View style={styles.additionalInfoItem}>
              <Icon name="address-card" size={32} color={COLORS.blue} />
              <Text style={styles.contactText}>RG: {contribuintes.pes_rg}</Text>
            </View>
          </View>
  
          <View style={styles.horizontalLine} />
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Situação</Text>
            <View style={styles.additionalInfoItem}>
              <Icon name="user" size={32} color={COLORS.blue} />
              <Text style={styles.contactText}>Situação Cadastral: {contribuintes.ies_situacao}</Text>
            </View>
  
            <View style={styles.additionalInfoItem}>
              <Icon name="calendar" size={32} color={COLORS.blue} />
              <Text style={styles.contactText}>Data de Cadastro: {contribuintes.dat_cadastro}</Text>
            </View>
          </View>
  
        </View>
  
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  horizontalLine: {
    height: 1,  
    width: '75%',  
    backgroundColor: COLORS.lightGray,  
    alignSelf: 'center', 
    marginVertical: 10, 
  },
  body: {
    flex: 1,
    paddingTop: 16,
    paddingStart: 16,
    alignItems: 'flex-start'
  },

  profileHeader: {
    alignItems: 'center',
    padding: 20,
    
    backgroundColor: COLORS.black,
  },

  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 50,
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.white
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.blue,
    marginBottom: 10,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  additionalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ProfileScreen;
