import { storiesOf } from '@storybook/react-native';
import React from 'react';
import NavBtn from '.';

storiesOf('Navigation.NavBtn', module)
  .add('NavBtn left', () => (
    <NavBtn
      orientation="left"
      iconSet="MaterialIcons"
      iconName="arrow-back"
    />
  ))
  .add('NavBtn right', () => (
    <NavBtn
      orientation="right"
      iconSet="MaterialIcons"
      iconName="arrow-forward"
    />
  ));
