// import { createStackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
// import AuthScreens from './AuthScreens';
import GameDetailsScreens from './GameDetailsScreens';
import GamesListScreen from '../../Screens/Games/GamesListScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameSearchNav = createStackNavigator({
  // ...AuthScreens,
  ...GameDetailsScreens,
  GamesListScreen: {
    screen: GamesListScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('gamesListScreen.navigation.title'),
      headerTitleStyle,
    }),
  },
}, {
  initialRouteName: 'GamesListScreen',
});

export default GameSearchNav;
