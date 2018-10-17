import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { store, navigation } from './mocks';
import EditGameScreen from '.';

storiesOf('Screens.Games', module)
  .add('EditGameScreen', () => (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <EditGameScreen
          navigation={navigation}
        />
      </Provider>
    </View>
  ));