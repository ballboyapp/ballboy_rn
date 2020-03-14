import Constants from 'expo-constants';
import React from 'react';
import PropTypes from 'prop-types';
import { View, AsyncStorage } from 'react-native';
import { withApollo } from 'react-apollo';
import I18n from '../../../I18n';
import LogoHeaderBackground from '../../../Backgrounds/LogoHeaderBackground';
import Block from '../../../Components/Common/Block';
import Spacer from '../../../Components/Common/Spacer';
import Divider from '../../../Components/Common/Divider';
import Text from '../../../Components/Common/Text';
import LinkOpenURL from '../../../Components/Common/LinkOpenURL';
import LinkNavigate from '../../../Components/Common/LinkNavigate';
import TapsCounter from '../../../Components/Common/TapsCounter';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { version, extra } = Constants.manifest;
const { feedbackUrl, privacyUrl, termsUrl } = extra;

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SettingsScreen = ({ navigation, client }) => {
  const handleLogout = async () => {
    // Remove token from async storage and reset apollo store
    await AsyncStorage.removeItem('x-auth-token');
    await client.resetStore();
    navigation.navigate('SplashScreen');
  };

  return (
    <LogoHeaderBackground>
      <TapsCounter onTapsReached={() => { navigation.navigate('DebugNav'); }}>
        <Text size="M" center>
          {`${I18n.t('settingsScreen.appVersion')} ${version}`}
        </Text>
      </TapsCounter>
      <Spacer size="XXL" />
      <Divider />
      {!!feedbackUrl && (
      <View>
        <Block midHeigh>
          <LinkOpenURL
            text={I18n.t('settingsScreen.feedback')}
            href={feedbackUrl}
            iconSet="MaterialIcons"
            iconName="chat"
          />
        </Block>
        <Divider />
      </View>
      )}
      <Block midHeigh>
        <LinkOpenURL
          text={I18n.t('settingsScreen.privacy')}
          href={privacyUrl}
          iconSet="MaterialCommunityIcons"
          iconName="shield-account"
        />
      </Block>
      <Divider />
      <Block midHeigh>
        <LinkOpenURL
          text={I18n.t('settingsScreen.terms')}
          href={termsUrl}
          iconSet="MaterialIcons"
          iconName="info"
        />
      </Block>
      <Divider />
      <Block midHeigh>
        <LinkNavigate
          text={I18n.t('settingsScreen.logout')}
          onPress={handleLogout}
          iconSet="MaterialCommunityIcons"
          iconName="exit-to-app"
        />
      </Block>
      <Divider />
    </LogoHeaderBackground>
  );
};

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(SettingsScreen);
