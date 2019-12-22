import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { SPORTS } from '../../../constants';
import SportCard from '../SportCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportsList = ({ selectedSport, onSportPress }) => (
  <FlatList
    data={Object.values(SPORTS)}
    keyExtractor={item => item}
    renderItem={({ item: sport }) => (
      <SportCard
        sport={sport}
        isSelected={(selectedSport && selectedSport === sport) || false}
        onPress={onSportPress}
      />
    )}
    ItemSeparatorComponent={null}
    // Force list to re-render whenever selected sport changes
    extraData={selectedSport}
    // extraData={selectedSport ? selectedSport.uuid : null}
  />
);

SportsList.propTypes = {
  selectedSport: PropTypes.oneOf(Object.values(SPORTS)),
  onSportPress: PropTypes.func,
};

SportsList.defaultProps = {
  selectedSport: null,
  onSportPress: () => {},
};

export default SportsList;
