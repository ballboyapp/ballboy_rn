import React from 'react';
import I18n from '../../I18n';
import StackBackHeader from '../StackBackHeader';
import LoggedOutRoute from '../LoggedOutRoute';
import LoginScreen from '../../Screens/Auth/LoginScreen';
// import SignupScreen from '../../Screens/Auth/SignupScreen';
import SignupEmailScreen from '../../Screens/Auth/SignupEmailScreen';
import CheckEmailScreen from '../../Screens/Auth/CheckEmailScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation) => {
  // Simply go back one screen in the stack navigator
  navigation.goBack(null);
};
//------------------------------------------------------------------------------
const backBtn = (navigation) => (
  <StackBackHeader
    onPress={() => { navigation.goBack(null); }}
  />
);
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AuthScreens = {
  CheckEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        component={CheckEmailScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        navigation={navigation}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('checkEmailScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  LoginScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        component={LoginScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        navigation={navigation}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('loginScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  SignupEmailScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        component={SignupEmailScreen}
        onLoggedIn={() => { handleLoggedIn(navigation); }}
        // Child component props
        navigation={navigation}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('signupEmailScreen.navigation.title'),
      headerTitleStyle,
      headerLeft: backBtn(navigation),
    }),
  },
  // SignupScreen: {
  //   screen: ({ navigation }) => (
  //     <LoggedOutRoute
  //       navigation={navigation}
  //       component={SignupScreen}
  //       onLoggedIn={() => { handleLoggedIn(navigation); }}
  //     />
  //   ),
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: I18n.t('signupScreen.navigation.title'),
  //     headerTitleStyle,
  //     headerLeft: backBtn(navigation),
  //   }),
  // },
};

export default AuthScreens;
