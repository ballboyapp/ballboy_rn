import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import get from 'lodash/get';
import styled from 'styled-components/native';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import spotDetailsQuery from '../../../GraphQL/Spots/Queries/spotDetails';
import SpotDetails from '../../../Components/Spots/SpotDetails';
import GamesList from '../../../Components/Games/GamesList';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled(ScrollView)`
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
const GamesContainer = styled.View`
  padding: 0 8px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotDetailsScreen extends React.PureComponent {
  state = {
    hasNewResults: true,
  }

  handleGamePress = (activity) => {
    const { navigation } = this.props;
    navigation.navigate('GameDetailsScreen', { _id: activity._id });
  }

  render() {
    const { navigation } = this.props;
    const { hasNewResults } = this.state;

    const variables = {
      _id: navigation.state.params._id,
      offset: 0,
      limit: 10,
    };

    return (
      <QueryCatchErrors
        query={spotDetailsQuery}
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data, refetch, fetchMore }) => {
          const loadMore = () => {
            fetchMore({
              variables: {
                offset: get(data, 'spotDetails.activities.length', 0),
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || get(fetchMoreResult, 'spotDetails.activities.length', 0) === 0) {
                  this.setState({ hasNewResults: false }); // fix/hack for persistent loading indicator (loading never gets set to false when fetchMoreResult doesn't return new data)
                  return prev;
                }
                return Object.assign({}, prev, {
                  spotDetails: {
                    ...prev.spotDetails,
                    activities: [
                      ...prev.spotDetails.activities,
                      ...fetchMoreResult.spotDetails.activities,
                    ],
                  },
                });
              },
            });
          };

          if (!data || !data.spotDetails) {
            return null;
          }

          const { spotDetails } = data;
          const activities = get(spotDetails, 'activities', []);

          return (
            <Container>
              <SpotDetails spot={spotDetails} />
              <GamesContainer>
                <GamesList
                  activities={activities}
                  onCardPress={this.handleGamePress}
                  // FlatList props
                  onRefresh={refetch}
                  refreshing={loading && hasNewResults}
                  onEndReached={loadMore}
                  onEndReachedThreshold={0.1}
                  contentContainerStyle={{
                    flexGrow: 1, // centers not-found-component
                    paddingBottom: 8,
                    minHeight: 200,
                  }}
                />
              </GamesContainer>
            </Container>
          );
        }}
      </QueryCatchErrors>
    );
  }
}

SpotDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default SpotDetailsScreen;

