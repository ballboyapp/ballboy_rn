// KEEP IN SYNC WITH SERVER CONSTANTS
// TODO: use ts enum instead
import { Platform, Dimensions } from 'react-native';

const { width: WW, height: WH } = Dimensions.get('window');

export const WINDOW_WIDTH = Platform.select({
  web: Math.min(WW, 600), // max-width for web
  default: WW,
});

export const WINDOW_HEIGHT = WH;

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  NL: 'nl',
};

export const SPORTS = {
  FOOTBALL: 'FOOTBALL',
  // VOLLEYBALL: 'VOLLEYBALL',
  BEACH_VOLLEYBALL: 'BEACH_VOLLEYBALL',
  TENNIS: 'TENNIS',
  TABLE_TENNIS: 'TABLE_TENNIS',
  ABSOLUTE_FRISBEE: 'ABSOLUTE_FRISBEE',
  BASKETBALL: 'BASKETBALL',
  BADMINTON: 'BADMINTON',
};

export const ACTIVITY_STATUSES = {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  FINISHED: 'FINISHED',
  DELETED: 'DELETED',
};

export const ATTENDEE_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
};

export const CHECK_EMAIL_ACTIONS = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
};

export const NOTIFICATION_TYPES = {
  NEW_ACTIVITY: 'NEW_ACTIVITY',
  ACTIVITY_CANCELED: 'ACTIVITY_CANCELED',
  ACTIVITY_RECREATED: 'ACTIVITY_RECREATED',
  ATTENDEE_ADDED: 'ATTENDEE_ADDED',
  ATTENDEE_REMOVED: 'ATTENDEE_REMOVED',
  NEW_MESSAGE: 'NEW_MESSAGE',
};
