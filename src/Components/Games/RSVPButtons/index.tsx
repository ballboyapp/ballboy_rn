import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Platform, Alert } from 'react-native';
// import get from 'lodash/get';
import I18n from '../../../I18n';
import { ACTIVITY_STATUSES, ATTENDEE_ACTIONS } from '../../../constants';
// import { withUser, userPropTypes } from '../../../Context/User';
import activityDetailsFragment from '../../../GraphQL/Activities/Fragments/activityDetails';
import Block from '../../Common/Block';
// import Row from '../../Common/Row';
// import Spacer from '../../Common/Spacer';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class RSVPButtons extends React.PureComponent {
  handlePress = async ({ action }) => {
    const {
      activity,
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
    onSuccessHook({ activityId: activity._id, action });
  }

  openAlert = () => {
    if (Platform.OS === 'web') {
      const res = window.confirm(I18n.t('rsvpButtons.leaveAlert.body'));
      if (res) {
        this.handlePress({ action: ATTENDEE_ACTIONS.REMOVE });
      }
    } else {
      Alert.alert(
        I18n.t('rsvpButtons.leaveAlert.header'),
        I18n.t('rsvpButtons.leaveAlert.body'),
        [
          {
            text: I18n.t('rsvpButtons.leaveAlert.footer.cancelBtnLabel'),
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: I18n.t('rsvpButtons.leaveAlert.footer.okBtnLabel'),
            onPress: () => { this.handlePress({ action: ATTENDEE_ACTIONS.REMOVE }); },
          },
        ],
      );
    }
  }

  render() {
    const { activity, disabled } = this.props;

    const {
      status, capacity, attendeesIds, isAttendee,
    } = activity;

    const isCanceled = status === ACTIVITY_STATUSES.CANCELED;
    const isFinished = status === ACTIVITY_STATUSES.FINISHED;
    const isFull = capacity > 0 && capacity === attendeesIds.length;

    // Disable buttons if activity is full or canceled
    const isDiabled = isCanceled || isFinished || (isFull && !isAttendee);

    if (isAttendee) {
      return (
        <RaisedButton
          variant="warning"
          label={I18n.t('rsvpButtons.unattendingBtnLabel')}
          disabled={disabled || isDiabled}
          onPress={this.openAlert}
        />
      );
    }

    // When user status is NOT 'attending', display the join button
    return (
      <RaisedButton
        variant="primary"
        label={I18n.t('rsvpButtons.attendingBtnLabel')}
        disabled={disabled || isDiabled}
        onPress={() => {
          this.handlePress({ action: ATTENDEE_ACTIONS.ADD });
        }}
      />
    );
  }
}

RSVPButtons.propTypes = {
  activity: propType(activityDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

RSVPButtons.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default RSVPButtons;
