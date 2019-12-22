import {
  createSwitchNavigator,
} from 'react-navigation';
import {
  createStackNavigator,
  // createSwitchNavigator,
  // createBottomTabNavigator,
} from 'react-navigation-stack';
import {
  // createStackNavigator,
  // createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import {
  OnboardingNav,
  SplashNav,
  SpotSearchNav,
  GameSearchNav,
  PlanGameNav,
  ProfileNav,
  InfoNav,
} from './Navigators';
import NavBar from '../Components/Common/NavBar';
import DebugScreen from '../Screens/Debug/DebugScreen';

const MainTabsNav = createBottomTabNavigator({
  SpotSearchTab: { screen: SpotSearchNav },
  GameSearchTab: { screen: GameSearchNav },
  ProfileTab: { screen: ProfileNav },
  InfoTab: { screen: InfoNav },
}, {
  tabBarComponent: NavBar,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  initialRouteName: 'GameSearchTab',
});

const MainNav = createStackNavigator({
  MainTabs: { screen: MainTabsNav, navigationOptions: { header: null } },
  PlanScreen: { screen: PlanGameNav, navigationOptions: { header: null } },
}, {
  initialRouteName: 'MainTabs',
});

const NativeAppNavigation = createSwitchNavigator({
  SplashScreen: { screen: SplashNav }, // LoggedOut
  OnboardingScreen: { screen: OnboardingNav }, // LoggedIn
  MainNav: { screen: MainNav }, // LoggedIn
  DebugNav: { screen: DebugScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
  tabBarComponent: () => null,
});

export default NativeAppNavigation;
