import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import FormProps from '../../../RenderProps/form-props';
import privateUserFragment from '../../../GraphQL/Users/Fragments/privateUser';
import AvatarPickerApiCall from '../AvatarPickerApiCall';
import AvatarPickerForm from '../AvatarPickerForm';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AvatarPicker = ({ user, onUploadSuccess }) => (
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
      <AvatarPickerApiCall
        onError={handleServerError}
        onSuccess={(avatar) => {
          handleSuccess(() => {
            // Pass event up to parent component
            onUploadSuccess(avatar);
          });
        }}
      >
        {({ uploadImg }) => (
          <AvatarPickerForm
            user={user}
            disabled={disabled}
            errors={errors}
            onBeforeHook={handleBefore}
            onClientCancelHook={handleClientCancel}
            onClientErrorHook={handleClientError}
            onSuccessHook={uploadImg}
          />
        )}
      </AvatarPickerApiCall>
    )}
  </FormProps>
);

AvatarPicker.propTypes = {
  user: propType(privateUserFragment).isRequired,
  onUploadSuccess: PropTypes.func,
};

AvatarPicker.defaultProps = {
  onUploadSuccess: () => {},
};

export default AvatarPicker;
