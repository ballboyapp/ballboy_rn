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
        <Text.L>{I18n.t('Sign up')}!</Text.L>
        <Spacer size="XXL" />
        <Text.M>{I18n.t('Sign up and start sporting')}</Text.M>
      </Center>
      <Spacer size="L" />
      <ButtonContainer>
        <RaisedButton
          testID="profileButtonSignup"
          label={I18n.t('Register')}
          status="default"
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DefaultButton from '../../../Components/Common/DefaultButton';
import Text from '../../../Components/Common/Text';
import I18n from '../../../I18n/index';
import images from '../../../Themes/Images';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const CloseBtnContainer = styled.View`
  height: 55;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
`;
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
// TODO: use closableLayout
const LoggedOutScreen = ({ closable, onClose, navigation }) => [
  closable && (
    <CloseBtnContainer key="close-btn">
      <TouchableOpacity onPress={onClose}>
        <Icon name="close" size={24} color="black" />
      </TouchableOpacity>
    </CloseBtnContainer>
  ),
  <MainContainer key="content">
    <Center>
      <Image source={images.createProfileAvatar} />
      <View style={{ height: 32 }} />
      <Text.L>{I18n.t('Sign up')}!</Text.L>
      <View style={{ height: 32 }} />
      <Text.M>{I18n.t('Sign up and start sporting')}</Text.M>
    </Center>
    <ButtonContainer>
      <DefaultButton
        testID="profileButtonSignup"
        onPress={() => { navigation.navigate('SignupScreen'); }}
        text={I18n.t('Register')}
      />
    </ButtonContainer>
    <TouchableOpacity
      onPress={() => { navigation.navigate('LoginScreen'); }}
    >
      <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
    </TouchableOpacity>
  </MainContainer>,
];

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

*/