import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import privateUserFragment from '../GraphQL/Users/Fragments/privateUser';
import privateUserQuery from '../GraphQL/Users/Queries/privateUser';

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue = {
  loadingUser: false,
  user: {
    _id: '5d416e6f3906e802b2c9da13',
    email: 'email@example.com',
    profile: {
      _id: '5d416e6f3906e802b2c9da14',
      username: 'Mock user',
      avatar: 'https://res.cloudinary.com/dp4vo5nq4/image/upload/v1564569376/dnixcele8cvcraogee0q.jpg',
      gender: 'TBD',
      language: 'es',
      city: 'Enschede',
      country: 'Netherlands',
    },
    location: {
      coordinates: [52.2206143, 6.8957819],
    },
  },
  refetchUser: () => {},
};

export const UserContext = React.createContext(defaultValue);

export const UserProvider = ({ children }) => (
  <Query query={privateUserQuery}>
    {({ loading, error, data, refetch }) => {
      console.log({ loading, error, data });
      if (error) {
        console.log('error', error);
      }

      return (
        <UserContext.Provider
          value={{
            loadingUser: loading, // TODO: change name to userLoading
            user: get(data, 'privateUser', null),
            refetchUser: refetch, // TODO: we don't need this anymore
          }}
        >
          {children}
        </UserContext.Provider>
      );
    }}
  </Query>
);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserConsumer = UserContext.Consumer;

export const withUser = Component => props => (
  <UserConsumer>
    {userProps => <Component {...props} {...userProps} />}
  </UserConsumer>
);

export const userPropTypes = {
  loadingUser: PropTypes.bool,
  user: propType(privateUserFragment),
  refetchUser: PropTypes.func,
};
