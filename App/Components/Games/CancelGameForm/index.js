import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { propType } from 'graphql-anywhere';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';
import Label from '../../Common/Label';
import AlertMsg from '../../Common/AlertMsg';
import RaisedButton from '../../Common/RaisedButton';
import GameProperties from '../GameProperties';
import ClickableAttendees from '../ClickableAttendees';
import CancelMsg from '../CancelMsg';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;

const INIT_STATE = {
  cancelMsg: '',
};

const INIT_ERRORS = {
  cancelMsg: [],
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameForm extends React.PureComponent {
  state = {
    ...cloneDeep(INIT_STATE),
    errors: cloneDeep(INIT_ERRORS),
  }

  // TODO: display server side errors

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
      game,
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
              gameUUID: game.uuid,
              ...pick(this.state, Object.keys(INIT_STATE)),
            });
          },
        },
      ],
    );
  }

  render() {
    const { game, disabled, onAttendeesPress } = this.props;
    const { cancelMsg, errors } = this.state;

    const attendees = getAttendees(game.attendees);

    // Apply translation and concatenate field errors (string)
    const cancelMsgErrors = ErrorHandling.getFieldErrors(errors, 'cancelMsg', I18n.t);

    return [
      <TopLayout key="top">
        <Block>
          <GameProperties game={game} />
        </Block>
        {attendees.length > 0 && [
          <Divider key="divider-game-attendees" />,
          <Block key="game-attendees">
            <Label>{I18n.t('cancelGameForm.attending')}</Label>
            <ClickableAttendees
              attendees={attendees}
              onAttendeesPress={onAttendeesPress}
            />
          </Block>,
          <Divider key="divider-cancel-msg" />,
          <Block key="cancel-msg">
            <CancelMsg
              value={cancelMsg}
              disabled={disabled}
              characterRestriction={MAX_CHARS}
              onChangeText={this.handleCancelMsgChange}
              error={cancelMsgErrors}
            />
          </Block>,
          false && [
            <Divider key="divider-alert-warning" />,
            <Block key="alert-warning">
              <AlertMsg
                value={I18n.t('cancelGameForm.alertMsg')}
                status="warning"
              />
            </Block>,
          ],
        ]}
      </TopLayout>,
      <BottomLayout key="bottom">
        <RaisedButton
          testID="cancelGameFormCancelButton"
          variant="warning"
          label={I18n.t('cancelGameForm.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </BottomLayout>,
    ];
  }
}

CancelGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

CancelGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default CancelGameForm;


/*
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { propType } from 'graphql-anywhere';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';
import Label from '../../Common/Label';
import AlertMsg from '../../Common/AlertMsg';
import RaisedButton from '../../Common/RaisedButton';
import GameProperties from '../GameProperties';
import ClickableAttendees from '../ClickableAttendees';
import CancelMsg from '../CancelMsg';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameForm extends React.PureComponent {
  state = {
    cancelMsg: '',
    errors: {
      cancelMsg: [],
    },
  }

  clearErrors = () => {
    this.setState({ errors: { cancelMsg: [] } });
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
    const errors = {
      cancelMsg: [],
    };

    // Sanitize input
    const _cancelMsg = cancelMsg && cancelMsg.trim(); // eslint-disable-line no-underscore-dangle

    if (_cancelMsg.length > MAX_CHARS) {
      errors.cancelMsg.push('cancelGameForm.fields.cancelMsg.errors.tooLong');
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      game,
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

    // Get field values
    const { cancelMsg } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ cancelMsg });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Display confirm alert
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
            onSuccessHook({ gameUUID: game.uuid, cancelMsg });
          },
        },
      ],
    );
  }

  render() {
    const { game, disabled, onAttendeesPress } = this.props;
    const { cancelMsg, errors } = this.state;

    const attendees = getAttendees(game.attendees);

    // Apply translation and concatenate field errors (string)
    const cancelMsgErrors = ErrorHandling.getFieldErrors(errors, 'cancelMsg', I18n.t);

    return [
      <TopLayout key="top">
        <Block>
          <GameProperties game={game} />
        </Block>
        {attendees.length > 0 && [
          <Divider key="divider-game-attendees" />,
          <Block key="game-attendees">
            <Label>{I18n.t('cancelGameForm.attending')}</Label>
            <ClickableAttendees
              attendees={attendees}
              onAttendeesPress={onAttendeesPress}
            />
          </Block>,
          <Divider key="divider-cancel-msg" />,
          <Block key="cancel-msg">
            <CancelMsg
              value={cancelMsg}
              disabled={disabled}
              characterRestriction={MAX_CHARS}
              onChangeText={this.handleCancelMsgChange}
              error={cancelMsgErrors}
            />
          </Block>,
          false && [
            <Divider key="divider-alert-warning" />,
            <Block key="alert-warning">
              <AlertMsg
                value={I18n.t('cancelGameForm.alertMsg')}
                status="warning"
              />
            </Block>,
          ],
        ]}
      </TopLayout>,
      <BottomLayout key="bottom">
        <RaisedButton
          testID="cancelGameFormCancelButton"
          variant="warning"
          label={I18n.t('cancelGameForm.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </BottomLayout>,
    ];
  }
}

CancelGameForm.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  onAttendeesPress: PropTypes.func,
};

CancelGameForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
  onAttendeesPress: () => {},
};

export default CancelGameForm;

*/