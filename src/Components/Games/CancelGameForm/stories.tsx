import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import CancelGameForm from '.';

storiesOf('Games.CancelGameForm', module)
  .add('CancelGameForm', () => (
    <View style={{ flex: 1 }}>
      <Query
        query={activityDetailsQuery}
        variables={{ _id: '1' }}
      >
        {({ loading, error, data }) => {
          console.log('error', error)
          console.log('data', data)
          if (loading || error) return null;

          return <CancelGameForm activity={data.activityDetails} />;
        }}
      </Query>
    </View>
  ));
