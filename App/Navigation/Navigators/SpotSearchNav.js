import React from 'react';
import { StackNavigator } from 'react-navigation';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import SpotsListScreen from '../../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../../Screens/Spots/SpotDetailsScreen';
import SpotsHeaderBtn from '../../Components/Spots/HeaderBtn';
import GameDetailsScreens from './GameDetailsScreens';
import SpotFilterScreen from '../../Screens/Spots/SpotsFilterScreen';
import style from './style';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { headerTitleStyle } = style;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const backBtn = navigation => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotSearchNav = StackNavigator({
  ...GameDetailsScreens,
  SpotDetailsScreen: {
    screen: SpotDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Spot details'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SpotsFilterScreen: {
    screen: SpotFilterScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Filter spots'),
      headerTitleStyle,
      headerLeft: null,
      headerRight: (
        <SpotsHeaderBtn
          icon="close"
          onPress={() => { navigation.goBack(null); }}
        />
      ),
    }),
  },
  SpotsListScreen: {
    screen: SpotsListScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('Find a spot'),
      headerTitleStyle,
      headerRight: (
        <SpotsHeaderBtn
          icon="filter-list"
          onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
        />
      ),
    }),
  },
}, {
  initialRouteName: 'SpotsListScreen',
});

export default SpotSearchNav;