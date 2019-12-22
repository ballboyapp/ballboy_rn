import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { spotFiltersPropTypes, withSpotFilters } from '../../../Context/SpotFilters';
import { TopLayout, BottomLayout } from '../../../Components/Layouts/FixedTopLayout';
import SpotsList from '../../../Components/Spots/SpotsList';
import SpotsFilterFlap from '../../../Components/Spots/SpotsFilterFlap';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Inner = styled.View`
  padding: 0 8px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: replace Container with Layout comp
// TODO: probably move maxDistance to SpotsList and get said value from context
class SpotsListScreen extends React.Component {
  handleCardPress = (spot) => {
    const { navigation } = this.props;
    navigation.navigate('SpotDetailsScreen', { _id: spot._id });
  }

  render() {
    const { maxDistance, allSports, selectedSports } = this.props;

    return (
      <FlexOne testID="SpotsListScreen">
        {(!allSports || maxDistance < 20) && (
          <TopLayout>
            <SpotsFilterFlap
              maxDistance={maxDistance}
              allSports={allSports}
              selectedSports={selectedSports}
            />
          </TopLayout>
        )}
        <BottomLayout
          contentContainerStyle={{
            flex: 1,
            display: 'flex',
          }}
        >
          <Inner>
            <SpotsList
              cardComponent="SpotListCard"
              sports={allSports ? [] : selectedSports} // empty array will return all spots
              maxDistance={maxDistance} // km
              onCardPress={this.handleCardPress}
              // FlatList props
              // onScroll={this.handleScroll}
            />
          </Inner>
        </BottomLayout>
      </FlexOne>
    );
  }
}

SpotsListScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  ...spotFiltersPropTypes,
};

export default withSpotFilters(SpotsListScreen);
