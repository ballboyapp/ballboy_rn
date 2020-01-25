import React from 'react';
import { View } from 'react-native';
import { SceneView } from '@react-navigation/core';
import isEmpty from 'lodash/isEmpty';
import I18n from '../../I18n';
import Text from '../../Components/Common/Text';
import WebHeader from '../WebHeader';
import NavBar from '../NavBar';
import {
  FOOTER_VISIBLE_ROUTES,
  getTitle,
  getLeftComponent,
  getRightComponent,
} from './utils';

// See: https://github.com/react-navigation/web-server-example/blob/d83b0de60eece0cba9287b5924292fd08c049e3d/src/AppView.js
const WebAppView = ({ descriptors, navigation }) => {
  const activeRoute = navigation.state.routes[navigation.state.index];
  const activeKey = activeRoute.key;
  const descriptor = descriptors[activeKey];
  const params = activeRoute.params || {};

  const title = getTitle({ activeKey });
  const LeftComponent = getLeftComponent({ navigation, activeKey, params });
  const RightComponent = getRightComponent({ navigation, activeKey, params });

  return (
    <View style={{ flex: 1 }}>
      {!isEmpty(title) && (
        <WebHeader
          centerComponent={() => <Text size="ML">{I18n.t(title)}</Text>}
          leftComponent={LeftComponent}
          rightComponent={RightComponent}
        />
      )}
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
