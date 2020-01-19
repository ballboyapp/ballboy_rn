import Constants from 'expo-constants';
import * as Sentry from '@sentry/browser';

const { webSentryDsn } = Constants.manifest.extra;

const params = { dsn: webSentryDsn };

export default Sentry.init(params);
