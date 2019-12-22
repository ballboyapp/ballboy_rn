import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import validatePasscodeMutation from '../../../GraphQL/Users/Mutations/validatePasscode';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasscodeFormApiCall extends React.PureComponent {
  handleValidate = async ({ passcode }) => {
    const {
      email,
      onError,
      onSuccess,
      validatePasscode,
    } = this.props;

    try {
      const res = await validatePasscode({
        variables: {
          email,
          // passcode: parseInt(passcode, 10),
          passcode, // string
        },
      });

      console.log('validatePasscode res', res);

      onSuccess({ token: res.data.validatePasscode.token });
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
      validatePasscode: this.handleValidate,
    };

    return children(api);
  }
}

PasscodeFormApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  email: PropTypes.string.isRequired,
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
  validatePasscode: PropTypes.func.isRequired,
};

PasscodeFormApiCall.defaultProps = {
  onError: () => {},
  onSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(validatePasscodeMutation, { name: 'validatePasscode' });

export default withMutation(PasscodeFormApiCall);
