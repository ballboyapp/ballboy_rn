import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import PlanGameScreen from '../../Screens/Plan/PlanGameScreen';
import ShareGameScreen from '../../Screens/Plan/ShareGameScreen';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PlanGameNav = createStackNavigator({
  ShareGameScreen: {
    screen: ShareGameScreen,
    navigationOptions: {
      header: null,
    },
  },
  PlanGameScreen: {
    screen: ({ navigation }) => (
      <PlanGameScreen
        navigation={navigation}
        closable
        onClose={() => { navigation.goBack(null); }}
      />
    ),
    navigationOptions: {
      header: null,
    },
  },
}, {
  tabBarComponent: () => null,
  animationEnabled: true,
  initialRouteName: 'PlanGameScreen',
});

export default PlanGameNav;
