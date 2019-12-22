import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import cloneDeep from 'lodash/cloneDeep';
import styled from 'styled-components/native';
import { SPORTS } from '../../../constants';
import spotFragment from '../../../GraphQL/Spots/Fragments/spot';
import Spacer from '../../Common/Spacer';
import SpotsList from '../../Spots/SpotsList';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const INIT_STATE = {
  spot: null,
};

export const INIT_ERRORS = {};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably move maxDistance to SpotsList and get said value from context
class SpotSlide extends React.PureComponent {
  render() {
    const { sport, spot, onChange } = this.props;

    return (
      <FlexOne>
        <Spacer size="XL" />
        <SpotsList
          testID="pickSpot"
          cardComponent="SpotListCardSmall"
          sports={sport ? [sport] : []} // empty array will return all spots
          // maxDistance={maxDistance} // km
          selectedSpot={spot}
          onCardPress={(value) => { onChange({ fieldName: 'spot', value }); }}
        />
      </FlexOne>
    );
  }
}

SpotSlide.title = 'spotSlide.title';
SpotSlide.requiredFields = ['spot'];
SpotSlide.nextBtnLabel = 'spotSlide.footer.nextBtnLabel';

SpotSlide.propTypes = {
  sport: PropTypes.oneOf(Object.values(SPORTS)),
  spot: propType(spotFragment),
  onChange: PropTypes.func,
};

SpotSlide.defaultProps = {
  sport: null,
  ...cloneDeep(INIT_STATE),
  onChange: () => {},
};

export default SpotSlide;
