import React, { Component } from 'react';  
import { View, Text } from 'react-native';
import { DocumentPicker } from 'expo';
import { app } from '../config';

import BotaoAnterior from '../components/BotaoAnterior';
import BotaoEnvioArquivo from '../components/BotaoEnvioArquivo'
import BotaoProximo from '../components/BotaoProximo';
import NoticacaoHeader from '../components/NotificacaoHeader';
import InputTexto from '../components/InputTexto';
import styles from '../styles/estilos';
import sala from '../styles/sala';

export default class SalaContexto extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      informacoes: "",
      erro: "",
      document: null,
      loading: null,
      loaded: null
    };
  }
  static navigationOptions = {
    title: 'Criar Sala',
  };

  handleFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
      if (!result.cancelled) {
        this.upload(result.uri, result.name)
          .then(() => 
          {
            if (result.uri)
              this.setState({ document: result.uri, loading: false, loaded: true });
          })
          .catch((error) => {
            alert('Falha no upload, verifique a conexão.\n erro:', error);
          });
      }
  }

  urlToBlob = (uri) => {
    //reference: https://github.com/expo/expo/issues/2402
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed')); // error occurred, rejecting
      };
      xhr.responseType = 'blob'; // use BlobModule's UriHandler
      xhr.open('GET', uri, true); // fetch the blob from uri in async mode
      xhr.send(); // no initial data
    });
  }

  upload = async (uri, name) => {
    if(uri) {
      this.setState({loading: true, loaded: false});
      const blob = await this.urlToBlob(uri);
      const ref = app.storage().ref().child('sala/pdfs/'+name);
      const snap = await ref.put(blob);
      const remoteUri = await snap.ref.getDownloadURL();

      blob.close();
      return remoteUri;
    }
    return null;
  }

  handleInfo = (value) => {
    this.setState({informacoes: value});
  }

  handleSubmit = () => {
    //código
  }

  render() {
    let { loading, loaded } = this.state;
    const { informacoes } = this.state;
    return (
      <View style={styles.container}>
        <View styles={styles.innerContainer}>
          <NoticacaoHeader texto="Passos: 2 de 2" />
          <Text style={[styles.title2, { marginTop: 20, marginBottom: 20 }]}>Informações que ficarão em destaque:</Text>
          
          <BotaoEnvioArquivo
            loaded={!!loaded}
            loading={!!loading}
            style={sala.button}
            texto="Anexar PDF"
            onPress={this.handleFile}
          />

          <InputTexto
            style={sala.input}
            label="Informações adicionais"
            multiline
            onChangeText={value => this.handleInfo(value)}
            value={informacoes}
          />
        </View>
        
        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior 
            endereco='Sala' 
            navigation={this.props.navigation} 
            style={styles.icon} 
          />
          <BotaoProximo
            onPress={this.handleSubmit()}
            endereco='Questao' 
            navigation={this.props.navigation} 
            style={styles.icon} 
          />
        </View>
      </View>
    );
  }
}
