import gql from 'graphql-tag';
import chatRoomUserProfileFragment from './chatRoomUserProfile';
import messageFragment from './message';

const chatRoomBaseFragment = gql`
  fragment chatRoomBaseFragment on ChatRoom {
    _id
    messages {
      ...messageFragment
    }
  }
  ${chatRoomUserProfileFragment}
  ${messageFragment}
`;

export default chatRoomBaseFragment;
