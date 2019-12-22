import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import PlanGameForm from '.';

storiesOf('PlanGame.PlanGameForm', module)
  .add('PlanGameForm', () => (
    <View style={{ flex: 1 }}>
      <Query query={privateUserQuery}>
        {({ loading, error, data }) => {
          if (loading || error) return null;

          return <PlanGameForm username={data.privateUser.profile.username} />;
        }}
      </Query>
    </View>
  ));
