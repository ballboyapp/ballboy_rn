import Constants from 'expo-constants';
import { Platform } from 'react-native';
import Sentry from '../services/sentry';

const { webSentryDsn, rnSentryDsn } = Constants.manifest.extra;

/**
 * @see {@link: https://docs.sentry.io/error-reporting/capturing/?platform=javascript}
 */

const ErrorsManager = {
  init() {
    const params = Platform.OS === 'web'
      ? { dsn: webSentryDsn }
      : { dsn: rnSentryDsn, enableInExpoDevelopment: true, debug: true };

    Sentry.init(params);
  },
  captureException(err) {
    console.log('ErrorsManager.captureException', err);
    Sentry.captureException(err);
  },
  captureMessage(msg) {
    console.log('ErrorsManager.captureMessage', msg);
    Sentry.captureMessage(msg);
  },
};

export default ErrorsManager;
