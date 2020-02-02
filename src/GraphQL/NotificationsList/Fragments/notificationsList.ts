import gql from 'graphql-tag';
import notificationsListBaseFragment from './notificationsListBase';
import notificationUserProfileFragment from './notificationUserProfile';
import notificationFragment from './notification';

const notificationsListFragment = gql`
  fragment notificationsListFragment on NotificationsList {
    ...notificationsListBaseFragment
    recipient {
      ...notificationUserProfileFragment
    }
    items {
      ...notificationFragment
    }
  }
  ${notificationsListBaseFragment}
  ${notificationUserProfileFragment}
  ${notificationFragment}
`;

export default notificationsListFragment;
