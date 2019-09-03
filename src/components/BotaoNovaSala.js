import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BotaoNovaSala = ({ endereco, navigation }) => (
  <TouchableOpacity 
    onPress={() => navigation.navigate(endereco)}
  >
    <Icon style={styles.icon} 
      name="ios-add-circle" size={80} 
      color="#00C551" 
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
});

export default BotaoNovaSala;

BotaoNovaSala.propTypes = {
  endereco: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}