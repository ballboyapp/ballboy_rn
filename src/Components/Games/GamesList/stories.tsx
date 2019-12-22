import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';
import Block from '../../Common/Block';
import GamesList from '.';

const Container = () => (
  <Query
    query={activitiesQuery}
    variables={{ limit: 10, offset: 0 }}
  >
    {({ loading, error, data }) => {
      if (loading || error) return null;

      return (
        <Block bgColor="silver">
          <GamesList
            activities={data.activities || []}
            onCardPress={() => {}}
          />
        </Block>
      );
    }}
  </Query>
);

storiesOf('Games.GamesList', module)
  .add('GamesList', () => <Container />);
// .add('GamesList no results', () => (
//   <GamesList
//     navigation={navigation}
//     games={[]}
//   />
// ));
