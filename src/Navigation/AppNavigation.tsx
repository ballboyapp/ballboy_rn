import { Platform } from 'react-native';
import { createBrowserApp } from '@react-navigation/web';
import { createAppContainer } from 'react-navigation';
import WebAppNavigation from './WebAppNavigation';
import NativeAppNavigation from './NativeAppNavigation';

export default Platform.OS === 'web' ? createBrowserApp(WebAppNavigation) : createAppContainer(NativeAppNavigation);

export const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];
  // Dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }

  return route.routeName;
};


// import React from 'react';
// import { Platform } from 'react-native';
// import { createBrowserApp } from '@react-navigation/web';
// import {
//   createAppContainer,
//   createSwitchNavigator,
// } from 'react-navigation';
// import {
//   createStackNavigator,
//   // createSwitchNavigator,
//   // createBottomTabNavigator,
// } from 'react-navigation-stack';
// import {
//   // createStackNavigator,
//   // createSwitchNavigator,
//   createBottomTabNavigator,
// } from 'react-navigation-tabs';
// import {
//   OnboardingNav,
//   SplashNav,
//   SpotSearchNav,
//   GameSearchNav,
//   PlanGameNav,
//   ProfileNav,
//   InfoNav,
// } from './Navigators';
// import NavBar from '../Components/Common/NavBar';
// import DebugScreen from '../Screens/Debug/DebugScreen';

// import SplashScreen from '../Screens/Splash/SplashScreen';
// import LoginScreen from '../Screens/Auth/LoginScreen';
// import SignupEmailScreen from '../Screens/Auth/SignupEmailScreen';
// import CheckEmailScreen from '../Screens/Auth/CheckEmailScreen';
// import GamesListScreen from '../Screens/Games/GamesListScreen';
// import GameDetailsScreen from '../Screens/Games/GameDetailsScreen';

// import LoggedOutRoute from './LoggedOutRoute';
// import LoggedInRoute from './LoggedInRoute';


// const MainTabsNav = createBottomTabNavigator({
//   SpotSearchTab: { screen: SpotSearchNav },
//   GameSearchTab: { screen: GameSearchNav },
//   ProfileTab: { screen: ProfileNav },
//   InfoTab: { screen: InfoNav },
// }, {
//   tabBarComponent: NavBar,
//   tabBarPosition: 'bottom',
//   animationEnabled: false,
//   swipeEnabled: false,
//   initialRouteName: 'GameSearchTab',
// });

// const MainNav = createStackNavigator({
//   MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
//   PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
// }, {
//   initialRouteName: 'MainTabs',
// });

// // const AppNavigation = createSwitchNavigator({
// //   SplashScreen: { screen: SplashNav }, // LoggedOut
// //   OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
// //   MainNav: { screen: MainNav }, // LoggedIn
// //   DebugNav: { screen: DebugScreen },
// // }, {
// //   // Default config for all screens
// //   headerMode: 'none',
// //   initialRouteName: 'SplashScreen',
// //   tabBarComponent: () => null,
// // });

// const NativeAppNavigation = createSwitchNavigator({
//   SplashScreen: { screen: SplashNav }, // LoggedOut
//   OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
//   MainNav: { screen: MainNav }, // LoggedIn
//   DebugNav: { screen: DebugScreen },
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'SplashScreen',
//   tabBarComponent: () => null,
// });

// const WebAppLoggedOutScreensNavigation = createSwitchNavigator(
//   {
//     SplashScreen: {
//       screen: SplashScreen,
//       path: '',
//     },
//     LoginScreen: {
//       screen: LoginScreen,
//       path: 'login',
//     },
//     SignupEmailScreen: {
//       screen: SignupEmailScreen,
//       path: 'signup',
//     },
//     CheckEmailScreen: {
//       screen: CheckEmailScreen,
//       path: 'verify-email',
//     },
//   },
//   {
//     initialRouteName: 'SplashScreen',
//   },
// );

// const WebAppLoggedInScreensNavigation = createSwitchNavigator(
//   {
//     GamesListScreen: {
//       screen: GamesListScreen,
//       path: 'activities',
//     },
//     GameDetailsScreen: {
//       screen: GameDetailsScreen,
//       path: 'activities/:_id',
//     },
//     // LoginScreen: {
//     //   screen: LoginScreen,
//     //   path: 'login',
//     // },
//     // SignupEmailScreen: {
//     //   screen: SignupScreen,
//     //   path: 'signup',
//     // },
//   },
//   {
//     initialRouteName: 'GamesListScreen',
//   },
// );

// const WebAppNavigation = createSwitchNavigator(
//   {
//     LoggedOutScreens: {
//       screen: ({ navigation }) => (
//         <LoggedOutRoute
//           // navigation={navigation}
//           component={createBrowserApp(WebAppLoggedOutScreensNavigation)}
//           onLoggedIn={() => { navigation.navigate('GamesListScreen'); }} // TODO: if history is defined, goBAck, otherwise redirect to Activities
//         />
//       ),
//       path: '',
//     },
//     LoggedInScreens: {
//       screen: ({ navigation }) => (
//         <LoggedInRoute
//           // component={ProfileDetailsScreen}
//           component={createBrowserApp(WebAppLoggedInScreensNavigation)}
//           // navigation={navigation}
//           onLoggedOut={() => { navigation.navigate('SplashScreen'); }}
//         />
//       ),
//       path: 'activities',
//     },
//   },
//   {
//     initialRouteName: 'LoggedOutScreens',
//   },
// );


// // const WebAppNavigation = createSwitchNavigator(
// //   {
// //     SplashScreen: {
// //       screen: SplashScreen,
// //       path: '',
// //     },
// //     LoginScreen: {
// //       screen: LoginScreen,
// //       path: 'login',
// //     },
// //     SignupEmailScreen: {
// //       screen: SignupScreen,
// //       path: 'signup',
// //     },
// //   },
// //   {
// //     initialRouteName: 'SplashScreen',
// //   },
// // );

// // const AppNavigation = Platform.select({
// //   web: createBrowserApp(WebAppNavigation),
// //   default: createAppContainer(NativeAppNavigation),
// // });

// // export default AppNavigation;

// export default Platform.OS === 'web' ? createBrowserApp(WebAppNavigation) : createAppContainer(NativeAppNavigation);

// // const createApp = Platform.select({
// //   web: createBrowserApp,
// //   default: createAppContainer,
// // });

// // const AppContainer = createApp(
// //   createSwitchNavigator(
// //     {
// //       SplashScreen: {
// //         screen: SplashScreen,
// //         path: '',
// //       },
// //       LoginScreen: {
// //         screen: LoginScreen,
// //         path: 'login',
// //       },
// //       SignupEmailScreen: {
// //         screen: SignupScreen,
// //         path: 'signup',
// //       },
// //     },
// //     {
// //       initialRouteName: 'SplashScreen',
// //     },
// //   ),
// // );

// // export default AppContainer;


// // const createRootNavigator = (loggedIn = false) => (
// // const createRootNavigator = ({ loadingUser, user }) => (
// //   createSwitchNavigator({
// //     SplashScreen: { screen: SplashNav }, // LoggedOut
// //     OnboardingScreen: { screen: OnboardingScreen },
// //     MainNav: { screen: MainNav }, // LoggedIn
// //     DebugNav: { screen: DebugScreen },
// //   }, {
// //     // Default config for all screens
// //     headerMode: 'none',
// //     // initialRouteName: loggedIn ? 'MainNav' : 'SplashScreen',
// //     initialRouteName: !loadingUser && user && user.location ? 'MainNav' : 'SplashScreen',
// //     tabBarComponent: () => null,
// //   })
// // );

// // export default createRootNavigator;

// // export const createRootNavigator = (signedIn = false) => {
// //   return SwitchNavigator(
// //     {
// //       SignedIn: {
// //         screen: SignedIn
// //       },
// //       SignedOut: {
// //         screen: SignedOut
// //       }
// //     },
// //     {
// //       initialRouteName: signedIn ? "SignedIn" : "SignedOut"
// //     }
// //   );
// // };

// export const getActiveRouteName = (navigationState) => {
//   if (!navigationState) {
//     return null;
//   }

//   const route = navigationState.routes[navigationState.index];
//   // Dive into nested navigators
//   if (route.routes) {
//     return getActiveRouteName(route);
//   }

//   return route.routeName;
// };


// // import { Platform } from 'react-native';
// // import { createBrowserApp } from '@react-navigation/web';
// // import {
// //   createAppContainer,
// //   createSwitchNavigator,
// // } from 'react-navigation';
// // import {
// //   createStackNavigator,
// //   // createSwitchNavigator,
// //   // createBottomTabNavigator,
// // } from 'react-navigation-stack';
// // import {
// //   // createStackNavigator,
// //   // createSwitchNavigator,
// //   createBottomTabNavigator,
// // } from 'react-navigation-tabs';
// // import {
// //   OnboardingNav,
// //   SplashNav,
// //   SpotSearchNav,
// //   GameSearchNav,
// //   PlanGameNav,
// //   ProfileNav,
// //   InfoNav,
// // } from './Navigators';
// // import NavBar from '../Components/Common/NavBar';
// // import DebugScreen from '../Screens/Debug/DebugScreen';

// // const MainTabsNav = createBottomTabNavigator({
// //   SpotSearchTab: { screen: SpotSearchNav },
// //   GameSearchTab: { screen: GameSearchNav },
// //   ProfileTab: { screen: ProfileNav },
// //   InfoTab: { screen: InfoNav },
// // }, {
// //   tabBarComponent: NavBar,
// //   tabBarPosition: 'bottom',
// //   animationEnabled: false,
// //   swipeEnabled: false,
// //   initialRouteName: 'GameSearchTab',
// // });

// // const MainNav = createStackNavigator({
// //   MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
// //   PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
// // }, {
// //   initialRouteName: 'MainTabs',
// // });

// // const AppNavigation = createSwitchNavigator({
// //   SplashScreen: { screen: SplashNav }, // LoggedOut
// //   OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
// //   MainNav: { screen: MainNav }, // LoggedIn
// //   DebugNav: { screen: DebugScreen },
// // }, {
// //   // Default config for all screens
// //   headerMode: 'none',
// //   initialRouteName: 'SplashScreen',
// //   tabBarComponent: () => null,
// // });

// // export default Platform.OS === 'web' ? createBrowserApp(AppNavigation) : createAppContainer(AppNavigation);

// // // const createRootNavigator = (loggedIn = false) => (
// // // const createRootNavigator = ({ loadingUser, user }) => (
// // //   createSwitchNavigator({
// // //     SplashScreen: { screen: SplashNav }, // LoggedOut
// // //     OnboardingScreen: { screen: OnboardingScreen },
// // //     MainNav: { screen: MainNav }, // LoggedIn
// // //     DebugNav: { screen: DebugScreen },
// // //   }, {
// // //     // Default config for all screens
// // //     headerMode: 'none',
// // //     // initialRouteName: loggedIn ? 'MainNav' : 'SplashScreen',
// // //     initialRouteName: !loadingUser && user && user.location ? 'MainNav' : 'SplashScreen',
// // //     tabBarComponent: () => null,
// // //   })
// // // );

// // // export default createRootNavigator;

// // // export const createRootNavigator = (signedIn = false) => {
// // //   return SwitchNavigator(
// // //     {
// // //       SignedIn: {
// // //         screen: SignedIn
// // //       },
// // //       SignedOut: {
// // //         screen: SignedOut
// // //       }
// // //     },
// // //     {
// // //       initialRouteName: signedIn ? "SignedIn" : "SignedOut"
// // //     }
// // //   );
// // // };

// // export const getActiveRouteName = (navigationState) => {
// //   if (!navigationState) {
// //     return null;
// //   }

// //   const route = navigationState.routes[navigationState.index];
// //   // Dive into nested navigators
// //   if (route.routes) {
// //     return getActiveRouteName(route);
// //   }

// //   return route.routeName;
// // };
