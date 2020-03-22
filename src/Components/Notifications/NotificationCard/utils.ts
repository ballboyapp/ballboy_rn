import { NOTIFICATION_TYPES } from '../../../constants';

export const getNotificationIcon = (notificationType: string): string => {
  switch (notificationType) {
    case NOTIFICATION_TYPES.NEW_MESSAGE:
      return 'forum';
    case NOTIFICATION_TYPES.ATTENDEE_ADDED:
    case NOTIFICATION_TYPES.ATTENDEE_REMOVED:
    case NOTIFICATION_TYPES.ACTIVITY_RECREATED:
      return 'message-alert';
    default:
      throw new Error('Unknown notificationType');
  }
};

export const getNotificationTypeText = (notificationType: string): [string, string] => {
  switch (notificationType) {
    case NOTIFICATION_TYPES.NEW_MESSAGE:
      return [
        'notificationCard.eventType.message',
        'notificationCard.eventDescription.leftMessage',
      ];
    case NOTIFICATION_TYPES.ATTENDEE_ADDED:
      return [
        'notificationCard.eventType.update',
        'notificationCard.eventDescription.attendingActivity',
      ];
    case NOTIFICATION_TYPES.ATTENDEE_REMOVED:
      return [
        'notificationCard.eventType.update',
        'notificationCard.eventDescription.leftActivity',
      ];
    case NOTIFICATION_TYPES.ACTIVITY_RECREATED:
      return [
        'notificationCard.eventType.update',
        'notificationCard.eventDescription.activityRecreated',
      ];
    default:
      throw new Error('Unknown notificationType');
  }
};
