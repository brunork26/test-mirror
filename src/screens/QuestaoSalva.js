import React, { Component } from 'react';  
import { View, FlatList, StyleSheet, Text } from 'react-native';
import BotaoProximo from '../components/BotaoProximo';
import BotaoAnterior from '../components/BotaoAnterior';
import styles from '../styles/estilos';
import BotaoMedio from '../components/BotaoMedio';

export default class QuestaoSalva extends Component {  

  constructor(props){
    super(props);
    this.state = {
      data: [
        {
          id : 1,
          titulo : "Qual a melhor maneira de limpar o teclado?"
        },
        {
          id : 2,
          titulo : "Quando é a hora correta de fornecer feedback a um colega de trabalho?"
        },
        {
          id : 3,
          titulo : "O que é mais importante para você na hora de decidir onde almoçar?"
        },
        {
          id : 4,
          titulo : "Se você tivesse que escolher, preferiria ser policial de shopping, ou guarda de prisão?"
        },
        {
          id : 5,
          titulo : "Com qual dos seguintes valores você se identifica mais?"
        },
        {
          id : 6,
          titulo : "Escolha uma sobremesa europeia clássica:"
        },
        {
          id : 7,
          titulo : "Qual o melhor dia útil de trabalho para você?"
        },
        {
          id : 8,
          titulo : "Por quê não existem comidas azuis?"
        }
      ],
    };
  }

  renderItem = ({ item, index }) => (
    <View style={custom.listItem}>
      <Text style={{color: '#727272'}}>
        <Text style={{color: '#00C551'}}>Questão {index+1}: </Text>
        {item.titulo}
      </Text>
    </View>
  );

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <Text style={custom.titulo}>Questão 1 adicionada!</Text>
          <BotaoMedio
            backgroundColor='#00E576'
            onPress={() => this.props.navigation.navigate('Questao')}
            texto='Adicionar mais questões'
          />

          <Text style={[custom.titulo, {fontSize: 16}]}>Questões já adicionadas ({data.length}):</Text>
        </View>
        
        <View style={{flex: 7}}>
          <FlatList
            contentContainerStyle={custom.list}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />

        </View>

        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior 
            endereco='QuestaoContexto' 
            navigation={this.props.navigation}
          />
          <BotaoProximo
            endereco='Convidados' 
            navigation={this.props.navigation} 
          />
        </View>
      </View>
    );
  }
}

const custom = StyleSheet.create({
  titulo: {
    alignSelf: 'center',
    color: '#8400C5',
    fontSize: 20,
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20
  },

  listItem: {
    marginTop: 20,
    paddingVertical: 5
  },
});