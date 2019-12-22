import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import spotsQuery from '../../../GraphQL/Spots/Queries/spots';
import SpotListCard from '.';

storiesOf('Spots.SpotListCard', module)
  .add('SpotListCard', () => (
    <Query
      query={spotsQuery}
      variables={{ limit: 5, offset: 0 }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <SpotListCard spot={data.spots[0]} />;
      }}
    </Query>
  ));
