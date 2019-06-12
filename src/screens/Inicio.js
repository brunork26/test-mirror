import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, FlatList, AsyncStorage } from 'react-native';
import { db } from '../config';
let salasRef = db.ref('salas/');
import BotaoNovaSala from '../components/BotaoNovaSala';
import styles from '../styles/estilos';
import SemSalas from '../containers/SemSalas';
import CardSalaVotacao from '../components/CardSalaVotacao';
import Barra from '../components/Barra';
import BotaoAlternativa from '../components/BotaoAlternativa';
import moment from 'moment';
import AuthService from '../shared/AuthService';

moment.defineLocale('pt-br', {
  months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
  weekdays: 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
  weekdaysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
  weekdaysMin: 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY [às] HH:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
  },
  calendar: {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    nextWeek: 'dddd [às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek: function () {
      return (this.day() === 0 || this.day() === 6) ?
        '[Último] dddd [às] LT' : // Saturday + Sunday
        '[Última] dddd [às] LT'; // Monday - Friday
    },
    sameElse: 'L'
  },
  relativeTime: {
    future: 'em %s',
    past: 'há %s',
    s: 'poucos segundos',
    ss: '%d segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: '%dº'
});


export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salas: []
    }
  }
  static navigationOptions = {
    title: 'Votações disponíveis',
  };


  componentWillMount() {
    salasRef.orderByChild("uid").on('value', snapshot => {
      let salas = snapshot.val();
      AsyncStorage.getItem('@UID').then(uid => {
        if (salas != null) {
          salas = Object.values(salas);
          salas = salas.filter(sala => {
            if(sala.votantes){
              return [...sala.votantes].filter(v => v.uid === uid).length;
            }
          });
          this.setState(() => ({
            salas, uid
          }))
        }
      },
      error => console.log('EEERROOOOU', error));
    });
  }

  getStatus = (dataFinal, dataInicial, horaFinal, horaInicial, informacaoExtra) => {
    // fazer cálculo para retornar se está em andamento, encerrada ou se vai iniciar;

    this.testFunc();

    let firstMoment = moment(`${dataInicial} ${horaInicial}`, 'DD/MM/YYYY HH:mm');
    let finalMoment = moment(`${dataFinal} ${horaFinal}`, 'DD/MM/YYYY HH:mm');
    let nowMoment = moment();

    if (firstMoment.diff(nowMoment) > 0) {

      return informacaoExtra ? `Disponível ${firstMoment.fromNow()}` : 'agendada';
    }

    if (finalMoment.diff(nowMoment) >= 0) {
      return informacaoExtra ? `Encerra ${finalMoment.fromNow()}` : 'andamento';
    }
    //console.log('enc');
    return informacaoExtra ? finalMoment.format('DD/MM/YYYY HH:mm') : 'encerrada';
  }


  handleVisualizar = (item) => {
    const { uid } = this.state
    if (item){
      if(uid && item.adm_uid === uid){
        return this.props.navigation.navigate('Andamento', { 'sala': item });
      }
      this.props.navigation.navigate('Votacao', { 'sala': item });
    } else {
      this.props.navigation.navigate('Votacao', { 'sala': 'Não disponível' });
    }
  }

  handleSelect = selected => {
    this.setState({ selected });
  }

  testFunc = async () => {
    // let res = await AsyncStorage.getItem('@UID');

  }

  getSalas = async () => {

  }

  getMinhasSalas = async salas => {
    const uid = await AsyncStorage.get('@UID');
    consol.log(uid)

    return salas;

  }

  getDisponiveis = salas => {
    return salas.map((item, index) => (
      this.getStatus(item.dataFinal, item.dataInicial, item.horaFinal, item.horaInicial, false)
    ) != 'encerrada'
      ? <CardSalaVotacao
        key={index}
        onPress={() => this.handleVisualizar(item)}
        status={this.getStatus(item.dataFinal,
          item.dataInicial, item.horaFinal,
          item.horaInicial)}
        mensagem={this.getStatus(item.dataFinal,
          item.dataInicial, item.horaFinal,
          item.horaInicial, true)}
        titulo={item.titulo}
      />
      : null
    )
  }

  render() {
    const { salas, alternativas, selected } = this.state;
    const { height } = Dimensions.get('screen');
    // let x = await this.getMinhasSalas(salas);
    return (
      <View style={[styles.container, { height: height }]}>
        <ScrollView style={{ maxHeight: height - 240, marginBottom: 5 }}>
          <View>
            {
              salas.length > 0
                ? this.getDisponiveis(salas)
                : <SemSalas texto={"No momento você não possui salas de votação disponíveis!"} />
            }
          </View>

        </ScrollView>
        <BotaoNovaSala
          color='#10C500'
          endereco='Sala'
          navigation={this.props.navigation}
        />
        <Barra
          index={false}
          onPress={() => this.props.navigation.navigate('Historico')}
        />
      </View>
    );
  }
}