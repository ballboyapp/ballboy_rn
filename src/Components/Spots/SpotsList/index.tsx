import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import { SPORTS } from '../../../constants';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import spotsQuery from '../../../GraphQL/Spots/Queries/spots';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';
import SpotListCard from '../SpotListCard';
import SpotListCardSmall from '../SpotListCardSmall';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const LIMIT = 10;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsList extends React.PureComponent {
  state = {
    hasNewResults: true,
  }

  render() {
    const {
      cardComponent,
      sports,
      maxDistance,
      selectedSpot,
      onCardPress,
      ...rest
    } = this.props;

    const { hasNewResults } = this.state;

    const Card = cardComponent === 'SpotListCard' ? SpotListCard : SpotListCardSmall;

    // Set query variables
    const variables = {
      sports, // empty array will return all spots
      distance: parseFloat(maxDistance * 1000), // km to mt
      offset: 0,
      limit: LIMIT,
    };

    return (
      <Query
        query={spotsQuery}
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({
          loading, data, refetch, fetchMore,
        }) => {
          console.log({
            loading, data, refetch, fetchMore,
          });
          const loadMore = () => {
            fetchMore({
              variables: {
                offset: get(data, 'spots.length', 0),
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult || get(fetchMoreResult, 'spots.length', 0) === 0) {
                  this.setState({ hasNewResults: false }); // fix/hack for persistent loading indicator (loading never gets set to false when fetchMoreResult doesn't return new data)
                  return prev;
                }
                return { ...prev, spots: [...prev.spots, ...fetchMoreResult.spots] };
              },
            });
          };

          const spots = get(data, 'spots', []);

          return (
            <FlatList
              data={spots}
              keyExtractor={(item) => item._id}
              renderItem={({ item: spot }) => (
                <TouchableOpacity
                  key={spot._id}
                  // Pass event up to parent component
                  onPress={() => { onCardPress(spot); }}
                  activeOpacity={1}
                >
                  <Card
                    spot={spot}
                    active={(selectedSpot && selectedSpot._id === spot._id) || false}
                  />
                </TouchableOpacity>
              )}
              ListEmptyComponent={(!loading && (
                <NothingFound
                  iconSet="MaterialCommunityIcons"
                  iconName="map-marker"
                  text={I18n.t('spotsList.noResults')}
                />
              ))}
              ItemSeparatorComponent={() => <Spacer size="ML" />}
              showsVerticalScrollIndicator={false}
              onRefresh={refetch}
              refreshing={loading && hasNewResults}
              onEndReached={loadMore}
              onEndReachedThreshold={0.1}
              contentContainerStyle={{
                flexGrow: 1,
                paddingVertical: 8,
                // Center not-found-component in case no spots were found
                justifyContent: spots.length === 0 ? 'center' : 'flex-start',
              }}
              {...rest}
            />
          );
        }}
      </Query>
    );
  }
}

SpotsList.propTypes = {
  cardComponent: PropTypes.oneOf(['SpotListCard', 'SpotListCardSmall']).isRequired,
  sports: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(SPORTS)),
  ),
  maxDistance: PropTypes.number, // km
  selectedSpot: propType(spotFragment),
  onCardPress: PropTypes.func,
  // Plus all FlatList native props
};

SpotsList.defaultProps = {
  sports: [],
  maxDistance: 50,
  selectedSpot: null,
  onCardPress: () => {},
};

export default SpotsList;
