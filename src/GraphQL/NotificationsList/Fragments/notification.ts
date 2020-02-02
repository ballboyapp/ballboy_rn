import gql from 'graphql-tag';
import notificationUserProfileFragment from './notificationUserProfile';

const notificationFragment = gql`
  fragment notificationFragment on Notification {
    _id
    createdAt
    notificationType
    sender {
      ...notificationUserProfileFragment
    }
    payload
    didRead
  }
  ${notificationUserProfileFragment}
`;

export default notificationFragment;
