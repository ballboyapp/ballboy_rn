import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity } from 'react-native';
import { propType } from 'graphql-anywhere';
import geolib from 'geolib';
import I18n from '../../../I18n';
import { QueryCatchErrors } from '../../../GraphQL/QueryCatchErrors';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';
import SpotListCard from '../SpotListCard';
import SpotListCardSmall from '../SpotListCardSmall';
import { curatedSpots, getSpotLocation, rounded } from './utils';
import { makeNumGenerator } from '../../../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({
  cardComponent,
  sportsIds,
  userCoords,
  maxDistance,
  selectedSpot,
  onCardPress,
  ...rest
}) => {
  const Card = cardComponent === 'SpotListCard' ? SpotListCard : SpotListCardSmall;

  // Set query variables
  const variables = {
    offset: 0,
    limit: 20,
    sports__ids: sportsIds, // empty array will return all spots
    distance: `${parseInt(1000 * maxDistance, 10)}:${userCoords.latitude}:${userCoords.longitude}`,
  };

  return (
    <QueryCatchErrors
      query={GET_SPOTS}
      variables={variables}
      fetchPolicy="cache-and-network"
    >
      {({
        loading,
        data,
        refetch,
        fetchMore,
      }) => {
        const loadMore = () => {
          fetchMore({
            variables: {
              offset: (data && data.spots && data.spots.length) || 0,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                spots: [...prev.spots, ...fetchMoreResult.spots],
              });
            },
          });
        };

        const spots = (
          data &&
          data.spots &&
          curatedSpots(data.spots).map((spot) => {
            if (!userCoords || !spot.address) { return spot; }
            const latLng = getSpotLocation(spot);
            const distance = rounded(geolib.getDistance(userCoords, latLng) / 1000);
            return Object.assign({}, spot, { distance });
          })
        ) || [];

        const numGenerator = makeNumGenerator();

        return (
          <FlatList
            data={spots}
            keyExtractor={item => item.uuid}
            renderItem={({ item: spot }) => (
              <TouchableOpacity
                testID={`pickSpot_${numGenerator()}`}
                key={spot.uuid}
                // Pass event up to parent component
                onPress={() => { onCardPress(spot); }}
                activeOpacity={1}
              >
                <Card
                  spot={spot}
                  active={(selectedSpot && selectedSpot.uuid === spot.uuid) || false}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={(<NothingFound icon="map-marker" text={I18n.t('No spots found')} />)}
            ItemSeparatorComponent={() => (<Spacer orientation="column" size="M" />)}
            showsVerticalScrollIndicator={false}
            onRefresh={refetch}
            refreshing={loading}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            contentContainerStyle={{
              flexGrow: 1, // centers not-found-component
              paddingVertical: 8,
            }}
            {...rest}
          />
        );
      }}
    </QueryCatchErrors>
  );
};

SpotsList.propTypes = {
  cardComponent: PropTypes.oneOf(['SpotListCard', 'SpotListCardSmall']).isRequired,
  sportsIds: PropTypes.arrayOf(PropTypes.string),
  userCoords: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  maxDistance: PropTypes.number, // km
  selectedSpot: propType(spotFragment),
  onCardPress: PropTypes.func,
  // Plus all FlatList native props
};

SpotsList.defaultProps = {
  sportsIds: [],
  userCoords: { latitude: 52.3727729, longitude: 4.9055008 },
  maxDistance: 50,
  selectedSpot: null,
  onCardPress: () => {},
};

export default SpotsList;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import NothingFound from '../../Common/NothingFound';
import Spacer from '../../Common/Spacer';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SpotsList = ({
  spots,
  selectedSpot,
  cardComponent: Card,
  onCardPress,
  ...rest
}) => (
  <FlatList
    showsVerticalScrollIndicator={false}
    data={spots}
    renderItem={({ item: spot }) => (
      <TouchableOpacity
        key={spot.uuid}
        onPress={() => { onCardPress(spot); }}
        activeOpacity={1}
      >
        <Card
          spot={spot}
          active={(selectedSpot && selectedSpot.uuid === spot.uuid) || false}
        />
      </TouchableOpacity>
    )}
    keyExtractor={item => item.uuid}
    ListEmptyComponent={(
      <NothingFound
        icon="map-marker"
        text={I18n.t('No spots found')}
      />
    )}
    ItemSeparatorComponent={() => (
      <Spacer orientation="column" size="M" />
    )}
    {...rest}
  />
);

SpotsList.propTypes = {
  spots: PropTypes.arrayOf(propType(spotFragment)),
  selectedSpot: propType(spotFragment),
  cardComponent: PropTypes.func.isRequired,
  onCardPress: PropTypes.func,
};

SpotsList.defaultProps = {
  spots: [],
  selectedSpot: null,
  onCardPress: () => {},
};

export default SpotsList;
*/