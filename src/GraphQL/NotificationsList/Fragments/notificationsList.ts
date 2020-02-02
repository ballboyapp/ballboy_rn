import gql from 'graphql-tag';
import notificationUserProfileFragment from './notificationUserProfile';
import notificationFragment from './notification';

const notificationsListFragment = gql`
  fragment notificationsListFragment on NotificationsList {
    _id
    recipient {
      ...notificationUserProfileFragment
    }
    unreadCounter
    items {
      ...notificationFragment
    }
  }
  ${notificationUserProfileFragment}
  ${notificationFragment}
`;

export default notificationsListFragment;
