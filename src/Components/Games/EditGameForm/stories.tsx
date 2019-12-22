import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import EditGameForm from '.';

storiesOf('Games.EditGameForm', module)
  .add('EditGameForm', () => (
    <View style={{ flex: 1 }}>
      <Query
        query={activityDetailsQuery}
        variables={{ _id: '1' }}
      >
        {({ loading, error, data }) => {
          if (loading || error) return null;

          return <EditGameForm activity={data.activityDetails} />;
        }}
      </Query>
    </View>
  ));
