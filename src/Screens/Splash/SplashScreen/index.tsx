import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import FieldBackground from '../../../Backgrounds/FieldBackground';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import RaisedButton from '../../../Components/Common/RaisedButton';
import TapsCounter from '../../../Components/Common/TapsCounter';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.View`
  flex: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SplashScreen = ({ navigation }) => (
  <FieldBackground>
    <Spacer size="XXXL" />
    <Block>
      <TapsCounter
        onTapsReached={() => { navigation.navigate('DebugNav'); }}
      >
        <Text
          testID="splashText"
          size="L"
          // color="white"
          center
          style={{ fontSize: 30 }}
        >
          {I18n.t('splashScreen.title')}
        </Text>
      </TapsCounter>
    </Block>
    <FlexOne />
    <Block>
      <RaisedButton
        variant="primary"
        label={I18n.t('splashScreen.signupBtnLabel')}
        onPress={() => { navigation.navigate('SignupEmailScreen'); }}
      />
      <Spacer size="XL" />
      <RaisedButton
        variant="transparent"
        label={I18n.t('splashScreen.loginBtnLabel')}
        onPress={() => { navigation.navigate('LoginScreen'); }}
      />
    </Block>
    <Spacer size="XL" />
  </FieldBackground>
);

SplashScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SplashScreen;


// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components/native';
// import { compose } from 'recompose';
// import { withUser, userPropTypes } from '../../../Context/User';
// // import { withLocation, locationPropTypes } from '../../../Context/Location';
// import I18n from '../../../I18n';
// import FieldBackground from '../../../Backgrounds/FieldBackground';
// import Block from '../../../Components/Common/Block';
// // import Row from '../../../Components/Common/Row';
// import Spacer from '../../../Components/Common/Spacer';
// import Text from '../../../Components/Common/Text';
// import RaisedButton from '../../../Components/Common/RaisedButton';
// // import LinkNavigate from '../../../Components/Common/LinkNavigate';

// //------------------------------------------------------------------------------
// // STYLE:
// //------------------------------------------------------------------------------
// const FlexOne = styled.View`
//   flex: 1;
//   max-height: 32px;
// `;
// //------------------------------------------------------------------------------
// // COMPONENT:
// //------------------------------------------------------------------------------
// const SplashScreen  = ({ navigation, user /* , location */ }) => (
//   <FieldBackground>
//     <Block>
//       <Text
//         testID="splashText"
//         size="L"
//         color="white"
//         center
//         style={{ fontSize: 30 }}
//       >
//         {I18n.t('splashScreen.title')}
//       </Text>
//     </Block>
//     <FlexOne />
//     <Block>
//       <RaisedButton
//         variant="default"
//         label={I18n.t('splashScreen.signupBtnLabel')}
//         accessibilityLabel={I18n.t('splashScreen.signupBtnLabel')}
//         onPress={() => { navigation.navigate('SignupEmailScreen'); }}
//       />
//       <Spacer size="XL" />
//       <RaisedButton
//         variant="transparent"
//         label={I18n.t('splashScreen.loginBtnLabel')}
//         accessibilityLabel={I18n.t('splashScreen.loginBtnLabel')}
//         onPress={() => { navigation.navigate('LoginScreen'); }}
//       />
//       {/* {(!user || !user.uuid) && (
//         <Row justifyContent="center">
//           <LinkNavigate
//             testID="splashLoginButton"
//             navigation={navigation}
//             to="LoginScreen"
//             // to="SignupEmailScreen"
//             text={I18n.t('splashScreen.loginLink')}
//             color="white"
//             underline
//           />
//         </Row>
//       )} */}
//     </Block>
//     <Spacer size="XL" />
//   </FieldBackground>
// );

// SplashScreen.propTypes = {
//   user: userPropTypes.user,
//   // location: locationPropTypes.location,
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

// SplashScreen.defaultProps = {
//   user: null,
//   // location: null,
// };

// const enhance = compose(
//   withUser,
//   // withLocation,
// );

// export default enhance(SplashScreen);
