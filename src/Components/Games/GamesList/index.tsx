import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { FlatList, TouchableOpacity } from 'react-native';
import I18n from '../../../I18n';
import activityFragment from '../../../GraphQL/Activities/Fragments/activity';
import Spacer from '../../Common/Spacer';
import NothingFound from '../../Common/NothingFound';
import GameListCard from '../GameListCard';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const IMG_HEIGHT = 100;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GamesList = ({
  activities,
  onCardPress,
  nothingFoundComp: NothingFoundComp,
  refreshing,
  ...rest
}) => {
  // Centers not-found-component in case no activities were found
  const containerStyles = !activities || activities.length === 0 ? { justifyContent: 'center' } : {};

  return (
    <FlatList
      testID="activitiesFlatList"
      showsVerticalScrollIndicator={false}
      data={activities}
      keyExtractor={item => item._id}
      renderItem={({ item: activity }) => (
        <TouchableOpacity
          key={activity._id}
          onPress={() => { onCardPress(activity); }}
          activeOpacity={1}
        >
          <GameListCard activity={activity} />
        </TouchableOpacity>
      )}
      ListEmptyComponent={!refreshing && <NothingFoundComp />}
      ItemSeparatorComponent={() => <Spacer size="ML" />}
      onEndReachedThreshold={0.1}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 8,
        ...containerStyles,
      }}
      refreshing={refreshing}
      {...rest}
    />
  );
};

GamesList.propTypes = {
  activities: PropTypes.arrayOf(propType(activityFragment)),
  onCardPress: PropTypes.func,
  nothingFoundComp: PropTypes.func,
  refreshing: PropTypes.bool,
};

GamesList.defaultProps = {
  activities: [],
  onCardPress: () => {},
  nothingFoundComp: () => (
    <NothingFound
      imgSrc="noActivitiesIllustration"
      style={{ height: IMG_HEIGHT, width: parseInt(0.8 * IMG_HEIGHT, 10) }}
      text={I18n.t('gamesList.noResults')}
    />
  ),
  refreshing: false,
};

export default GamesList;
