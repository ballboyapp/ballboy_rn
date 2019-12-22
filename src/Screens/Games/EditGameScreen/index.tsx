import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View, BackHandler } from 'react-native';
import { Query } from 'react-apollo';
import { ACTIVITY_STATUSES } from '../../../constants';
import { addModelState } from '../../../utils';
import I18n from '../../../I18n';
import themeImages from '../../../Themes/Images';
import FormProps from '../../../RenderProps/form-props';
import activityDetailsQuery from '../../../GraphQL/Activities/Queries/activityDetails';
import CenteredActivityIndicator from '../../../Components/Common/CenteredActivityIndicator';
import EditGameApiCall from '../../../Components/Games/EditGameApiCall';
import EditGameForm from '../../../Components/Games/EditGameForm';
import ImageModal from '../../../Components/Common/Modals/ImageModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditGameScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    addModelState(this, 'editDone');
  }

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
    const { onLeave } = this.props;
    // Pass event up to parent component
    onLeave();

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { navigation } = this.props;
    const editDoneModal = this.modals.editDone;

    const activityId = navigation.state.params._id;

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
            variables={{ _id: activityId }}
            fetchPolicy="network-only"
          >
            {({ loading, error, data }) => {
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
                editDoneModal.hide();
                // Refetch activity data
                // refetch();
                // Redirect user to activity display screen
                if (Platform.OS === 'web') {
                  navigation.navigate('GameDetailsScreen', { _id: activityId });
                } else {
                  navigation.goBack(null);
                }
              };

              return (
                <View style={{ flex: 1 }}>
                  <EditGameApiCall
                    onError={handleServerError}
                    onSuccess={() => { handleSuccess(editDoneModal.show); }}
                  >
                    {({ updateGame }) => (
                      <EditGameForm
                        activity={activityDetails}
                        disabled={disabled}
                        errors={errors}
                        onBeforeHook={handleBefore}
                        onClientCancelHook={handleClientCancel}
                        onClientErrorHook={handleClientError}
                        onSuccessHook={updateGame}
                      />
                    )}
                  </EditGameApiCall>
                  <ImageModal
                    modalComponent="ConfirmModal"
                    src={themeImages.activitySuccessVisual}
                    title={I18n.t('editGameScreen.editSuccessModal.title')}
                    subtitle={I18n.t('editGameScreen.editSuccessModal.subtitle')}
                    visible={editDoneModal.isVisible}
                    okBtnLabel={I18n.t('editGameScreen.editSuccessModal.okBtnLabel')}
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

EditGameScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        _id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onLeave: PropTypes.func,
};

EditGameScreen.defaultProps = {
  onLeave: () => {},
};

export default EditGameScreen;
