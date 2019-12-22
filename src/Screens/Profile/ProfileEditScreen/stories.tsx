import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import navigation from './mocks';
import ProfileEditScreen from '.';

storiesOf('Profile.ProfileEditScreen', module)
  .add('ProfileEditScreen', () => (
    <Query query={privateUserQuery}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <ProfileEditScreen
            navigation={navigation}
            user={data.privateUser}
          />
        );
      }}
    </Query>
  ));
