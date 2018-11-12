import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { AsyncStorage } from 'react-native';
import { Buffer } from 'buffer';
import SeedorfAPI from '../Services/SeedorfApi';
import { client } from '../GraphQL';
import userDetailsFragment from '../GraphQL/Users/Fragments/userDetails';
import GET_USER_DETAILS from '../GraphQL/Users/Queries/GET_USER_DETAILS';
import CenteredActivityIndicator from '../Components/Common/CenteredActivityIndicator';

/*
  user:
    undefined - not checked yet
    null      - user not logged in
    object    - the current logged in user object

  firstRun:
    undefined - not checked yet
    true      - onboarding already done
    false     - first time user opens the app
*/

const UserContext = React.createContext();

export const userPropTypes = {
  user: propType(userDetailsFragment),
  firstRun: PropTypes.bool,
  signup: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
  refresh: PropTypes.func,
};

export class UserProvider extends React.Component {
  state = {
    user: undefined,
    firstRun: undefined,
  }

  setToken = async (token) => {
    await AsyncStorage.setItem('TOKEN', token);
    SeedorfAPI.setToken(token);
    client.setToken(token);
  }

  async componentWillMount() {
    const firstRun = !await AsyncStorage.getItem('firstRunDone');
    await AsyncStorage.setItem('firstRunDone', 'true');
    this.setState({ firstRun });

    const token = await AsyncStorage.getItem('TOKEN');

    if (token) {
      const verifyTokenResult = await SeedorfAPI.verifyToken(token);
      if (verifyTokenResult.ok) {
        await this.setToken(token);
        this.refresh();
        return;
      }
    }

    this.logout();
  }

  refresh = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));
    const { uuid } = claims;
    const queryResult = await client.query({
      fetchPolicy: 'network-only',
      query: GET_USER_DETAILS,
      variables: { uuid },
    });
    this.setState({ user: queryResult.data.user });
  }

  signup = async ({
    firstName, lastName, email, password,
  }) => {
    const result = await SeedorfAPI.signup({
      firstName,
      lastName,
      username: email,
      email,
      password,
    });
    if (result.ok) {
      await this.setToken(result.data.token);
      await this.refresh();
    }
    return result;
  }

  login = async ({ email, password }) => {
    const result = await SeedorfAPI.login({
      username: email,
      email,
      password,
    });

    if (result.ok) {
      const { token } = result.data;
      await this.setToken(token);
      await this.refresh();
    }

    return result;
  }

  logout = async () => {
    this.setState({ user: null });
    client.setToken(null);
    SeedorfAPI.setToken(null);
    client.resetStore();
    await AsyncStorage.removeItem('TOKEN');
  }

  render() {
    const { mockUser } = this.props;
    const { firstRun } = this.state;
    let { user } = this.state;

    if (mockUser) {
      user = mockUser;
    }

    if (user === undefined || firstRun === undefined) {
      return <CenteredActivityIndicator />;
    }

    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          user,
          firstRun,
          signup: this.signup,
          login: this.login,
          logout: this.logout,
          refresh: this.refresh,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  mockUser: userPropTypes.user,
};

UserProvider.defaultProps = {
  mockUser: null,
};

export const UserConsumer = UserContext.Consumer;

export const withUser = Component => props => (
  <UserConsumer>
    {userProps => <Component {...props} {...userProps} />}
  </UserConsumer>
);
