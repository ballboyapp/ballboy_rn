import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import OpenSpots from '.';

storiesOf('Games.OpenSpots', module)
  .add('OpenSpots', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <OpenSpots activity={data.activityDetails} />;
      }}
    </Query>
  ));
