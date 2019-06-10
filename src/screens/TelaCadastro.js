import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity,Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import InputTexto from '../components/InputTexto';
import styles from '../styles/estilos';
import DateInput from '../components/DateInput';
import InputEmail from '../components/InputEmail';
import InputSenha from '../components/InputSenha';
import BotaoAnterior from '../components/BotaoAnterior';
import BotaoGrande from '../components/BotaoGrande';

export default class TelaCadastro extends Component{
    constructor(props) {
        super(props) 
        this.state = {
          salas: {},
          email: '',
          senha: ''
        }      
    }

    static navigationOptions = {
        title: 'Registrar',
    };

    handleCadastro = () => {
        const { email, senha } = this.state}

    render(){
        return(
        <KeyboardAvoidingView behavior={"padding"} style={styles.container} enabled number="2" >   
            <View style={{flex: 1} [styles.flowButtonsContainer, { marginTop: 5 }]}>
                <BotaoAnterior 
                    
                    endereco='Login' 
                     navigation={this.props.navigation} 
                />
                <InputTexto
                     label= "Nome"/>
                <InputEmail 
                    autoCorrect={false} 
                    keyboardType='email-address'
                    returnKeyType="next"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email} 
                    placeholder='E-mail' />
                    <InputTexto
                    label= "CPF"/>
            </View>
                <View style={{flex: 2, backgroundColor: 'white'} }>
                    <DateInput
                        titulo="Data de nascimento"
                    />
                    <InputSenha
                        autoCorrect={false} 
                        returnKeyType="go" 
                        ref={(input)=> this.passwordInput = input} 
                        placeholder='Senha'
                        onChangeText={senha => this.setState({ senha })}
                        value={this.state.senha}
                    />
                    <BotaoGrande
                        texto="Confirmar"
                        onPress={() => this.handleCadastro()}
                        endereco='Login' 
                        navigation={this.props.navigation} 
                    />
            </View>
    </KeyboardAvoidingView>      
        )
    }
}