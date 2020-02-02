
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import NavBarButton from '.';

storiesOf('Common.NavBarButton', module)
  .add('NavBarButton', () => (
    <View style={{ flex: 1 }}>
      <NavBarButton
        icon={{ set: 'MaterialIcons', name: 'info' }}
        btnLabel="I'm the label"
      />
    </View>
  ))
  .add('NavBarButton withBadge', () => (
    <View style={{ height: 100, marginTop: 100 }}>
      <NavBarButton
        icon={{ set: 'MaterialIcons', name: 'info' }}
        btnLabel="I'm the label"
        withBadge
        style={{ borderWidth: 1, borderColor: 'red' }}
      />
    </View>
  ))
  .add('NavBarButton main', () => (
    <View style={{ flex: 1 }}>
      <NavBarButton
        icon={{ set: 'MaterialIcons', name: 'info' }}
        btnLabel="I'm the label"
        main
      />
    </View>
  ));
