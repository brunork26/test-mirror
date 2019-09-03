import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Inicio from './src/screens/Inicio';

import Sala from './src/screens/Sala';
import SalaContexto from './src/screens/SalaContexto';
import Questao from './src/screens/Questao';
import QuestaoContexto from './src/screens/QuestaoContexto';
import QuestaoSalva from './src/screens/QuestaoSalva';
import Convidados from './src/screens/Convidados';


const AppNavigator = createStackNavigator(
  {
    Inicio,
    Sala,
    SalaContexto,
    Questao,
    QuestaoContexto,
    QuestaoSalva,
    Convidados
  },
  {
    initialRouteName: 'Inicio',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: '#8400C5',
      headerTitleContainerStyle: {
        justifyContent: 'center',
        textAlign: 'center',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#00C551',
      },
      headerLeft: null
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}