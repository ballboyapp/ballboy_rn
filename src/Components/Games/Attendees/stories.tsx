import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import Attendees from '.';
// import { getAttendees } from '../utils';

storiesOf('Games.Attendees', module)
  .add('Attendees', () => (
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <Attendees
            attendees={get(data, 'activityDetails.attendees', [])}
          />
        );
      }}
    </Query>
  ));
