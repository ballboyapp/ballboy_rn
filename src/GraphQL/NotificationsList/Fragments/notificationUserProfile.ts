import gql from 'graphql-tag';

const notificationUserProfileFragment = gql`
  fragment notificationUserProfileFragment on NotificationUserProfile {
    id
    name
    avatarURL
  }
`;

export default notificationUserProfileFragment;
