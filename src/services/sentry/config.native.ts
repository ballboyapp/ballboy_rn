import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';

const { rnSentryDsn } = Constants.manifest.extra;

const params = {
  dsn: rnSentryDsn,
  enableInExpoDevelopment: true,
  debug: true,
};

export default Sentry.init(params);
