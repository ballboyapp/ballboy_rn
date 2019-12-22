import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import OnboardingScreen from '../../Screens/Onboarding/OnboardingScreen';
import LoggedInRoute from '../LoggedInRoute';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OnboardingNav = createStackNavigator({
  OnboardingScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        navigation={navigation}
        component={OnboardingScreen}
        onLoggedOut={() => { navigation.navigate('SplashScreen'); }}
      />
    ),
    navigationOptions: { header: null },
  },
}, {
  // Default config for all screens
  initialRouteName: 'OnboardingScreen',
  tabBarComponent: () => null,
});

export default OnboardingNav;
