import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import Avatar from '.';

storiesOf('Common.Avatar', module)
  .add('Avatar with USER', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <Avatar
            size="S"
            user={data.activityDetails.organizer}
          />
        );
      }}
    </Query>
  ))
  .add('Avatar with TEXT size L', () => (
    <Avatar size="L" text="FR" />
  ))
  .add('Avatar no props size S', () => (
    <Avatar size="S" />
  ));
