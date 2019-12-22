import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Platform, Alert, View } from 'react-native';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import ErrorHandling from 'error-handling-utils';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';
import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import TextField from '../../Common/TextField';
// import AlertMsg from '../../Common/AlertMsg';
import RaisedButton from '../../Common/RaisedButton';
import GameProperties from '../GameProperties';
import ClickableAttendees from '../ClickableAttendees';
// import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const MAX_CHARS = 120;

const INIT_STATE = {
  cancelMsg: '',
};

const INIT_ERRORS = {
  cancelMsg: [],
};
//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameForm extends React.PureComponent {
  state = {
    ...cloneDeep(INIT_STATE),
    errors: cloneDeep(INIT_ERRORS),
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

  handleCancelMsgChange = (cancelMsg) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      cancelMsg,
      errors: ErrorHandling.clearErrors(errors, 'cancelMsg'),
    });
  }

  validateFields = ({ cancelMsg }) => {
    // Initialize errors
    const errors = cloneDeep(INIT_ERRORS);

    // Sanitize input
    const _cancelMsg = cancelMsg && cancelMsg.trim(); // eslint-disable-line no-underscore-dangle

    if (_cancelMsg.length > MAX_CHARS) {
      errors.cancelMsg.push('cancelGameForm.fields.cancelMsg.errors.tooLong');
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      activity,
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

    // Display confirm alert
    if (Platform.OS === 'web') {
      const res = window.confirm(I18n.t('cancelGameForm.confirmAlert.body'));
      if (res) {
        onSuccessHook({
          activityId: activity._id,
          ...pick(this.state, Object.keys(INIT_STATE)),
        });
        return;
      }
      onClientCancelHook();
    } else {
      Alert.alert(
        I18n.t('cancelGameForm.confirmAlert.header'),
        I18n.t('cancelGameForm.confirmAlert.body'),
        [
          {
            text: I18n.t('cancelGameForm.confirmAlert.footer.cancelBtnLabel'),
            onPress: () => {
              // Pass event up to parent component. onClientErrorHook will set 'disabled'
              // value back to 'false' so that the user can re-submit the form
              onClientCancelHook();
            },
            style: 'cancel',
          },
          {
            text: I18n.t('cancelGameForm.confirmAlert.footer.okBtnLabel'),
            onPress: () => {
              // Pass event up to parent component. onSuccessHook 'disabled'
              // value back to 'false' so that the user can re-submit the form
              onSuccessHook({
                activityId: activity._id,
                ...pick(this.state, Object.keys(INIT_STATE)),
              });
            },
          },
        ],
      );
    }
  }

  render() {
    const { activity, disabled, onAttendeesPress } = this.props;
    const { cancelMsg, errors } = this.state;

    const { attendees } = activity;

    // Apply translation and concatenate field errors (string)
    const cancelMsgErrors = ErrorHandling.getFieldErrors(errors, 'cancelMsg', I18n.t);

    return (
      <FlexOne>
        <TopLayout>
          <Block>
            <GameProperties activity={activity} />
          </Block>
          {attendees.length > 0 && (
            <View>
              <Divider />
              <Block>
                <Text size="M">
                  {I18n.t('cancelGameForm.attending')}
                </Text>
                <Spacer size="L" />
                <ClickableAttendees
                  attendees={attendees}
                  onAttendeesPress={onAttendeesPress}
                />
              </Block>
              <Divider />
              <Block>
                <TextField
                  testID="cancelGameFormCancelMsgField"
                  value={cancelMsg}
                  onChangeText={this.handleCancelMsgChange}
                  label={I18n.t('cancelMsg.label')}
                  placeholder={I18n.t('cancelMsg.placeholder')}
                  error={cancelMsgErrors}
                  multiline
                  characterRestriction={MAX_CHARS}
                  disabled={disabled}
                />
              </Block>
            </View>
          )}
        </TopLayout>
        <BottomLayout>
          <RaisedButton
            testID="cancelGameFormSubmitButton"
            variant="warning"
            label={I18n.t('cancelGameForm.btnLabel')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </BottomLayout>
      </FlexOne>
    );
  }
}

CancelGameForm.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

CancelGameForm.defaultProps = {
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default CancelGameForm;

// false && [
//   <Divider key="divider-alert-warning" />,
//   <Block key="alert-warning">
//     <AlertMsg
//       value={I18n.t('cancelGameForm.alertMsg')}
//       status="warning"
//     />
//   </Block>,
// ]
