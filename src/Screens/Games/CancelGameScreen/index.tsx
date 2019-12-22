import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
import { Query } from 'react-apollo';
import { ACTIVITY_STATUSES } from '../../../constants';
import { addModelState } from '../../../utils';
import I18n from '../../../I18n';
import themeImages from '../../../Themes/Images';
import FormProps from '../../../RenderProps/form-props';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import CancelGameApiCall from '../../../Components/Games/CancelGameApiCall';
import CancelGameForm from '../../../Components/Games/CancelGameForm';
import ImageModal from '../../../Components/Common/Modals/ImageModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class CancelGameScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    addModelState(this, 'cancelDone');
  }

  get activityId() {
    const { navigation } = this.props;
    return navigation.state.params._id;
  }

  handleAttendeesPress = () => {
    const { navigation } = this.props;
    navigation.navigate('PlayersListScreen', { _id: this.activityId });
  }

  render() {
    const { navigation } = this.props;
    const cancelDoneModal = this.modals.cancelDone;

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
          <Query
            query={activityDetailsQuery}
            variables={{ _id: this.activityId }}
            fetchPolicy="network-only"
          >
            {({
              loading, error, data, refetch,
            }) => {
              if (loading) {
                return <CenteredActivityIndicator />;
              }
              if (error || !data || !data.activityDetails) {
                return null;
              }

              const { activityDetails } = data;
              const { isOrganizer } = activityDetails;

              // Only display cancel form if user is the organizer and the activity is active
              if (activityDetails.status !== ACTIVITY_STATUSES.ACTIVE || !isOrganizer) {
                return null;
              }

              const handleModalClose = () => {
                cancelDoneModal.hide();
                // Refetch activity data
                refetch();
                // Redirect user to activity display screen
                if (Platform.OS === 'web') {
                  navigation.navigate('GameDetailsScreen', { _id: this.activityId });
                } else {
                  navigation.goBack(null);
                }
              };

              return (
                <View style={{ flex: 1 }}>
                  <CancelGameApiCall
                    onError={handleServerError}
                    onSuccess={() => {
                      // Extend formProps.handleSuccess' default functionality
                      handleSuccess(cancelDoneModal.show);
                    }}
                  >
                    {({ cancelActivity }) => (
                      <CancelGameForm
                        activity={activityDetails}
                        disabled={disabled}
                        errors={errors}
                        onBeforeHook={handleBefore}
                        onClientCancelHook={handleClientCancel}
                        onClientErrorHook={handleClientError}
                        onSuccessHook={cancelActivity}
                        onAttendeesPress={this.handleAttendeesPress}
                      />
                    )}
                  </CancelGameApiCall>
                  <ImageModal
                    modalComponent="ConfirmModal"
                    src={themeImages.activityCancelledVisual}
                    title={I18n.t('cancelGameScreen.successCancelModal.title')}
                    visible={cancelDoneModal.isVisible}
                    okBtnLabel={I18n.t('cancelGameScreen.successCancelModal.okBtnLabel')}
                    onClose={handleModalClose}
                    onOk={handleModalClose}
                  />
                </View>
              );
            }}
          </Query>
        )}
      </FormProps>
    );
  }
}

CancelGameScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CancelGameScreen;
