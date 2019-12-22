import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import styled from 'styled-components/native';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import ClickableAttendees from '.';

const Box = styled.View`
  border: 1px solid black;
`;

storiesOf('Games.ClickableAttendees', module)
  .add('ClickableAttendees', () => (
    <Box>
      <Query
        query={activityDetailsQuery}
        variables={{ _id: '1' }}
      >
        {({ loading, error, data }) => {
          if (loading || error) return null;

          return (
            <ClickableAttendees
              attendees={get(data, 'activityDetails.attendees', [])}
            />
          );
        }}
      </Query>
    </Box>
  ));
