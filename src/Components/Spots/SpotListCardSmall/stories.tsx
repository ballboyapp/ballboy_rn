import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import Block from '../../Common/Block';
import SpotListCardSmall from '.';

const StyledView = styled.View`
  height: 80px;
`;

const Container = ({ active }) => (
  <Query
    query={spotDetailsQuery}
    variables={{ _id: '1', limit: 1, offset: 0 }}
  >
    {({ loading, error, data }) => {
      if (loading || error) return null;

      return (
        <Block bgColor="silver">
          <StyledView>
            <SpotListCardSmall
              spot={data.spotDetails}
              active={active}
            />
          </StyledView>
        </Block>
      );
    }}
  </Query>
);

Container.propTypes = {
  active: PropTypes.bool,
};

Container.defaultProps = {
  active: false,
};

storiesOf('Spots.SpotListCardSmall', module)
  .add('SpotListCardSmall default', () => (
    <Container />
  ))
  .add('SpotListCardSmall active', () => (
    <Container active />
  ));
