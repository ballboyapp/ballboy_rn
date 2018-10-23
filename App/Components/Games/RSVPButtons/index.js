import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import I18n from '../../../I18n';
import Row from '../../Common/Row';
import RaisedButton from '../../Common/RaisedButton';
import Spacer from '../../Common/Spacer';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const RSVP_STATUSES = {
  ATTENDING: 'ATTENDING',
  DECLINED: 'DECLINED',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class RSVPButtons extends React.PureComponent {
  handlePress = async (status) => {
    const {
      gameUUID,
      userRSVP,
      onBeforeHook,
      onClientCancelHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Pass event up to parent component
    onSuccessHook({ gameUUID, userRSVP, status });
  }

  openAlert = () => {
    Alert.alert(
      I18n.t('Confirm'),
      I18n.t('Are you sure you want to stop attending?'),
      [
        { text: I18n.t('No'), onPress: () => { console.log('Cancel Pressed'); }, style: 'cancel' },
        { text: I18n.t('Yes'), onPress: () => { this.handlePress(RSVP_STATUSES.DECLINED); } },
      ],
    );
  }

  render() {
    const { userStatus, disabled } = this.props;

    // Attending and declined button
    if (!userStatus) {
      return (
        <Row>
          <RaisedButton
            style={{ flex: 1 }}
            status="primary"
            label={I18n.t("I'm attending")}
            disabled={disabled}
            onPress={() => {
              this.handlePress(RSVP_STATUSES.ATTENDING);
            }}
          />
          <Spacer row size="L" />
          <RaisedButton
            style={{ flex: 1 }}
            status="warning"
            label={I18n.t("I'm not attending")}
            disabled={disabled}
            onPress={() => {
              this.handlePress(RSVP_STATUSES.DECLINED);
            }}
          />
        </Row>
      );
    }

    const isAttending = userStatus === RSVP_STATUSES.ATTENDING;

    // When user status is 'attending', display the leave button
    if (isAttending) {
      return (
        <RaisedButton
          style={{ flex: 1 }}
          status="ghost"
          label={I18n.t("I'm not attending")}
          disabled={disabled}
          onPress={this.openAlert}
        />
      );
    }

    // When user status is NOT 'attending', display the join button
    return (
      <RaisedButton
        style={{ flex: 1 }}
        status="primary"
        label={I18n.t("I'm attending")}
        disabled={disabled}
        onPress={() => {
          this.handlePress(RSVP_STATUSES.ATTENDING);
        }}
      />
    );
  }
}

RSVPButtons.propTypes = {
  gameUUID: PropTypes.string.isRequired,
  userRSVP: PropTypes.object, // eslint-disable-line
  userStatus: PropTypes.oneOf([
    'UNKNOWN',
    'ACCEPTED',
    'ATTENDING',
    'CHECKED_IN',
    'DECLINED',
    'INTERESTED',
    'INVITED',
  ]),
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

RSVPButtons.defaultProps = {
  userRSVP: null,
  userStatus: null,
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default RSVPButtons;
