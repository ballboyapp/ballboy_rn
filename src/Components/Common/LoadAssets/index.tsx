import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from '@expo/vector-icons';
import React from 'react';
import PropTypes from 'prop-types';

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
      require('../../../../assets/images/logo.png'),
      require('../../../../assets/images/illustration-wizard-1.png'),
      require('../../../../assets/images/illustration-wizard-2.png'),
      require('../../../../assets/images/illustration-wizard-3.png'),
      require('../../../../assets/images/illustration-share-location.png'),
      require('../../../../assets/images/create-profile-avatar.png'),
      require('../../../../assets/images/spot-open-circle.png'),
      require('../../../../assets/images/activity-cancelled-visual.png'),
      require('../../../../assets/images/activity-success-visual.png'),
      require('../../../../assets/images/activity-confirm-visual.png'),
      require('../../../../assets/images/check-email.png'),
      require('../../../../assets/images/location-onboarding.png'),
      require('../../../../assets/images/link-expired.png'),
      require('../../../../assets/images/noactivities-illustration.png'),
      require('../../../../assets/icons/basketball.png'),
      require('../../../../assets/icons/volleyball.png'),
      require('../../../../assets/icons/volleyball.png'),
      require('../../../../assets/icons/football.png'),
      require('../../../../assets/icons/boules.png'),
      require('../../../../assets/icons/skating.png'),
      require('../../../../assets/icons/table_tennis.png'),
      require('../../../../assets/icons/tennis.png'),
      require('../../../../assets/icons/bootcamp.png'),
    ]),
    Font.loadAsync({
      'Rajdhani-Regular': require('../../../../assets/fonts/Rajdhani-Regular.ttf'),
      'Rajdhani-SemiBold': require('../../../../assets/fonts/Rajdhani-SemiBold.ttf'),
      'Rajdhani-Bold': require('../../../../assets/fonts/Rajdhani-Bold.ttf'),
      ...MaterialIcons.font,
      ...MaterialCommunityIcons.font,
      ...Ionicons.font,
      ...FontAwesome.font,
    }),
  ]);
};

class LoadAssets extends React.PureComponent {
  state = {
    isReady: false,
  }

  render() {
    const { children } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return children;
  }
}

LoadAssets.propTypes = {
  children: PropTypes.node,
};

LoadAssets.defaultProps = {
  children: null,
};

export default LoadAssets;
