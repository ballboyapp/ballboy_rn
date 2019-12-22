import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import SpotImage from '.';

const Container = styled.View`
  height: 100px;
`;

const imgStyle = {
  flex: 1,
};

storiesOf('Spots.SpotImage', module)
  .add('SpotImage', () => (
    <Query
      query={spotDetailsQuery}
      variables={{ _id: '1', limit: 1, offset: 0 }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <Container>
            <SpotImage
              images={data.spotDetails.images}
              style={imgStyle}
              height={200}
              width={300}
            />
          </Container>
        );
      }}
    </Query>
  ));
