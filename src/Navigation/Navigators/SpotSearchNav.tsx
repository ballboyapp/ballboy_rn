import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
import SpotsListScreen from '../../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import GameDetailsScreens from './GameDetailsScreens';
import SpotsFilterScreen from '../../Screens/Spots/SpotsFilterScreen';
import NavBtn from '../NavBtn';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotSearchNav = createStackNavigator({
  ...GameDetailsScreens,
  SpotDetailsScreen: {
    screen: SpotDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('spotDetailsScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: (
        <NavBtn
          orientation="left"
          iconSet="MaterialIcons"
          iconName="arrow-back"
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  SpotsFilterScreen: {
    screen: SpotsFilterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('spotsFilterScreen.navigation.title'),
      headerTitleStyle,
      headerRight: (
        <NavBtn
          orientation="right"
          iconSet="MaterialIcons"
          iconName="close"
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  SpotsListScreen: {
    screen: SpotsListScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('spotsListScreen.navigation.title'),
      headerTitleStyle,
      headerRight: (
        <NavBtn
          orientation="right"
          iconSet="MaterialIcons"
          iconName="filter-list"
          onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'SpotsListScreen',
});

export default SpotSearchNav;
