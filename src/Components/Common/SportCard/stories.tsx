import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { SPORTS } from '../../../constants';
import Block from '../Block';
import SportCard from '.';

const Container = ({ isSelected }) => (
  <Block>
    <SportCard
      sport={SPORTS.BASKETBALL}
      isSelected={isSelected}
    />
  </Block>
);

Container.propTypes = {
  isSelected: PropTypes.bool,
};

Container.defaultProps = {
  isSelected: false,
};

storiesOf('Common.SportCard', module)
  .add('SportCard', () => <Container />)
  .add('SportCard isSelected', () => <Container isSelected />);
