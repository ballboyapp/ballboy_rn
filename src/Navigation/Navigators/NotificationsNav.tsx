// import { createStackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
// import AuthScreens from './AuthScreens';
import NotificationsListScreen from '../../Screens/Notifications/NotificationsListScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const NotificationsNav = createStackNavigator({
  // ...AuthScreens,
  NotificationsListScreen: {
    screen: NotificationsListScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('notificationsListScreen.navigation.title'),
      headerTitleStyle,
    }),
  },
}, {
  initialRouteName: 'NotificationsListScreen',
});

export default NotificationsNav;
