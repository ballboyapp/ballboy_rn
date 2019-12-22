import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import SignupEmailForm from '.';

storiesOf('Auth.SignupEmailForm', module)
  .add('SignupEmailForm', () => (
    <Query query={privateUserQuery}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <SignupEmailForm user={data.privateUser} />;
      }}
    </Query>
  ));
