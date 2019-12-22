import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import navigation from './mocks';
import SignupEmailScreen from '.';

storiesOf('Screen.Auth', module)
  .add('SignupEmailScreen', () => (
    <Query query={privateUserQuery}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <SignupEmailScreen
            user={data.privateUser}
            navigation={navigation}
          />
        );
      }}
    </Query>
  ));
