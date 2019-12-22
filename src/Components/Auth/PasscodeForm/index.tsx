import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import ErrorHandling from 'error-handling-utils';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import Row from '../../Common/Row';
import Block from '../../Common/Block';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
// export const PASS_CODE_LENGTH = 6;

const INIT_STATE = {
  passcode: '',
};

const INIT_ERRORS = {
  passcode: [],
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1; /* full-width */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PasscodeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...cloneDeep(INIT_STATE),
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

  validateFields = ({ passcode }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    // Sanitize input
    const _passcode = passcode && passcode.trim(); // eslint-disable-line no-underscore-dangle

    if (!_passcode) {
      errors.passcode.push('Pass code is required!');
    } /* else if (_passcode.length !== PASS_CODE_LENGTH) {
      errors.passcode.push(`Pass code must be ${PASS_CODE_LENGTH} characters long`);
    } */

    return errors;
  }

  handleSubmit = () => {
    const {
      onBeforeHook,
      onClientErrorHook,
      onClientCancelHook,
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
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook(pick(this.state, Object.keys(INIT_STATE)));
  }

  render() {
    const { placeholder, btnLabel, disabled } = this.props;
    const { passcode, errors } = this.state;

    // Apply translation and concatenate field errors (string)
    const passcodeErrors = ErrorHandling.getFieldErrors(errors, 'passcode', I18n.t);

    return (
      <Row testID="LoginScreen">
        <FlexOne>
          <Block midHeight>
            <TextField
              // id="passcode"
              type="text"
              placeholder={placeholder}
              value={passcode}
              error={passcodeErrors}
              size="ML"
              disabled={disabled}
              keyboardType="number-pad"
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'passcode', value });
              }}
            />
          </Block>
          <Block>
            <RaisedButton
              variant="default"
              label={btnLabel}
              disabled={disabled}
              onPress={this.handleSubmit}
            />
          </Block>
        </FlexOne>
      </Row>
    );
  }
}

PasscodeForm.propTypes = {
  placeholder: PropTypes.string,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PasscodeForm.defaultProps = {
  placeholder: 'Enter passcode',
  btnLabel: 'Submit',
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default PasscodeForm;
