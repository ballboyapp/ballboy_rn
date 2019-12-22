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


// import React from 'react';
// import { createStackNavigator } from 'react-navigation';
// import LoggedInRoute from '../LoggedInRoute';
// import LoggedOutScreen from '../../Screens/Auth/LoggedOutScreen';
// import PlanGameScreen from '../../Screens/Plan/PlanGameScreen';
// import ShareGameScreen from '../../Screens/Plan/ShareGameScreen';
// import AuthScreens from './AuthScreens';

// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const PlanGameNav = createStackNavigator({
//   ...AuthScreens,
//   ShareGameScreen: {
//     screen: ({ navigation }) => (
//       <LoggedInRoute
//         component={ShareGameScreen}
//         navigation={navigation}
//         overlay={LoggedOutScreen}
//         // Child component props
//         closable
//         onClose={() => { navigation.goBack(null); }}
//       />
//     ),
//     navigationOptions: {
//       header: null,
//     },
//   },
//   PlanGameScreen: {
//     screen: ({ navigation }) => (
//       <LoggedInRoute
//         component={PlanGameScreen}
//         navigation={navigation}
//         overlay={LoggedOutScreen}
//         // Child component props
//         closable
//         onClose={() => { navigation.goBack(null); }}
//       />
//     ),
//     navigationOptions: {
//       header: null,
//     },
//   },
// }, {
//   tabBarComponent: () => null,
//   animationEnabled: true,
//   initialRouteName: 'PlanGameScreen',
// });

// export default PlanGameNav;
