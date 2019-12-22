import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import GameProperties from '.';

storiesOf('Games.GameProperties', module)
  .add('GameProperties', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <GameProperties activity={data.activityDetails} />;
      }}
    </Query>
  ));
