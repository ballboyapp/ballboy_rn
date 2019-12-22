import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import PlayersListScreen from '.';

const navigation = {
  navigate: () => null,
  state: {
    params: { _id: '1' },
  },
};

storiesOf('Screens.Games', module)
  .add('PlayersListScreen', () => (
    <View style={{ flex: 1 }}>
      <PlayersListScreen navigation={navigation} />
    </View>
  ));
