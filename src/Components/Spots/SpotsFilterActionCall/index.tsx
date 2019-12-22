import React from 'react';
import PropTypes from 'prop-types';
import { withSpotFilters, spotFiltersPropTypes } from '../../../Context/SpotFilters';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SpotsFilterActionCall extends React.PureComponent {
  handleFilter = async (inputFields) => {
    const {
      setMaxDistance,
      setAllSports,
      setSports,
      onSuccess,
    } = this.props;

    const { maxDistance, allSports, selectedSports } = inputFields;

    setMaxDistance({ maxDistance });
    setAllSports({ allSports });
    setSports({ selectedSports });

    // Pass event up to parent component
    onSuccess();
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      filterSpots: this.handleFilter,
    };

    return children(api);
  }
}

SpotsFilterActionCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSuccess: PropTypes.func,
  ...spotFiltersPropTypes,
};

SpotsFilterActionCall.defaultProps = {
  onSuccess: () => {},
};

export default withSpotFilters(SpotsFilterActionCall);
