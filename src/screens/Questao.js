import React, { Component } from 'react';
import {View, Text} from 'react-native';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoProximo from '../components/BotaoProximo';
import styles from '../styles/estilos';
import InputTexto from '../components/InputTexto';
import BotaoMaisAlternativas from '../components/BotaoMaisAlternativas';
import Aviso from '../components/Aviso';
import { ScrollView } from 'react-native-gesture-handler';

export default class Questao extends Component {
  
  static navigationOptions = {
    title: 'Elaboração da Questão',
  };

  constructor(props) {
    super(props);
    this.state = {
      alternativas:[],
      pergunta: "",
      erroPergunta: ""
    };
  }

  render() {
    const {
      alternativas,
      pergunta,
      erroPergunta,
    } = this.state

    return (
      <View style={styles.container}>

        <View styles={[{alignSelf:"auto"}, {marginBottom: 5}]}>
          <Text style={[styles.title2, {color:"#7500CF"}]}>
            Digite sua pergunta e as alternativas
          </Text>
          <InputTexto
            error={!!erroPergunta}
            label="Pergunta"
            onChangeText={value => this.handleTitle(value)}
            value={this.state.pergunta}
          />

        </View>
        {!!erroPergunta && <Aviso texto={erroPergunta} />}
        <ScrollView>
          {
            this.state.alternativas.map((alternativa,index) => {
              currentValue = index + 1;
              return (
                <View>  
                  <InputTexto 
                    flex={3}
                    key={index} 
                    label={"Alternativa " + currentValue }
                    value={alternativa}
                    onChangeText={text => this.handleChange(text, index)}
                  />
                  {!!erroPergunta && <Aviso texto={erroPergunta} />}
                </View>
              );
            })
          }
          <BotaoMaisAlternativas
              onPress={() => this.addAlternativa()} 
          />
        </ScrollView>

        <View style={styles.flowButtonsContainer}>
          <BotaoAnterior
            endereco='SalaContexto'
            navigation={this.props.navigation}
            style={styles.icon}
          />
          <BotaoProximo
            endereco='QuestaoContexto'
            navigation={this.props.navigation}
            style={styles.icon}
            onPress={() => {this.validate()}}
          />
        </View>

      </View>
    )
  }
  
  validate = () => {
    if(!this.state.pergunta) 
      return this.setState({erroPergunta: 'Você não perguntou nada.'})
    else 
      return this.props.navigation.navigate('QuestaoContexto')
  }

  handleTitle = (value) => {
    this.setState({erroPergunta: ""});
    this.setState({pergunta: value})
  }

  addAlternativa(){
    this.setState({alternativas: [...this.state.alternativas, ""]})
  }

  handleChange(text, index){
    this.state.alternativas[index] = text.value
    
    //set the changed state...
    this.setState({alternativas: this.state.alternativas})
  }
  
}