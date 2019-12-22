import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import Block from '../Block';
import SpotPickerField from '.';

const StyledView = styled.View`
  height: 80px;
`;

const Container = () => (
  <Query
    query={spotDetailsQuery}
    variables={{ _id: '1', limit: 1, offset: 0 }}
  >
    {({ loading, error, data }) => {
      if (loading || error) return null;

      return (
        <Block>
          <StyledView>
            <SpotPickerField
              value={data.spotDetails}
            />
          </StyledView>
        </Block>
      );
    }}
  </Query>
);

storiesOf('Spots.SpotPickerField', module)
  .add('SpotPickerField default', () => <Container />);
