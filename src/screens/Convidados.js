import React, { Component } from 'react';
import { Button, View, Text, Alert, StyleSheet, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../styles/estilos';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificacaoHeader from '../components/NotificacaoHeader';
import InputTexto from '../components/InputTexto';
import BotaoProximo from '../components/BotaoProximo';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoCheck from '../components/BotaoCheck';

export default class Convidados extends Component {
  //TODO SUBMIT: salvar no firebase os membros vinculados à sala criada

  constructor(props) {
    super(props);
    this.state = {
      convidados: [
        { cpf : "123.456.789-00", nome : "Alessandra Dutra" }, 
        { cpf : "987.654.321-00", nome : "Antônio Vidal" }, 
        { cpf : "135.792.468-00", nome : "Bianca Camargo" }, 
        { cpf : "246.813.579-00", nome : "Carolina Fração" }, 
        { cpf : "975.318.642-00", nome : "Daniela Amaral" }, 
        { cpf : "864.297.531-00", nome : "Frederico Iepsen" }, 
        { cpf : "192.837.465-00", nome : "Ícaro Espadim" }, 
        { cpf : "112.233.445-00", nome : "JM Fantin" }, 
        { cpf : "998.877.665-00", nome : "Leonardo Pasqualotto" }, 
        { cpf : "333.666.999-00", nome : "Leonardo Vizzotto" }, 
        { cpf : "222.444.888-00", nome : "Mathias Elbern" }, 
        { cpf : "777.444.333-00", nome : "Pedro Ortiz" }
      ],
      pesquisa: null
    }
  }

  static navigationOptions = {
    //TODO PUXAR O TITULO DA SALA
    title: 'Sala: Titulo',
  };

  handleSearch = (value) => {
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

  handleSubmit = () => { }

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
    const { convidados, pesquisa } = this.state;
    return (
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
              <TouchableOpacity onPress={() => this.handleOnPress(index)} style={{ marginLeft: 30, marginBottom: 20 }}>
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
          />
        </View>

      </View>
    );
  }
}