import React from 'react';
import { storiesOf } from '@storybook/react-native';
import navigation from './mocks';
import SettingsScreen from '.';

storiesOf('Screens.Settings', module)
  .add('SettingsScreen', () => (
    <SettingsScreen
      navigation={navigation}
    />
  ));
