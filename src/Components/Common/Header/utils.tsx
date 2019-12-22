import React from 'react';
import StackBackHeader from '../../../Navigation/StackBackHeader';
import UserMenu from '../../Profile/UserMenu';
import AdminMenu from '../../Games/AdminMenu';
import HeaderBtn from '../HeaderBtn';

// const BackBtn = () => (
//   <StackBackHeader onPress={() => { window.history.back(); }} />
// );

const NavigateBtn = ({ navigation, screen, params = {} }) => (
  <StackBackHeader onPress={() => { navigation.navigate(screen, params); }} />
);

const ROUTES = {
  SignupEmailScreen: {
    title: 'signupEmailScreen.navigation.title',
    // leftComponent: BackBtn,
  },
  LoginScreen: {
    title: 'loginScreen.navigation.title',
    // leftComponent: BackBtn,
  },
  CheckEmailScreen: {
    title: 'checkEmailScreen.navigation.title',
  },
  GamesListScreen: {
    title: 'gamesListScreen.navigation.title',
  },
  GameDetailsScreen: {
    title: 'gameDetailsScreen.navigation.title',
    // TODO: check history. If prev screen is SpotDetailsScreen, then navigate to spot details
    leftComponent: ({ navigation, params }) => (
      <NavigateBtn navigation={navigation} screen="GamesListScreen" />
    ),
    rightComponent: ({ navigation, params }) => (
      <AdminMenu navigation={navigation} activityId={params._id} />
    ),
  },
  GameChatScreen: {
    title: 'gameChatScreen.navigation.title',
    leftComponent: ({ navigation, params }) => (
      <NavigateBtn navigation={navigation} screen="GameDetailsScreen" params={{ _id: params._id }} />
    ),
  },
  PlayersListScreen: {
    title: 'playersListScreen.navigation.title',
    // TODO: if previous screen is CancelGameScreen then go back to that screen rather than game details
    leftComponent: ({ navigation, params }) => (
      <NavigateBtn navigation={navigation} screen="GameDetailsScreen" params={{ _id: params._id }} />
    ),
  },
  EditGameScreen: {
    title: 'editGameScreen.navigation.title',
    leftComponent: ({ navigation, params }) => (
      <NavigateBtn navigation={navigation} screen="GameDetailsScreen" params={{ _id: params._id }} />
    ),
  },
  CancelGameScreen: {
    title: 'cancelGameScreen.navigation.title',
    leftComponent: ({ navigation, params }) => (
      <NavigateBtn navigation={navigation} screen="GameDetailsScreen" params={{ _id: params._id }} />
    ),
  },
  SpotsListScreen: {
    title: 'spotsListScreen.navigation.title',
    rightComponent: ({ navigation }) => (
      <HeaderBtn
        iconName="filter-list"
        onPress={() => { navigation.navigate('SpotsFilterScreen'); }}
      />
    ),
  },
  SpotDetailsScreen: {
    title: 'spotDetailsScreen.navigation.title',
    leftComponent: ({ navigation, params }) => (
      <NavigateBtn navigation={navigation} screen="SpotsListScreen" />
    ),
  },
  SpotsFilterScreen: {
    title: 'spotsFilterScreen.navigation.title',
    rightComponent: ({ navigation }) => (
      <HeaderBtn
        iconName="close"
        onPress={() => { navigation.navigate('SpotsListScreen'); }}
      />
    ),
  },
  PlanGameScreen: {
    title: '',
  },
  ProfileEditScreen: {
    title: 'profileScreen.navigation.title',
    rightComponent: ({ navigation }) => (
      <UserMenu navigation={navigation} />
    ),
  },
  InfoScreen: {
    title: 'infoScreen.title',
  },
};

export const getTitle = ({ activeKey }): string => (
  ROUTES[activeKey] ? ROUTES[activeKey].title : ''
);

export const getLeftComponent = ({ activeKey, params, navigation }) => (
  ROUTES[activeKey] && ROUTES[activeKey].leftComponent
    ? ROUTES[activeKey].leftComponent({ navigation, params })
    : null
);

export const getRightComponent = ({ activeKey, params, navigation }) => (
  ROUTES[activeKey] && ROUTES[activeKey].rightComponent
    ? ROUTES[activeKey].rightComponent({ navigation, params })
    : null
);
