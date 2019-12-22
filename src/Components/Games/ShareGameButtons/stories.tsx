import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import ShareGameButtons from '.';

storiesOf('Games.ShareGameButtons', module)
  .add('ShareGameButtons white theme', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <View style={{ flex: 1 }}>
            <ShareGameButtons shareLink={data.activityDetails.shareLink} />
          </View>
        );
      }}
    </Query>
  ));
