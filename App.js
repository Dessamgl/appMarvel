import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StatusBar } from 'react-native';
import listHeroes, {homeConfig} from './src/pages/listHeroes'
import infoHeroes from './src/pages/infoHeroes';

const Root = createStackNavigator({
  listHeroes: {
    screen: listHeroes,
    navigationOptions: homeConfig
  },
  infoHeroes: {
    screen: infoHeroes,
    navigationOptions: homeConfig
  }
});

const Navigation = createAppContainer(Root);

export default function App() {
  return ( 
  <>
    <StatusBar barStyle='light-content'  backgroundColor='#B50F16' />
    <Navigation />
  </>
  );
}
