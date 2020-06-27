import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { ATTENDEE_ACTIONS } from '../../../constants';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import RSVPApiCall from '../../../Components/Games/RSVPApiCall';
import PlanGameApiCall from '../../../Components/PlanGame/PlanGameApiCall';
import PlanGameForm from '../../../Components/PlanGame/PlanGameForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: introduce RPSV_STATUSES in constants
class PlanGameScreen extends React.Component {
  // Handle android back button press
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  handleLeave = () => {
    Keyboard.dismiss();

    const { navigation } = this.props;

    if (Platform.OS === 'web') {
      const res = window.confirm(I18n.t('planGameScreen.leaveAlert.body'));
      if (res) {
        navigation.navigate('GamesListScreen');
      }
    } else {
      Alert.alert(
        I18n.t('planGameScreen.leaveAlert.header'),
        I18n.t('planGameScreen.leaveAlert.body'),
        [
          {
            text: I18n.t('planGameScreen.leaveAlert.footer.cancelBtnLabel'),
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: I18n.t('planGameScreen.leaveAlert.footer.okBtnLabel'),
            onPress: () => { navigation.goBack(null); },
          },
        ],
      );
    }

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation } = this.props;

    return (
      <FormProps>
        {({
          disabled,
          errors,
          handleBefore,
          handleClientCancel,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <RSVPApiCall
            onError={handleServerError}
            onSuccess={({ activityId }) => {
              // Extend formProps.handleSuccess' default functionality
              handleSuccess(() => {
                // Remove android back btn listener manually. Stack navigator won't
                // unmount this view until the whole create and share process is completed.
                // We still need the componentWillUnmount life cycle method in case the user
                // decides to leave the create flow.
                if (Platform.OS === 'android') {
                  BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
                }
                // Lastly, redirect user to share screen
                navigation.navigate('ShareGameScreen', { _id: activityId });
              });
            }}
          >
            {({ updateStatus }) => (
              <PlanGameApiCall
                onError={handleServerError}
                onSuccess={({ activityId }) => {
                  // Automatically add organizer (current logged in user) to the list of players
                  updateStatus({ activityId, action: ATTENDEE_ACTIONS.ADD });
                }}
              >
                {({ createActivity }) => (
                  <PlanGameForm
                    disabled={disabled}
                    errors={errors}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    onSuccessHook={createActivity}
                    onLeave={this.handleLeave}
                  />
                )}
              </PlanGameApiCall>
            )}
          </RSVPApiCall>
        )}
      </FormProps>
    );
  }
}

PlanGameScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlanGameScreen;
