import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import loginMutation from '../../../GraphQL/Users/Mutations/login';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginEmailForm and calls API to
 * authenticate the user.
 */
class LoginEmailApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { login, onError, onSuccess } = this.props;
    const { email } = inputFields;

    console.log('HANDLE LOGIN', email);
    try {
      const res = await login({
        variables: { email },
      });
      console.log('LOGIN RESPONSE', res);
      onSuccess({ email });
    } catch (exc) {
      console.log(exc);
      const errors = curateErrors(exc.message || exc);
      onError(errors);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      loginUser: this.handleLogin,
    };

    return children(api);
  }
}

LoginEmailApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  login: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

LoginEmailApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const enhance = compose(
  graphql(loginMutation, { name: 'login' }),
);

export default enhance(LoginEmailApiCall);
