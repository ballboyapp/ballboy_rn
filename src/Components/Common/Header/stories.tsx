import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Header from '.';

storiesOf('Common.Header', module)
  .add('Header', () => (
    <View style={{ backgroundColor: 'gray', flex: 1 }}>
      <Header iconName="filter-list" />
    </View>
  ));
