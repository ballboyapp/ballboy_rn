import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import { ACTIVITY_STATUSES } from '../../../constants';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import GameListCard from '.';

const Container = ({ mutate }) => (
  <View>
    <Query
      query={activityDetailsQuery}
      variables={{ _id: '1' }}
    >
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return <GameListCard activity={mutate(data.activityDetails)} />;
      }}
    </Query>
  </View>
);

Container.propTypes = {
  mutate: PropTypes.func,
};

Container.defaultProps = {
  mutate: g => g,
};

storiesOf('Games.GameListCard', module)
  .add('GameListCard PLANNED', () => (
    <Container mutate={g => Object.assign({}, g, { status: ACTIVITY_STATUSES.ACTIVE })} />
  ))
  .add('GameListCard PLANNED long title', () => (
    <Container mutate={g => Object.assign({}, g, { status: ACTIVITY_STATUSES.ACTIVE, title: 'Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name' })} />
  ))
  .add('GameListCard CANCELED', () => (
    <Container mutate={g => Object.assign({}, g, { status: ACTIVITY_STATUSES.CANCELED })} />
  ))
  .add('GameListCard PLANNED short title', () => (
    <Container mutate={g => Object.assign({}, g, { status: ACTIVITY_STATUSES.ACTIVE, title: 'Some Short Name' })} />
  ))
  .add('GameListCard CANCELED long title', () => (
    <Container mutate={g => Object.assign({}, g, { status: ACTIVITY_STATUSES.CANCELED, title: 'Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name Some Looooong Title/Name' })} />
  ));
