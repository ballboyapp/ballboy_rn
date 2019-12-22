import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import { Query } from 'react-apollo';
import FormProps from '../../../RenderProps/form-props';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
// import ShareGameApiCall from '../../../Components/PlanGame/ShareGameApiCall';
import ShareGameForm from '../../../Components/PlanGame/ShareGameForm';
import Text from '../../../Components/Common/Text';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ShareGameScreen extends React.Component {
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
      navigation.goBack(null);
    } else {
      // Go back to the begining of the stack
      navigation.popToTop();
      // Go back to main tabs navigation
      navigation.goBack(null);
    }

    // Alert.alert(
    //   I18n.t('shareGameScreen.leaveAlert.header'),
    //   I18n.t('shareGameScreen.leaveAlert.body'),
    //   [
    //     {
    //       text: I18n.t('shareGameScreen.leaveAlert.footer.cancelBtnLabel'),
    //       onPress: () => null,
    //       style: 'cancel',
    //     },
    //     {
    //       text: I18n.t('shareGameScreen.leaveAlert.footer.okBtnLabel'),
    //       onPress: () => {
    //         // Go back to the beginning of the stack
    //         navigation.popToTop();
    //         // Go back to main tabs navigation
    //         navigation.goBack(null);
    //       },
    //     },
    //   ],
    // );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation } = this.props;
    const activityId = navigation.state.params._id;

    return (
      <Query
        query={activityDetailsQuery}
        variables={{ _id: activityId }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <CenteredActivityIndicator />;
          }

          if (error || !data) {
            return <Text>Something went wrong :(</Text>;
          }

          const { activityDetails } = data;

          return (
            <FormProps>
              {({
                disabled,
                handleBefore,
                handleClientCancel,
                handleClientError,
                // handleServerError,
                handleSuccess,
              }) => (
                <ShareGameForm
                  activity={activityDetails}
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  onClientCancelHook={handleClientCancel}
                  onClientErrorHook={handleClientError}
                  onSuccessHook={() => {
                    handleSuccess(() => {
                      if (Platform.OS === 'web') {
                        navigation.navigate('GameDetailsScreen', { _id: activityId });
                      } else {
                        // Go back to the beginning of the stack
                        navigation.popToTop();
                        // Go back to main tabs navigation
                        navigation.goBack(null);
                        // Go to games list screen
                        navigation.navigate('GameSearchTab');
                        // Finally go to recently created game
                        navigation.navigate('GameDetailsScreen', { _id: activityId });
                      }
                    });
                  }}
                />
              )}
            </FormProps>
          );
        }}
      </Query>
    );
  }
}

ShareGameScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string,
      }),
    }).isRequired,
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }).isRequired,
};

export default ShareGameScreen;
