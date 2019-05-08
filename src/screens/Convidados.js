import React, { Component } from 'react';
import { ActivityIndicator, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../config';
import styles from '../styles/estilos';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificacaoHeader from '../components/NotificacaoHeader';
import InputTexto from '../components/InputTexto';
import BotaoProximo from '../components/BotaoProximo';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoCheck from '../components/BotaoCheck';

export default class Convidados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sala: {},
      documento: null,
      informacoes: "",
      questoes: [],
      convidados: [
        { cpf : "123.456.789-00", nome : "Alessandra Dutra", email: 'a@gmail.com', incluido: false }, 
        { cpf : "987.654.321-00", nome : "Antônio Vidal", email: 'b@gmail.com', incluido: false }, 
        { cpf : "135.792.468-00", nome : "Bianca Camargo", email: 'c@gmail.com', incluido: false }, 
        { cpf : "246.813.579-00", nome : "Carolina Fração", email: 'd@gmail.com', incluido: false }, 
        { cpf : "975.318.642-00", nome : "Daniela Amaral", email: 'e@gmail.com', incluido: false }, 
        { cpf : "864.297.531-00", nome : "Frederico Iepsen", email: 'f@gmail.com', incluido: false }, 
        { cpf : "192.837.465-00", nome : "Ícaro Espadim", email: 'g@gmail.com', incluido: false }, 
        { cpf : "112.233.445-00", nome : "JM Fantin", email: 'h@gmail.com', incluido: false }, 
        { cpf : "998.877.665-00", nome : "Leonardo Pasqualotto", email: 'i@gmail.com', incluido: false }, 
        { cpf : "333.666.999-00", nome : "Leonardo Vizzotto", email: 'j@gmail.com', incluido: false }, 
        { cpf : "222.444.888-00", nome : "Mathias Elbern", email: 'k@gmail.com', incluido: false }, 
        { cpf : "777.444.333-00", nome : "Pedro Ortiz", email: 'l@gmail.com', incluido: false }
      ],
      pesquisa: null,
      value: '',
      sending: false
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Sala: ${navigation.state.params.sala.titulo}`,
    headerLeft: null
  });

  componentWillMount() {
    const  sala = this.props.navigation.getParam('sala', null);
    const documento = this.props.navigation.getParam('documento', null);
    const informacoes = this.props.navigation.getParam('informacoes', null);
    let  questoes = this.props.navigation.getParam('questoes', null);
    questoes.pop(questoes[questoes.length-1]);
    if(sala)
      this.setState({sala});
    if(documento)
      this.setState({documento});
    if(informacoes)
      this.setState({informacoes});
    if(questoes)
      this.setState({questoes});
  }

  handleSearch = (value) => {
    this.setState({value});
    let items;
    if(value) {
      const encontrados = this.state.convidados.filter(item => {
        if(item.cpf && item.email) {
          items = 
          `${item.nome.toUpperCase()}
            ${item.cpf.toUpperCase()}
            ${item.email.toUpperCase()}
            ${item.incluido}`;
        } else if(item.cpf) {
          items = 
          `${item.nome.toUpperCase()}
            ${item.cpf.toUpperCase()}
            ${item.incluido}`;
        } else if(item.email) {
          items = 
          `${item.nome.toUpperCase()}
            ${item.email.toUpperCase()}
            ${item.incluido}`;
        }

        const text = value.toUpperCase();
          
        return items.indexOf(text) > -1;    
      });    
      this.setState({ pesquisa: encontrados });
    } else {
      this.setState({ pesquisa: null });
    }
  }

  sendData = async () => {
    this.setState({sending: true});
    let {
      sala,
      documento,
      informacoes,
      questoes,
    } = this.state;
    let salaCompleta;
    if (questoes)
      salaCompleta = Object.assign(sala, {'questoes': questoes});
    if (informacoes)
      salaCompleta = Object.assign(sala, {'informacoes': informacoes});
    if (documento)
      salaCompleta = Object.assign(sala, {'documento': documento});
    if (salaCompleta)
      this.setState({sala: salaCompleta});

    const response = await 
    db.ref('salas/').push({
      ...sala
    }).then(()=>{
        return true;
    }).catch((error)=>{
        console.log('error ' , error);
        return false;
    })
    return response;
}

  handleSubmit = async () => {
    let { convidados, sala, documento, questoes, informacoes } = this.state;
    let votantes = [];
    convidados.map(item => {
      if(item.incluido ) {
        votantes.push(item);
      }
    });
    if (votantes)
      sala = Object.assign(sala, {'votantes':votantes});
    if(sala) {
      this.setState({sala});
    }
    const sent = await this.sendData();
    if(sent) {
      this.setState({sending: false});
      this.props.navigation.navigate('Inicio', {
        sala: sala,
        documento: documento,
        informacoes: informacoes,
        questoes: questoes
      })
    }
    this.setState({sending: false});
  }

  handleOnPress = (index) => {
    const { pesquisa, convidados } = this.state;
    convidadosAtualizados = convidados;

    if(pesquisa) {
      convidadosAtualizados.map(item => {
        if(item.cpf == pesquisa[index].cpf 
          || item.email == pesquisa[index].email) {
          item.incluido 
            ? item.incluido = false
            : item.incluido = true;
        }
      });
    } else {
      convidadosAtualizados[index].incluido 
        ? convidadosAtualizados[index].incluido = false
        : convidadosAtualizados[index].incluido = true;
    }

    this.setState ({
      convidados: convidadosAtualizados
    });
  }

  render() {
    const { convidados, pesquisa, value, sending } = this.state;
    return (
      sending ?
      <View>
        <Text style={{ 
          alignSelf: 'center',
          color: '#8400C5',
          fontSize: 20,
          fontWeight: 'bold'
        }}>
          Salvando a sala...
        </Text>
        <ActivityIndicator
          animating={sending}
          size="large"
          color="#00DC7B"
        />
      </View>:
      <View style={styles.container}>

        <View style={[{alignSelf:"auto"}, {marginBottom: 5}]}>
          <Text style={styles.title2}>Adicionar votantes</Text>
          <NotificacaoHeader
            texto="Votantes já adicionados: 0"
          />
        </View>
          
        <View style={{alignSelf:"auto"}}>
          <InputTexto 
            label="Pesquisar por CPF, Nome ou Email"
            onChangeText={value => this.handleSearch(value)}
            value={value}
          />
          <Icon
            style={{ alignSelf: 'flex-end', marginTop: -33}}
            name="md-search"
            size={20}
            color='#9d9c9d' 
          />
        </View>

        <ScrollView style={[{alignSelf: 'auto'}, {marginTop: 5}]}>
          <FlatList
            style={{ marginTop: 20 }}
            data={pesquisa || convidados}
            numColumns={1}
            renderItem={({ item, index }) => (
              <TouchableOpacity 
                onPress={() => this.handleOnPress(index)}
                style={{ marginLeft: 30, marginBottom: 20 }}
              >
                <Text>{item.nome} </Text>
                <Text style={{ color: '#9b9b9b', fontSize: 14 }}>CPF: {item.cpf} </Text>
                <BotaoCheck pressed={item.incluido} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>

        <View style={[styles.flowButtonsContainer, {alignSelf: "auto"}, {marginTop: 5}]}>
          <BotaoAnterior
            endereco='QuestaoSalva'
            navigation={this.props.navigation}
          />
          <BotaoProximo 
            endereco='Inicio'
            navigation={this.props.navigation}
            onPress={() => this.handleSubmit()}
          />
        </View>

      </View>
    );
  }
}