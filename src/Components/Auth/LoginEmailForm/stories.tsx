import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import LoginEmailForm from '.';

storiesOf('Auth.LoginEmailForm', module)
  .add('LoginEmailForm', () => (
    <Query query={privateUserQuery}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <LoginEmailForm user={data.privateUser} />;
      }}
    </Query>
  ));
