import React from 'react';
import { View } from 'react-native';
import { SceneView } from '@react-navigation/core';
import Header from '../Components/Common/Header';
import NavBar from '../Components/Common/NavBar';

// See: https://github.com/react-navigation/web-server-example/blob/d83b0de60eece0cba9287b5924292fd08c049e3d/src/AppView.js
const FOOTER_VISIBLE_ROUTES = [
  'GamesListScreen',
  'SpotsListScreen',
  'ProfileEditScreen',
  'InfoScreen',
];

const WebAppView = ({ descriptors, navigation }) => {
  const activeKey = navigation.state.routes[navigation.state.index].key;
  const descriptor = descriptors[activeKey];

  console.log({ activeKey, descriptor });

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1 }}>
        <SceneView
          navigation={descriptor.navigation}
          component={descriptor.getComponent()}
        />
      </View>
      {FOOTER_VISIBLE_ROUTES.includes(activeKey) && (
        <NavBar navigation={navigation} />
      )}
    </View>
  );
};

export default WebAppView;
