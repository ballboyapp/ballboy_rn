import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { SPORTS } from '../../../../constants';
import I18n from '../../../../I18n';
import Text from '../../Text';
import SportsList from '../../SportsList';
import DialogModal from '../DialogModal';
import { SPORT_CARD_HEIGHT } from '../../SportCard';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportPickerModal = ({
  value,
  visible,
  onSelect,
  onClose,
}) => {
  const header = <Text size="ML">{I18n.t('sportPickerModal.header')}</Text>;

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      header={header}
      bodyHeight={7 * SPORT_CARD_HEIGHT}
    >
      <ScrollView>
        <SportsList
          selectedSport={value}
          onSportPress={onSelect}
        />
      </ScrollView>
    </DialogModal>
  );
};

SportPickerModal.propTypes = {
  value: PropTypes.oneOf(Object.values(SPORTS)),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

SportPickerModal.defaultProps = {
  value: null,
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default SportPickerModal;
