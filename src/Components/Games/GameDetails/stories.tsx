import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import { ACTIVITY_STATUSES } from '../../../constants';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import GameDetails from '.';

const Container = ({ status }) => (
  <ScrollView style={{ flex: 1 }}>
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <GameDetails activity={Object.assign({}, data.activityDetails, { status })} />;
      }}
    </Query>
  </ScrollView>
);

Container.propTypes = {
  status: PropTypes.oneOf(Object.values(ACTIVITY_STATUSES)).isRequired,
};

storiesOf('Games.GameDetails', module)
  .add('GameDetails ACTIVE', () => <Container status={ACTIVITY_STATUSES.ACTIVE} />)
  .add('GameDetails CANCELED', () => <Container status={ACTIVITY_STATUSES.CANCELED} />)
  .add('GameDetails FINISHED', () => <Container status={ACTIVITY_STATUSES.FINISHED} />);
