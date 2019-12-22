import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components/native';
import I18n from '../../../../I18n';
import { SPORTS } from '../../../../constants';
import spotFragment from '../../../../GraphQL/Spots/Fragments/spot';
import Text from '../../Text';
import SpotsList from '../../../Spots/SpotsList';
import DialogModal from '../DialogModal';

//------------------------------------------------------------------------------
const Container = styled.View`
  padding: 0 8px;
  background-color: ${({ theme }) => theme.colors.concrete}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: probably move maxDistance to SpotsList and get said value from context
const SpotPickerModal = ({
  value,
  sport,
  visible,
  onSelect,
  onClose,
}) => {
  const header = <Text size="ML">{I18n.t('spotPickerModal.header')}</Text>;

  return (
    <DialogModal
      visible={visible}
      onClose={onClose}
      header={header}
    >
      <Container>
        <SpotsList
          cardComponent="SpotListCardSmall"
          sports={sport ? [sport] : []} // empty array will return all spots
          // maxDistance={maxDistance} // km
          selectedSpot={value}
          onCardPress={onSelect}
        />
      </Container>
    </DialogModal>
  );
};

SpotPickerModal.propTypes = {
  value: propType(spotFragment),
  sport: PropTypes.oneOf(Object.values(SPORTS)),
  visible: PropTypes.bool,
  onSelect: PropTypes.func,
  onClose: PropTypes.func,
};

SpotPickerModal.defaultProps = {
  value: null,
  sport: null,
  visible: false,
  onSelect: () => {},
  onClose: () => {},
};

export default SpotPickerModal;
