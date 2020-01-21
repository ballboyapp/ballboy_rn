import React from 'react';
import { storiesOf } from '@storybook/react-native';
import NotificationsListScreen from '.';

const navigation = {
  navigate: () => {},
};

storiesOf('Screens.Notifications', module)
  .add('NotificationsListScreen', () => (
    <NotificationsListScreen navigation={navigation} />
  ));
