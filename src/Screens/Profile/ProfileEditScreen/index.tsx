import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View } from 'react-native';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import themeImages from '../../../Themes/Images';
import { withUser, userPropTypes } from '../../../Context/User';
import ModalProps from '../../../RenderProps/modal-props';
import FormProps from '../../../RenderProps/form-props';
import UpdateUserApiCall from '../../../Components/Profile/UpdateUserApiCall';
import EditProfileForm from '../../../Components/Profile/EditProfileForm';
import ImageModal from '../../../Components/Common/Modals/ImageModal';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfileEditScreen = ({ user /* , navigation */ }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
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
          <View style={{ flex: 1 }}>
            <UpdateUserApiCall
              onError={handleServerError}
              onSuccess={() => {
                handleSuccess(() => {
                  // OBS: we are refetching privateUserQuery at UpdateUserApiCall
                  openModal();
                  // navigation.goBack(null);
                });
              }}
            >
              {({ updateUser }) => (
                <Container>
                  <EditProfileForm
                    user={user}
                    disabled={disabled}
                    errors={errors}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    onSuccessHook={updateUser}
                  />
                </Container>
              )}
            </UpdateUserApiCall>
            <ImageModal
              modalComponent="ConfirmModal"
              src={themeImages.createProfileAvatar}
              title={I18n.t('editProfileScreen.editSuccessModal.title')}
              subtitle={I18n.t('editProfileScreen.editSuccessModal.subtitle')}
              visible={visible}
              okBtnLabel={I18n.t('editProfileScreen.editSuccessModal.okBtnLabel')}
              onClose={closeModal}
              onOk={closeModal}
            />
          </View>
        )}
      </FormProps>
    )}
  </ModalProps>
);

ProfileEditScreen.propTypes = {
  user: userPropTypes.user.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const enhance = compose(
  withUser,
);

export default enhance(ProfileEditScreen);
