import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import ShareGameButton from '.';

storiesOf('Games.ShareGameButton', module)
  .add('ShareGameButton default', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <ShareGameButton
            shareLink={data.activityDetails.shareLink}
            variant="email"
          />
        );
      }}
    </Query>
  ));
