import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { SPORTS } from '../constants';

const DEFAULT_FILTERS = {
  maxDistance: 20,
  allSports: true,
  selectedSports: [],
};

const SpotFiltersContext = React.createContext();

export class SpotFiltersProvider extends React.Component {
  state = cloneDeep(DEFAULT_FILTERS);

  setMaxDistance = ({ maxDistance }) => {
    this.setState({ maxDistance });
  }

  setAllSports = ({ allSports }) => {
    this.setState({ allSports });
  }

  setSports = ({ selectedSports }) => {
    this.setState({ selectedSports });
  }

  render() {
    const { children } = this.props;
    const { maxDistance, allSports, selectedSports } = this.state;

    return (
      <SpotFiltersContext.Provider
        value={{
          maxDistance,
          allSports,
          selectedSports,
          setMaxDistance: this.setMaxDistance,
          setAllSports: this.setAllSports,
          setSports: this.setSports,
        }}
      >
        {children}
      </SpotFiltersContext.Provider>
    );
  }
}

SpotFiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SpotFiltersConsumer = SpotFiltersContext.Consumer;

export const withSpotFilters = Component => props => (
  <SpotFiltersConsumer>
    {spotFiltersProps => <Component {...props} {...spotFiltersProps} />}
  </SpotFiltersConsumer>
);

export const spotFiltersPropTypes = {
  maxDistance: PropTypes.number,
  allSports: PropTypes.bool,
  selectedSports: PropTypes.arrayOf(
    PropTypes.oneOf(Object.values(SPORTS)),
  ),
  setMaxDistance: PropTypes.func,
  setAllSports: PropTypes.func,
  setSports: PropTypes.func,
};
