import React from 'react';
import { createNavigator, SwitchRouter } from '@react-navigation/core';
import extend from 'lodash/extend';
import SplashScreen from '../Screens/Splash/SplashScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import GamesListScreen from '../Screens/Games/GamesListScreen';
import GameDetailsScreen from '../Screens/Games/GameDetailsScreen';
import CancelGameScreen from '../Screens/Games/CancelGameScreen';
import EditGameScreen from '../Screens/Games/EditGameScreen';
import GameChatScreen from '../Screens/Games/GameChatScreen';
import PlayersListScreen from '../Screens/Games/PlayersListScreen';
import SpotsListScreen from '../Screens/Spots/SpotsListScreen';
import SpotDetailsScreen from '../Screens/Spots/SpotDetailsScreen';
import SpotsFilterScreen from '../Screens/Spots/SpotsFilterScreen';
import PlanGameScreen from '../Screens/Plan/PlanGameScreen';
import ShareGameScreen from '../Screens/Plan/ShareGameScreen';
import ProfileEditScreen from '../Screens/Profile/ProfileEditScreen';
import InfoScreen from '../Screens/Info/InfoScreen';
import LoggedOutRoute from './LoggedOutRoute';
import LoggedInRoute from './LoggedInRoute';
import NotOnboardedRoute from './NotOnboardedRoute';
import OnboardedRoute from './OnboardedRoute';
import WebAppView from './WebAppView';

// See: https://github.com/react-navigation/web-server-example/blob/d83b0de60eece0cba9287b5924292fd08c049e3d/src/AppView.js

const LOGGED_OUT_ROUTES = [
  {
    name: 'SplashScreen',
    screen: SplashScreen,
    path: '', // home
  },
  {
    name: 'SignupEmailScreen',
    screen: SignupEmailScreen,
    path: 'signup',
  },
  {
    name: 'LoginScreen',
    screen: LoginScreen,
    path: 'login',
  },
  {
    name: 'CheckEmailScreen',
    screen: CheckEmailScreen,
    path: 'check-email',
  },
];

const ONBOARD_ROUTES = [
  {
    name: 'OnboardingScreen',
    screen: OnboardingScreen,
    path: 'onboarding',
  },
];

const LOGGED_IN_ROUTES = [
  {
    name: 'GamesListScreen',
    screen: GamesListScreen,
    path: 'activities',
  },
  {
    name: 'GameDetailsScreen',
    screen: GameDetailsScreen,
    path: 'activities/:_id',
  },
  {
    name: 'CancelGameScreen',
    screen: CancelGameScreen,
    path: 'activities/cancel/:_id',
  },
  {
    name: 'EditGameScreen',
    screen: EditGameScreen,
    path: 'activities/edit/:_id',
  },
  {
    name: 'GameChatScreen',
    screen: GameChatScreen,
    path: 'activities/:_id/:roomId',
  },
  {
    name: 'PlayersListScreen',
    screen: PlayersListScreen,
    path: 'activities/players/:_id',
  },
  {
    name: 'SpotsListScreen',
    screen: SpotsListScreen,
    path: 'spots',
  },
  {
    name: 'SpotDetailsScreen',
    screen: SpotDetailsScreen,
    path: 'spots/:_id',
  },
  {
    name: 'SpotsFilterScreen',
    screen: SpotsFilterScreen,
    path: 'spots-filter',
  },
  {
    name: 'PlanGameScreen',
    screen: PlanGameScreen,
    path: 'plan-activity',
  },
  {
    name: 'ShareGameScreen',
    screen: ShareGameScreen,
    path: 'share-activity',
  },
  {
    name: 'ProfileEditScreen',
    screen: ProfileEditScreen,
    path: 'profile-edit',
  },
  {
    name: 'InfoScreen',
    screen: InfoScreen,
    path: 'about',
  },
];

const WebAppLoggedInScreensNavigation = createNavigator(
  WebAppView,
  SwitchRouter((() => {
    const routes = {};

    LOGGED_OUT_ROUTES.forEach(({ name, screen: Screen, path }) => (
      extend(routes, {
        [name]: {
          screen: ({ navigation }) => (
            <LoggedOutRoute
              component={Screen}
              onLoggedIn={({ location }) => {
                navigation.navigate(location ? 'GamesListScreen' : 'OnboardingScreen');
              }}
              // Child component props
              navigation={navigation}
            />
          ),
          path,
        },
      })
    ));

    ONBOARD_ROUTES.forEach(({ name, screen: Screen, path }) => (
      extend(routes, {
        [name]: {
          screen: ({ navigation }) => (
            <LoggedInRoute
              component={() => (
                <NotOnboardedRoute
                  component={Screen}
                  onOnboarded={() => { navigation.navigate('GamesListScreen'); }}
                  // Child component props
                  navigation={navigation}
                />
              )}
              onLoggedOut={() => { navigation.navigate('SplashScreen'); }}
            />
          ),
          path,
        },
      })
    ));

    LOGGED_IN_ROUTES.forEach(({ name, screen: Screen, path }) => (
      extend(routes, {
        [name]: {
          screen: ({ navigation }) => (
            <LoggedInRoute
              component={() => (
                <OnboardedRoute
                  component={Screen}
                  onNotOnboarded={() => { navigation.navigate('OnboardingScreen'); }}
                  // Child component props
                  navigation={navigation}
                />
              )}
              onLoggedOut={() => { navigation.navigate('SplashScreen'); }}
            />
          ),
          path,
        },
      })
    ));

    return routes;
  })()),
  {},
);

export default WebAppLoggedInScreensNavigation;
