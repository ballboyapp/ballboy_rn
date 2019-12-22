import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';
import I18n from '../../../I18n';
import signupMutation from '../../../GraphQL/Users/Mutations/signup';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the SignupEmailForm and calls API to
 * authenticate the user.
 */
class SignupEmailApiCall extends React.PureComponent {
  handleSignup = async (inputFields) => {
    const { signup, onError, onSuccess } = this.props;
    const { name, email } = inputFields;

    // TODO: change from name to username
    console.log('HANDLE SIGNUP', name, email);
    try {
      const res = await signup({
        variables: {
          username: name,
          email,
          language: I18n.locale.substr(0, 2),
        },
      });
      console.log('SIGNUP RESPONSE', res);
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
      signupUser: this.handleSignup,
    };

    return children(api);
  }
}

SignupEmailApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  signup: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

SignupEmailApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

const enhance = compose(
  graphql(signupMutation, { name: 'signup' }),
);

export default enhance(SignupEmailApiCall);
