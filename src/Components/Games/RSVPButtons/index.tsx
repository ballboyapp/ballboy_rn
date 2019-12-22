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
    const {
      // user,
      activity,
      joinLabel: JoinLabel,
      editPresenceLabel: EditPresenceLabel,
      disabled,
    } = this.props;

    const {
 status, capacity, attendeesIds, isAttendee 
} = activity;

    const isCanceled = status === ACTIVITY_STATUSES.CANCELED;
    const isFinished = status === ACTIVITY_STATUSES.FINISHED;
    const isFull = capacity > 0 && capacity === attendeesIds.length;

    // Don't display buttons if activity is full or canceled
    if (isCanceled || isFinished || (isFull && !isAttendee)) {
      return null;
    }

    // Attending and declined button
    // if (!userResp) {
    //   return (
    //     <Block>
    //       <JoinLabel />
    //       <Row>
    //         <RaisedButton
    //           style={{ flex: 1 }}
    //           variant="primary"
    //           label={I18n.t('rsvpButtons.attendingBtnLabel')}
    //           disabled={disabled}
    //           onPress={() => {
    //             this.handlePress(RESPONDENT_STATUSES.ATTENDING);
    //           }}
    //         />
    //         <Spacer row size="L" />
    //         <RaisedButton
    //           style={{ flex: 1 }}
    //           variant="ghost"
    //           label={I18n.t('rsvpButtons.unattendingBtnLabel')}
    //           disabled={disabled}
    //           onPress={() => {
    //             this.handlePress(RESPONDENT_STATUSES.DECLINED);
    //           }}
    //         />
    //       </Row>
    //     </Block>
    //   );
    // }

    if (isAttendee) {
      return (
        <Block>
          <EditPresenceLabel />
          <RaisedButton
            style={{ flex: 1 }}
            variant="ghost"
            label={I18n.t('rsvpButtons.unattendingBtnLabel')}
            disabled={disabled}
            onPress={this.openAlert}
          />
        </Block>
      );
    }

    // When user status is NOT 'attending', display the join button
    return (
      <Block>
        <JoinLabel />
        <RaisedButton
          style={{ flex: 1 }}
          variant="primary"
          label={I18n.t('rsvpButtons.attendingBtnLabel')}
          disabled={disabled}
          onPress={() => {
            this.handlePress({ action: ATTENDEE_ACTIONS.ADD });
          }}
        />
      </Block>
    );
  }
}

RSVPButtons.propTypes = {
  // user: userPropTypes.user.isRequired,
  activity: propType(activityDetailsFragment).isRequired,
  joinLabel: PropTypes.func,
  editPresenceLabel: PropTypes.func,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

RSVPButtons.defaultProps = {
  joinLabel: () => {},
  editPresenceLabel: () => {},
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSuccessHook: () => {},
};

export default RSVPButtons;
// export default withUser(RSVPButtons);


// import React from 'react';
// import PropTypes from 'prop-types';
// import { Alert } from 'react-native';
// import I18n from '../../../I18n';
// import { withUser, userPropTypes } from '../../../Context/User';
// import Row from '../../Common/Row';
// import RaisedButton from '../../Common/RaisedButton';
// import Spacer from '../../Common/Spacer';

// //------------------------------------------------------------------------------
// // CONSTANTS:
// //------------------------------------------------------------------------------
// const RSVP_STATUSES = {
//   ATTENDING: 'ATTENDING',
//   DECLINED: 'DECLINED',
// };
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// class RSVPButtons extends React.PureComponent {
//   handlePress = async (status) => {
//     const {
//       gameUUID,
//       userRSVP,
//       onBeforeHook,
//       onClientCancelHook,
//       onSuccessHook,
//     } = this.props;

//     // Run before logic if provided and return on error
//     try {
//       onBeforeHook();
//     } catch (exc) {
//       onClientCancelHook();
//       return; // return silently
//     }

//     // Pass event up to parent component
//     onSuccessHook({ gameUUID, userRSVP, status });
//   }

//   openAlert = () => {
//     Alert.alert(
//       I18n.t('rsvpButtons.leaveAlert.header'),
//       I18n.t('rsvpButtons.leaveAlert.body'),
//       [
//         {
//           text: I18n.t('rsvpButtons.leaveAlert.footer.cancelBtnLabel'),
//           onPress: () => {},
//           style: 'cancel',
//         },
//         {
//           text: I18n.t('rsvpButtons.leaveAlert.footer.okBtnLabel'),
//           onPress: () => { this.handlePress(RSVP_STATUSES.DECLINED); },
//         },
//       ],
//     );
//   }

//   render() {
//     const { userStatus, disabled } = this.props;

//     // Attending and declined button
//     if (!userStatus) {
//       return (
//         <Row>
//           <RaisedButton
//             style={{ flex: 1 }}
//             variant="primary"
//             label={I18n.t('rsvpButtons.attendingBtnLabel')}
//             disabled={disabled}
//             onPress={() => {
//               this.handlePress(RSVP_STATUSES.ATTENDING);
//             }}
//           />
//           <Spacer row size="L" />
//           <RaisedButton
//             style={{ flex: 1 }}
//             variant="warning"
//             label={I18n.t('rsvpButtons.unattendingBtnLabel')}
//             disabled={disabled}
//             onPress={() => {
//               this.handlePress(RSVP_STATUSES.DECLINED);
//             }}
//           />
//         </Row>
//       );
//     }

//     const isAttending = userStatus === RSVP_STATUSES.ATTENDING;

//     // When user status is 'attending', display the leave button
//     if (isAttending) {
//       return (
//         <RaisedButton
//           style={{ flex: 1 }}
//           variant="ghost"
//           label={I18n.t('rsvpButtons.unattendingBtnLabel')}
//           disabled={disabled}
//           onPress={this.openAlert}
//         />
//       );
//     }

//     // When user status is NOT 'attending', display the join button
//     return (
//       <RaisedButton
//         style={{ flex: 1 }}
//         variant="primary"
//         label={I18n.t('rsvpButtons.attendingBtnLabel')}
//         disabled={disabled}
//         onPress={() => {
//           this.handlePress(RSVP_STATUSES.ATTENDING);
//         }}
//       />
//     );
//   }
// }

// RSVPButtons.propTypes = {
//   gameUUID: PropTypes.string.isRequired,
//   userRSVP: PropTypes.object, // eslint-disable-line
//   userStatus: PropTypes.oneOf([
//     'UNKNOWN',
//     'ACCEPTED',
//     'ATTENDING',
//     'CHECKED_IN',
//     'DECLINED',
//     'INTERESTED',
//     'INVITED',
//   ]),
//   disabled: PropTypes.bool,
//   onBeforeHook: PropTypes.func,
//   onClientCancelHook: PropTypes.func,
//   onSuccessHook: PropTypes.func,
// };

// RSVPButtons.defaultProps = {
//   userRSVP: null,
//   userStatus: null,
//   disabled: false,
//   onBeforeHook: () => {},
//   onClientCancelHook: () => {},
//   onSuccessHook: () => {},
// };

// export default RSVPButtons;
