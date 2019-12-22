import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import Block from '../../Common/Block';
import BackgroundImage from '.';

const Container = styled.View`
  height: 80px;
`;

storiesOf('Spots.BackgroundImage', module)
  .add('BackgroundImage', () => (
    <Query
      query={spotDetailsQuery}
      variables={{ _id: '1', limit: 1, offset: 0 }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <Block bgColor="silver" style={{ flex: 1 }}>
            <Container>
              <BackgroundImage
                images={data.spotDetails.images}
                height={200}
                width={300}
              />
            </Container>
          </Block>
        );
      }}
    </Query>
  ));
