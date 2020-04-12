import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
import GameDetailsScreens from './GameDetailsScreens';
import GamesListScreen from '../../Screens/Games/GamesListScreen';
import NavBtn from '../NavBtn';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameSearchNav = createStackNavigator({
  ...GameDetailsScreens,
  GamesListScreen: {
    screen: GamesListScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('gamesListScreen.navigation.title'),
      headerTitleStyle,
      headerRight: (
        <NavBtn
          orientation="right"
          iconSet="MaterialIcons"
          iconName="add"
          onPress={() => { navigation.navigate('PlanScreen'); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'GamesListScreen',
  navigationOptions: ({ navigation }) => ({
    tabBarVisible: navigation.state.index <= 0,
  }),
});

export default GameSearchNav;
