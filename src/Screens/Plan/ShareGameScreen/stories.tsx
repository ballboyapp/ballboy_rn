import { storiesOf } from '@storybook/react-native';
import React from 'react';
import ShareGameScreen from '.';

const navigation = {
  goBack: () => {},
  navigate: () => {},
  state: {
    params: {
      _id: '1',
    },
  },
};

storiesOf('Screens.Plan.ShareGameScreen', module)
  .add('ShareGameScreen', () => (
    <ShareGameScreen navigation={navigation} />
  ));
