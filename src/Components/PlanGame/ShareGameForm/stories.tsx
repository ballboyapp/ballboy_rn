import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import ShareGameForm from '.';

storiesOf('PlanGame.ShareGameForm', module)
  .add('ShareGameForm white theme', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <View style={{ flex: 1 }}>
            <ShareGameForm activity={data.activityDetails} />
          </View>
        );
      }}
    </Query>
  ));
