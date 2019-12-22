import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import SpotLink from '.';

storiesOf('Spots.SpotLink', module)
  .add('SpotLink', () => (
    <Query
      query={spotDetailsQuery}
      variables={{ _id: '1', limit: 1, offset: 0 }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <SpotLink spot={data.spotDetails} />;
      }}
    </Query>
  ));

