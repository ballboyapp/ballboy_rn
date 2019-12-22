import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import ErrorHandling from 'error-handling-utils';
import isEmail from 'validator/lib/isEmail';
import I18n from '../../../I18n';
import Block from '../../Common/Block';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const MAX_CHARS = 74;

const INIT_STATE = {
  email: '',
};

const INIT_ERRORS = {
  email: [],
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LoginEmailForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { email } = props;

    this.state = {
      ...cloneDeep(INIT_STATE),
      email,
      errors: cloneDeep(INIT_ERRORS),
    };
  }

  componentWillReceiveProps({ errors }) {
    // Display (server side) errors coming from parent component
    if (errors) {
      this.setState({
        errors: {
          ...cloneDeep(INIT_ERRORS),
          ...errors,
        },
      });
    }
  }

  clearErrors = () => {
    this.setState({ errors: cloneDeep(INIT_ERRORS) });
  };

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({ email }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    // Sanitize input
    const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

    if (!_email) {
      errors.email.push('loginEmailForm.fields.email.errors.required');
    } else if (_email.length > MAX_CHARS) {
      errors.email.push('loginEmailForm.fields.email.errors.tooLong');
    } else if (!isEmail(_email)) {
      errors.email.push('loginEmailForm.fields.email.errors.invalid');
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      onBeforeHook,
      onClientCancelHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(this.state);

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook(pick(this.state, Object.keys(INIT_STATE)));
  }

  render() {
    const { disabled } = this.props;
    const { email, errors } = this.state;

    // Apply translation and concatenate field errors (string)
    const emailErrors = ErrorHandling.getFieldErrors(errors, 'email', I18n.t);

    return (
      <View testID="LoginScreen">
        <Block midHeight>
          <TextField
            testID="loginInputEmail"
            label={I18n.t('loginEmailForm.fields.email.label')}
            placeholder={I18n.t('loginEmailForm.fields.email.placeholder')}
            value={email}
            error={emailErrors}
            size="ML"
            disabled={disabled}
            keyboardType="email-address"
            // autoFocus
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'email', value });
            }}
          />
        </Block>
        <Block>
          <RaisedButton
            testID="loginSubmitButton"
            variant="default"
            label={I18n.t('loginEmailForm.btnLabel')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </Block>
      </View>
    );
  }
}

LoginEmailForm.propTypes = {
  email: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

LoginEmailForm.defaultProps = {
  email: '',
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default LoginEmailForm;
