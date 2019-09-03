import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Aviso = ({ texto }) => {
  return(
    <View style={styles.container}>
      <Icon style={styles.icon} 
        name="md-warning" size={20} 
        color="red" 
      />
      <Text style={styles.text}>{texto}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    
  },
  text: {
    color: "red",
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default Aviso;

Aviso.propTypes = {
  texto: PropTypes.string
}

Aviso.defaultPropTypes = {
  texto: ""
}