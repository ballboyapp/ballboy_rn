import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ModalProps from '../../../RenderProps/modal-props';
import CancelGameConfirmationModal from './index';

const Container = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <TouchableOpacity
          onPress={openModal}
          style={{ backgroundColor: 'red' }}
        >
          <Text style={{ textAlign: 'center' }}>
            Open
          </Text>
        </TouchableOpacity>
        <CancelGameConfirmationModal
          visible={visible}
          onClose={closeModal}
        />
      </View>
    )}
  </ModalProps>
);

const ContainerWithTimeout = () => (
  <ModalProps>
    {({ visible, openModal, closeModal }) => (
      <View>
        <TouchableOpacity
          onPress={() => {
            openModal();
            const handle = setTimeout(() => {
              closeModal();
              clearTimeout(handle);
            }, 2000);
          }}
          style={{ backgroundColor: 'red' }}
        >
          <Text style={{ textAlign: 'center' }}>
            Open
          </Text>
        </TouchableOpacity>
        <CancelGameConfirmationModal
          visible={visible}
          closable={false}
        />
      </View>
    )}
  </ModalProps>
);

storiesOf('Games.CancelGameConfirmationModal', module)
  .add('CancelGameConfirmationModal', () => <Container />)
  .add('CancelGameConfirmationModal with timeOut', () => <ContainerWithTimeout />);

