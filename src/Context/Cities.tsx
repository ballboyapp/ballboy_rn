import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { useQuery } from 'react-apollo';
import get from 'lodash/get';
import cityFragment from '../GraphQL/Cities/Fragments/city';
import citiesQuery from '../GraphQL/Cities/Queries/cities';

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue = {
  loadingCities: false,
  cities: [{
    name: 'Amsterdam',
    country: 'Netherlands',
    formattedAddress: 'Amsterdam, Netherlands',
    coordinates: [52.354733, 4.8284116],
  }, {
    name: 'Enschede',
    country: 'Netherlands',
    formattedAddress: 'Enschede, Netherlands',
    coordinates: [52.220615, 6.895782],
  }, {
    name: 'Rotterdam',
    country: 'Netherlands',
    formattedAddress: 'Rotterdam, Netherlands',
    coordinates: [51.92806, 4.420195],
  }, {
    name: 'Barcelona',
    country: 'Spain',
    formattedAddress: 'Barcelona, Spain',
    coordinates: [41.394897, 2.0785563],
  }, {
    name: 'Buenos Aires',
    country: 'Argentina',
    formattedAddress: 'Buenos Aires, Argentina',
    coordinates: [-34.61566, -58.50351],
  }],
};

export const CitiesContext = React.createContext(defaultValue);

export const CitiesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(citiesQuery);

  if (error) {
    console.log('error', error);
  }

  return (
    <CitiesContext.Provider
      value={{
        loadingCities: loading, // TODO: change name to citiesLoading
        cities: get(data, 'cities', null),
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const CitiesConsumer = CitiesContext.Consumer;

export const withCities = (Component) => (props) => (
  <CitiesConsumer>
    {(citiesProps) => <Component {...props} {...citiesProps} />}
  </CitiesConsumer>
);

export const citiesPropTypes = {
  loadingCities: PropTypes.bool,
  cities: propType(cityFragment),
};
