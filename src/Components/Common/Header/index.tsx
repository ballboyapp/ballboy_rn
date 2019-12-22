import React from 'react';
import { Header as BaseHeader } from 'react-native-elements';
import isEmpty from 'lodash/isEmpty';
import Colors from '../../../Themes/Colors';
import I18n from '../../../I18n';
import Text from '../Text';
import { getTitle, getLeftComponent, getRightComponent } from './utils';

const Header = ({ navigation }) => {
  const activeRoute = navigation.state.routes[navigation.state.index];
  const activeKey = activeRoute.key;
  const params = activeRoute.params || {};

  console.log('activeRoute', JSON.stringify(activeRoute));
  console.log('Header.navigation', navigation);
  console.log('Header.params', params);

  const title = getTitle({ activeKey });
  const LeftComponent = getLeftComponent({ navigation, activeKey, params });
  const RightComponent = getRightComponent({ navigation, activeKey, params });

  if (isEmpty(title)) return null;

  return (
    <BaseHeader
      backgroundColor={Colors.white}
      centerComponent={() => <Text size="ML">{I18n.t(title)}</Text>}
      leftComponent={LeftComponent}
      rightComponent={RightComponent}
    />
  );
};

export default Header;
