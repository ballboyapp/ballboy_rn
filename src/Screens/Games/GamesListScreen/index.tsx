import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import get from 'lodash/get';
import styled from 'styled-components/native';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import activitiesQuery from '../../../GraphQL/Activities/Queries/activities';
import GamesList from '../../../Components/Games/GamesList';
import NoGamesFound from '../../../Components/Games/NoGamesFound';

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
// TODO: use hooks
class GamesListScreen extends React.PureComponent {
  state = {
    hasNewResults: true,
  }

  handleNoResultsBtnPress = () => {
    const { navigation } = this.props;
    navigation.navigate(Platform.OS === 'web' ? 'PlanGameScreen' : 'PlanScreen');
  }

  handleGamePress = (activity) => {
    const { navigation } = this.props;
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

          return (
            <Container testID="GameListScreen">
              <GamesList
                activities={get(data, 'activities', [])}
                onCardPress={this.handleGamePress}
                nothingFoundComp={() => <NoGamesFound onPress={this.handleNoResultsBtnPress} />}
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
