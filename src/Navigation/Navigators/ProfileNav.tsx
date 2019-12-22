import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
// import StackBackHeader from '../StackBackHeader';
import LoggedInRoute from '../LoggedInRoute';
// import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
import UserMenu from '../../Components/Profile/UserMenu';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
// const backBtn = navigation => (
//   <StackBackHeader
//     onPress={() => { navigation.goBack(null); }}
//   />
// );
//------------------------------------------------------------------------------
const handleLoggedOut = (navigation) => {
  navigation.navigate('SplashScreen');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileNav = createStackNavigator({
  // ProfileEditScreen: {
  //   screen: ({ navigation }) => (
  //     <LoggedInRoute
  //       component={ProfileEditScreen}
  //       navigation={navigation}
  //       onLoggedOut={() => { handleLoggedOut(navigation); }}
  //     />
  //   ),
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: I18n.t('editProfileScreen.navigation.title'),
  //     headerTitleStyle,
  //     headerLeft: backBtn(navigation),
  //   }),
  // },
  ProfileDetailsScreen: {
    screen: ({ navigation }) => (
      <LoggedInRoute
        // component={ProfileDetailsScreen}
        component={ProfileEditScreen}
        navigation={navigation}
        onLoggedOut={() => { handleLoggedOut(navigation); }}
      />
    ),
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('profileScreen.navigation.title'),
      headerTitleStyle,
      headerRight: <UserMenu navigation={navigation} />,
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;


// import React from 'react';
// import { createStackNavigator } from 'react-navigation';
// import I18n from '../../I18n';
// import StackBackHeader from '../StackBackHeader';
// import LoggedInRoute from '../LoggedInRoute';
// import AuthScreens from './AuthScreens';
// import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
// import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
// import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
// import UserMenu from '../../Components/Profile/UserMenu';
// import { headerTitleStyle } from './style';

// //------------------------------------------------------------------------------
// // AUX FUNCTIONS:
// //------------------------------------------------------------------------------
// const backBtn = navigation => (
//   <StackBackHeader
//     onPress={() => { navigation.goBack(null); }}
//   />
// );
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const ProfileNav = createStackNavigator({
//   ...AuthScreens,
//   ProfileEditScreen: {
//     screen: ({ navigation }) => (
//       <LoggedInRoute
//         navigation={navigation}
//         component={ProfileEditScreen}
//         overlay={LoggedOutScreen}
//       />
//     ),
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: I18n.t('editProfileScreen.navigation.title'),
//       headerTitleStyle,
//       headerLeft: backBtn(navigation),
//     }),
//   },
//   ProfileDetailsScreen: {
//     screen: ({ navigation }) => (
//       <LoggedInRoute
//         component={ProfileDetailsScreen}
//         navigation={navigation}
//         overlay={LoggedOutScreen}
//       />
//     ),
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: I18n.t('profileScreen.navigation.title'),
//       headerTitleStyle,
//       headerRight: <UserMenu navigation={navigation} />,
//     }),
//   },
// }, {
//   initialRouteName: 'ProfileDetailsScreen',
// });

// export default ProfileNav;
