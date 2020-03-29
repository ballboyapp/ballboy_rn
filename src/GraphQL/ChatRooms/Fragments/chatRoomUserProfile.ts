import gql from 'graphql-tag';

const chatRoomUserProfileFragment = gql`
  fragment chatRoomUserProfileFragment on ChatRoomUserProfile {
    id
    name
    avatarURL
  }
`;

export default chatRoomUserProfileFragment;
