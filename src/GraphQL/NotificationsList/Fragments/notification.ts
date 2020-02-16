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
    payload # BE CAREFUL this is a stringified JSON object, so you'll need to parse it!
    didRead
  }
  ${notificationUserProfileFragment}
`;

export default notificationFragment;
