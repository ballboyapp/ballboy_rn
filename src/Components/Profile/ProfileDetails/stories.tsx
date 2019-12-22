import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import ProfileDetails from '.';

storiesOf('Profile.ProfileDetails', module)
  .add('ProfileDetails', () => (
    <Query query={privateUserQuery}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <ProfileDetails user={data.privateUser} />;
      }}
    </Query>
  ));
