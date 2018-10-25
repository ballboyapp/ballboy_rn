import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import I18n from '../../../I18n/index';
import images from '../../../Themes/Images';
import ClosableLayout from '../../../Components/Layouts/ClosableLayout';
import RaisedButton from '../../../Components/Common/RaisedButton';
import Text from '../../../Components/Common/Text';
import Spacer from '../../../Components/Common/Spacer';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const MainContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  align-items: center;
`;
//------------------------------------------------------------------------------
const ButtonContainer = styled.View`
  align-self: stretch;
`;
//------------------------------------------------------------------------------
const LinkLabel = styled(Text.M)`
  text-align: center;
  text-decoration-line: underline;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LoggedOutScreen = ({ closable, onClose, navigation }) => (
  <ClosableLayout
    theme="black"
    closable={closable}
    onClose={onClose}
  >
    <MainContainer key="content">
      <Center>
        <Image source={images.createProfileAvatar} />
        <Spacer size="XXL" />
        <Text.L>{`${I18n.t('Sign up')}!`}</Text.L>
        <Spacer size="XXL" />
        <Text.M>{I18n.t('Sign up and start sporting')}</Text.M>
      </Center>
      <Spacer size="L" />
      <ButtonContainer>
        <RaisedButton
          testID="profileButtonSignup"
          label={I18n.t('Register')}
          variant="default"
          onPress={() => { navigation.navigate('SignupScreen'); }}
        />
      </ButtonContainer>
      <Spacer size="L" />
      <TouchableOpacity
        onPress={() => { navigation.navigate('LoginScreen'); }}
      >
        <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
      </TouchableOpacity>
    </MainContainer>
  </ClosableLayout>
);

LoggedOutScreen.propTypes = {
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

LoggedOutScreen.defaultProps = {
  closable: false,
  onClose: () => {},
};

export default withNavigation(LoggedOutScreen);
