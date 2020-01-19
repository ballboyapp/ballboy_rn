import Constants from 'expo-constants';
import { Platform } from 'react-native';
import get from 'lodash/get';

const getGoogleMapsApiKey = () => {
  switch (Platform.OS) {
    case 'ios':
      return get(Constants, 'manifest.ios.config.googleMapsApiKey', '');
    case 'android':
      return get(Constants, 'manifest.android.config.googleMaps.apiKey', '');
    default:
      return get(Constants, 'manifest.extra.webGoogleMapsApiKey', '');
  }
};

export default getGoogleMapsApiKey;
