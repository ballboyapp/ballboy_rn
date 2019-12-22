import { storiesOf } from '@storybook/react-native';
import React from 'react';
// import { SPORTS } from '../../../constants';
import Block from '../../Common/Block';
import SpotSlide from '.';

storiesOf('PlanGame.SpotSlide', module)
  .add('SpotSlide white theme', () => (
    <Block bgColor="silver" style={{ flex: 1 }}>
      <SpotSlide
        // sport={SPORTS.BASKETBALL}
        onChange={this.handleChange}
      />
    </Block>
  ));
