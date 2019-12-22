import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';
import get from 'lodash/get';
import styled from 'styled-components/native';
// import { locationPropTypes, withLocation } from '../../../Context/Location';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';
import GamesList from '../../../Components/Games/GamesList';
import NoGamesFound from '../../../Components/Games/NoGamesFound';
// import curatedGames from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  flex: 1;
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GamesListScreen extends React.PureComponent {
  state = {
    hasNewResults: true,
  }

  handleGamePress = (activity) => {
    const { navigation } = this.props;
    console.log('HANDLE GAME PRESS !!!!');
    navigation.navigate('GameDetailsScreen', { _id: activity._id });
  }

  render() {
    const { hasNewResults } = this.state;

    return (
      <QueryCatchErrors
        query={activitiesQuery}
        variables={{ offset: 0, limit: 10 }}
        fetchPolicy="cache-and-network"
      >
        {({
          loading, data, refetch, fetchMore,
        }) => {
          const loadMore = () => {
            fetchMore({
              variables: {
                offset: get(data, 'activities.length', 0),
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || get(fetchMoreResult, 'activities.length', 0) === 0) {
                  this.setState({ hasNewResults: false }); // fix/hack for persistent loading indicator (loading never gets set to false when fetchMoreResult doesn't return new data)
                  return prev;
                }
                return { ...prev, activities: [...prev.activities, ...fetchMoreResult.activities] };
              },
            });
          };

          const activities = get(data, 'activities', []);

          return (
            <Container testID="GameListScreen">
              <GamesList
                activities={activities}
                onCardPress={this.handleGamePress}
                nothingFoundComp={NoGamesFound}
                // FlatList props
                onRefresh={refetch}
                refreshing={loading && hasNewResults}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
              />
            </Container>
          );
        }}
      </QueryCatchErrors>
    );
  }
}

GamesListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default GamesListScreen;
