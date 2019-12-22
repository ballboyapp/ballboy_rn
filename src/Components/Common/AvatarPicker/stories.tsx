import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import AvatarPicker from '.';

storiesOf('Common.AvatarPicker', module)
  .add('AvatarPicker with USER', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <AvatarPicker user={data.activityDetails.organizer} />;
      }}
    </Query>
  ));
