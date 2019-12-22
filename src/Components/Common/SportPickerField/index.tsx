import React from 'react';
import PropTypes from 'prop-types';
import { SPORTS } from '../../../constants';
import I18n from '../../../I18n';
import ModalProps from '../../../RenderProps/modal-props';
import InputField from '../InputField';
import SportPickerModal from '../Modals/SportPickerModal';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportPickerField = ({ value, onChange, ...rest }) => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => [
      <InputField
        key="input-field"
        comp="TextField"
        value={(value && I18n.t(value)) || I18n.t('sportPickerField.defaultValue')}
        focusable={false}
        onPress={openModal}
        {...rest}
      />,
      <SportPickerModal
        key="modal"
        value={value}
        visible={visible}
        onSelect={(sport) => {
          // Pass event up to parent component
          onChange(sport);
          closeModal();
        }}
        onClose={closeModal}
      />,
    ]}
  </ModalProps>
);

SportPickerField.propTypes = {
  value: PropTypes.oneOf(Object.values(SPORTS)),
  onChange: PropTypes.func,
  // Plus all InputField props (theme, size)
};

SportPickerField.defaultProps = {
  value: null,
  onChange: () => {},
};

export default SportPickerField;
