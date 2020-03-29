import gql from 'graphql-tag';
import chatRoomUserProfileFragment from './chatRoomUserProfile';

const messageFragment = gql`
  fragment messageFragment on Message {
    _id
    createdAt
    sender {
      ...chatRoomUserProfileFragment
    }
    text
  }
  ${chatRoomUserProfileFragment}
`;

export default messageFragment;
