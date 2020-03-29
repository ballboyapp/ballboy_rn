import gql from 'graphql-tag';
import chatRoomBaseFragment from '../Fragments/chatRoomBase';

const chatRoomQuery = gql`
  query chatRoom($roomId: ID!) {
    chatRoom(roomId: $roomId) {
      ...chatRoomBaseFragment
    }
  }
  ${chatRoomBaseFragment}
`;

export default chatRoomQuery;
