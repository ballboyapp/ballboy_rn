import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import Block from '../../Common/Block';
import SpotHeader from '.';

const StyledView = styled.View`
  height: 80px;
`;

const Container = props => (
  <Query
    query={spotDetailsQuery}
    variables={{ _id: '1', limit: 1, offset: 0 }}
  >
    {({ loading, error, data }) => {
      if (loading || error) return null;

      return (
        <Block bgColor="silver">
          <StyledView>
            <SpotHeader
              spot={data.spotDetails}
              {...props}
            />
          </StyledView>
        </Block>
      );
    }}
  </Query>
);


storiesOf('Spots.SpotHeader', module)
  .add('SpotHeader default', () => (
    <Container />
  ))
  .add('SpotHeader withDistance withGames', () => (
    <Container withDistance withGames />
  ))
  .add('SpotHeader withDistance withGames gray', () => (
    <Container withDistance withGames gray />
  ));
