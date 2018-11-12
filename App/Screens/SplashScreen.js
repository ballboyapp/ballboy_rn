import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { withUser, userPropTypes } from '../Context/User';
import I18n from '../I18n/index';
import Colors from '../Themes/Colors';
import FieldBackground from '../Backgrounds/FieldBackground';
import Block from '../Components/Common/Block';
import Spacer from '../Components/Common/Spacer';
import Text from '../Components/Common/Text';
import RaisedButton from '../Components/Common/RaisedButton';
import globalRefs, { addGlobalRef } from '../globalRefs';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Label = styled(Text.ML)`
  color: ${Colors.white}
  text-align: center;
  font-size: 30px;
`;
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
const LinkLabel = styled(Text.M)`
  color: ${Colors.white}
  text-align: center;
  text-decoration-line: underline;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SplashScreen extends React.Component {
  componentWillMount() {
    this.forwardIfLoggedIn(this.props);
  }

  async componentDidMount() {
    globalRefs.SplashScreen = this;
  }

  componentWillReceiveProps(props) {
    this.forwardIfLoggedIn(props);
  }

  forwardIfLoggedIn = (props) => {
    const { navigation } = this.props;
    if (props.user && props.user.uuid) {
      navigation.navigate('MainNav');
    }
  };

  render() {
    const { navigation, user, firstRun } = this.props;

    return (
      <FieldBackground>
        <Label testID="splashText">
          {I18n.t('Discover sport locations and activities near you')}
        </Label>
        <FlexOne />
        <Block>
          <RaisedButton
            testID="start"
            variant="default"
            label={I18n.t('Start discovering')}
            accessibilityLabel={I18n.t('Start discovering')}
            onPress={() => {
              navigation.navigate(firstRun ? 'OnboardingScreen' : 'MainNav');
            }}
          />
          <Spacer size="XL" />
          {(!user || !user.uuid) && (
            <TouchableOpacity
              testID="splashLoginButton"
              onPress={() => { navigation.navigate('LoginScreen'); }}
            >
              <LinkLabel>{I18n.t('Already signed up? Log in')}</LinkLabel>
            </TouchableOpacity>
          )}
        </Block>
        <Spacer size="XL" />
      </FieldBackground>
    );
  }
}

SplashScreen.propTypes = {
  user: userPropTypes.user,
  firstRun: userPropTypes.firstRun,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SplashScreen.defaultProps = {
  firstRun: false,
  user: null,
};

export default withUser(SplashScreen);
