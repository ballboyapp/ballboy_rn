import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
// import NavBtn from '../NavBtn';
// import ProfileDetailsScreen from '../../Screens/Profile/ProfileDetailsScreen';
import ProfileEditScreen from '../../Screens/Profile/ProfileEditScreen';
import UserMenu from '../UserMenu';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
// const backBtn = navigation => (
//   <NavBtn
//     orientation="left"
//     iconSet="MaterialIcons"
//     iconName="arrow-back"
//     onPress={() => { navigation.goBack(null); }}
//   />
// );
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileNav = createStackNavigator({
  // ProfileEditScreen: {
  //   screen: ProfileEditScreen,
  //   navigationOptions: ({ navigation }) => ({
  //     headerTitle: I18n.t('editProfileScreen.navigation.title'),
  //     headerTitleStyle,
  //     headerLeft: backBtn(navigation),
  //   }),
  // },
  ProfileDetailsScreen: {
    screen: ProfileEditScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: I18n.t('profileScreen.navigation.title'),
      headerTitleStyle,
      // headerRight: <UserMenu navigation={navigation} />,
    }),
  },
}, {
  initialRouteName: 'ProfileDetailsScreen',
});

export default ProfileNav;
