import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import LoggedOutRoute from '../LoggedOutRoute';
import AuthScreens from './AuthScreens';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const handleLoggedIn = (navigation, location) => {
  // In case the user is logged in when trying to access the SplashScreen,
  // redirect him to MainNav unless onboarding isn't completed yet.
  navigation.navigate(location ? 'MainNav' : 'OnboardingScreen');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashNav = createStackNavigator({
  ...AuthScreens,
  SplashScreen: {
    screen: ({ navigation }) => (
      <LoggedOutRoute
        component={SplashScreen}
        onLoggedIn={({ location }) => { handleLoggedIn(navigation, location); }}
        // Child component props
        navigation={navigation}
      />
    ),
    navigationOptions: { header: null },
  },
}, {
  // Default config for all screens
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

export default SplashNav;

// import React from 'react';
// import { createStackNavigator } from 'react-navigation';
// import SplashScreen from '../../Screens/Splash/SplashScreen';
// import LoggedOutRoute from '../LoggedOutRoute';
// import AuthScreens from './AuthScreens';

// //------------------------------------------------------------------------------
// // AUX FUNCTIONS:
// //------------------------------------------------------------------------------
// const handleLoggedIn = (navigation, location) => {
//   // In case the user is logged in when trying to access the SplashScreen,
//   // redirect him to MainNav unless onboarding isn't completed yet.
//   navigation.navigate(location ? 'MainNav' : 'OnboardingScreen');
// };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const SplashNav = createStackNavigator({
//   ...AuthScreens,
//   SplashScreen: {
//     screen: SplashScreen,
//     navigationOptions: { header: null },
//   },
// }, {
//   // Default config for all screens
//   initialRouteName: 'SplashScreen',
//   tabBarComponent: () => null,
// });

// export default SplashNav;
