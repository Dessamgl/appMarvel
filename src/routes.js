import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import listHeroes from './pages/listHeroes';
import infoHeroes from './pages/infoHeroes';

const Routes = createAppContainer(
    createStackNavigator({
        listHeroes: {
            screen: listHeroes,
            navigationOptions: {
                title: 'Characters'
            },
        },
        infoHeroes: {
            screen: infoHeroes,
            navigationOptions: {
                title: ''
            },
        }
    }, {
       defaultNavigationOptions: {
           headerTintColor: '#FFF',
           headerStyle: {
               backgroundColor: '#B50F16'
           }
       } 
    }, {
        cardStyle: {
            paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
          }
    })
    
);

export default Routes;