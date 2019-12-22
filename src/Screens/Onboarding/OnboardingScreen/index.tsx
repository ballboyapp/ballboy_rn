import React from 'react';
import PropTypes from 'prop-types';
import {
  AsyncStorage,
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { withApollo } from 'react-apollo';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import UpdateUserApiCall from '../../../Components/Profile/UpdateUserApiCall';
import OnboardingForm from '../../../Components/Onboarding/OnboardingForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class OnboardingScreen extends React.Component {
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

    const { client } = this.props;

    Alert.alert(
      I18n.t('onboardingScreen.leaveAlert.header'),
      I18n.t('onboardingScreen.leaveAlert.body'),
      [
        {
          text: I18n.t('onboardingScreen.leaveAlert.footer.cancelBtnLabel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: I18n.t('onboardingScreen.leaveAlert.footer.okBtnLabel'),
          onPress: async () => {
            // Remove token from async storage and reset apollo store
            await AsyncStorage.removeItem('x-auth-token');
            await client.resetStore();
            // At this point loggedInRoute wrapper will kick-in
          },
        },
      ],
    );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation } = this.props;

    return (
      <FormProps>
        {({
          disabled,
          handleBefore,
          handleClientCancel,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <UpdateUserApiCall
            onError={handleServerError}
            onSuccess={() => {
              handleSuccess(() => {
                // client.resetStore();
                // No need to reset store, we are refetching privateUserQuery
                // inside the API call
                if (Platform.OS === 'web') {
                  console.log('OnboardingScreen navigate');
                  navigation.navigate('GamesListScreen');
                } else {
                  navigation.navigate('MainNav');
                }
              });
            }}
          >
            {({ updateUser }) => (
              <OnboardingForm
                disabled={disabled}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                onSuccessHook={updateUser}
              />
            )}
          </UpdateUserApiCall>
        )}
      </FormProps>
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(OnboardingScreen);
