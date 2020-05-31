import { NOTIFICATION_TYPES } from '../../../constants';

const getNotificationTypeText = (notificationType: string): string => {
  switch (notificationType) {
    case NOTIFICATION_TYPES.NEW_MESSAGE:
      return 'notificationCard.eventDescription.leftMessage';
    case NOTIFICATION_TYPES.ATTENDEE_ADDED:
      return 'notificationCard.eventDescription.attendingActivity';
    case NOTIFICATION_TYPES.ATTENDEE_REMOVED:
      return 'notificationCard.eventDescription.leftActivity';
    case NOTIFICATION_TYPES.ACTIVITY_RECREATED:
      return 'notificationCard.eventDescription.activityRecreated';
    case NOTIFICATION_TYPES.NEW_ACTIVITY:
      return '';
    default:
      throw new Error(`Unknown notificationType ${notificationType}`);
  }
};

export default getNotificationTypeText;
