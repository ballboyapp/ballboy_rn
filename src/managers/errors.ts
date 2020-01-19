import Sentry from '../services/sentry';

/**
 * @see {@link: https://docs.sentry.io/error-reporting/capturing/?platform=javascript}
 */

const ErrorsManager = {
  captureException(err) {
    Sentry.captureException(err);
  },
  captureMessage(msg) {
    Sentry.captureMessage(msg);
  },
};

export default ErrorsManager;
