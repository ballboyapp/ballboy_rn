import { createStackNavigator } from 'react-navigation-stack';
import I18n from '../../I18n';
import SettingsScreen from '../../Screens/Settings/SettingsScreen';
import { headerTitleStyle } from './style';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SettingsNav = createStackNavigator({
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      headerTitle: I18n.t('settingsScreen.title'),
      headerTitleStyle,
    }),
  },
}, {
  initialRouteName: 'SettingsScreen',
});

export default SettingsNav;
